'use client';

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdClose, MdDownload, MdEdit, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetBeneficiaryDetails } from '@/hooks/useGetBeneficiaryDetails';
import { useGetModules } from '@/hooks/useGetModules';
import type { Beneficiary, ModuleDetail } from '@/types';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';

type VettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: Beneficiary;
};

function VettingModal({ isOpen, onClose, beneficiary }: VettingModalProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: beneficiaryDetails, isLoading } = useGetBeneficiaryDetails(beneficiary.id);

  const handleTabsChange = (index: number) => setTabIndex(index);

  const getModuleStatus = useCallback(
    (module: ModuleDetail) =>
      beneficiaryDetails?.body?.progressLog.find((log) => log.moduleName === module.moduleName)?.status,
    [beneficiaryDetails]
  );

  const beneficiaryProfile = useMemo(() => {
    if (!beneficiaryDetails) return;

    const applicationModule = beneficiaryDetails.body.moduleDetails.find(
      (module) => module.moduleName === 'Application'
    );

    return applicationModule;
  }, [beneficiaryDetails]);

  const vettingQuestions = useMemo(() => {
    if (!beneficiaryDetails) return;

    const vettingModule = beneficiaryDetails.body.moduleDetails.find((module) => module.moduleName === 'Vetting');

    return vettingModule;
  }, [beneficiaryDetails]);

  useEffect(() => {
    if (!beneficiaryDetails || !isOpen) return;
    const index = beneficiaryDetails.body.moduleDetails.findIndex(
      (module) => module.moduleName === beneficiary.moduleName
    );
    setTabIndex(index === -1 ? 0 : index);
  }, [beneficiary.moduleName, beneficiaryDetails, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent p="0" maxW="57.5rem">
        <ModalHeader p="0" mb="6">
          <Flex p="1rem" justifyContent="flex-end">
            <IconButton
              aria-label="Close modal"
              icon={<MdClose size="1.5rem" />}
              variant="secondary"
              boxSize="2rem"
              minW="unset"
              rounded="full"
              onClick={onClose}
            />
          </Flex>
          <Flex px="3rem" align="center" justifyContent="space-between">
            <Text variant="Body2Semibold" color="grey.500">
              Vetting details
            </Text>
            <Text variant="Body2Semibold" color="grey.500" display="inline-flex" gap="2" alignItems="center">
              Score:
              <Text as="span" variant="Header1Bold" color="text">
                100/200
              </Text>
            </Text>
            <Button variant="primary" leftIcon={<MdDownload />} size="medium">
              Download Report
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody px="3rem" pb="3rem">
          {isLoading ? (
            <Grid placeItems="center" h="30rem">
              <Spinner />
            </Grid>
          ) : (
            <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
              <TabList>
                {beneficiaryProfile && (
                  <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                    Profile
                  </Tab>
                )}
                {vettingQuestions && (
                  <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                    Questions
                  </Tab>
                )}
              </TabList>

              <TabPanels>
                {beneficiaryProfile && (
                  <TabPanel px="0" py="1.25rem">
                    <ProfileTab module={beneficiaryProfile} />
                  </TabPanel>
                )}
                {vettingQuestions && (
                  <TabPanel px="0" py="1.25rem">
                    <QuestionsTab
                      beneficiaryId={beneficiary.id}
                      module={vettingQuestions}
                      status={getModuleStatus(vettingQuestions)}
                    />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ProfileTab({ module }: { module: ModuleDetail }) {
  return (
    <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem" mb="4rem">
      {module?.formAnswers?.map((answer) => {
        const value = answer.key === 'Date of Birth' ? format(parseISO(answer.value), 'dd/MM/yyyy') : answer.value;
        return (
          <Box key={answer.key}>
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              {answer.key}
            </Text>
            <Text variant="Body1Regular">{value}</Text>
          </Box>
        );
      })}
    </Grid>
  );
}

type QuestionsTabProps = {
  module: ModuleDetail;
  beneficiaryId: number;
  status?: string;
};

const itemsPerPage = 10;

function QuestionsTab({ module, beneficiaryId, status }: QuestionsTabProps) {
  const toast = useToast();
  const { programID } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { data: modules } = useGetModules();

  const paginatedAnswers = useMemo(() => {
    if (!module?.formAnswers) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return module.formAnswers.slice(startIndex, startIndex + itemsPerPage);
  }, [module?.formAnswers, currentPage]);

  const totalPages = useMemo(() => {
    if (!module?.formAnswers) return 0;
    return Math.ceil(module.formAnswers.length / itemsPerPage);
  }, [module?.formAnswers]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const onApprove = (status: string) => {
    const moduleId = modules?.body.find((mod) => mod.name === module.moduleName)?.id;

    if (!moduleId) return toast({ title: 'Module not found', status: 'error' });

    const payload = { status, moduleId, programId: programID.toString(), beneficiaryId: [beneficiaryId] };

    approveBeneficiary(payload, {
      onSuccess: () => {
        toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
      },
    });
  };

  return (
    <Stack spacing="1.25rem">
      <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem">
        {paginatedAnswers.map((answer, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index;
          return (
            <Stack key={answer.key}>
              <Flex align="flex-start" justify="space-between" gap="4">
                <Text variant="Body2Semibold" color="grey.500">
                  {globalIndex + 1}. {answer.key}
                </Text>
                <Flex align="center" gap="2.5" shrink="0">
                  <Text variant="Body2Regular">10 points</Text>
                  <Button variant="link" size="small" color="secondary.500" gap="1.5">
                    <Icon as={MdEdit} boxSize="3" />
                    Edit
                  </Button>
                </Flex>
              </Flex>
              <Text variant="Body1Regular" border="1px dashed" borderColor="grey.300" rounded="0.375rem" px="2" py="1">
                {answer.value}
              </Text>
              <Flex justify="end">
                <Input
                  placeholder="Enter score"
                  variant="primary"
                  type="number"
                  border="1px dashed"
                  borderColor="grey.300"
                  rounded="0.375rem"
                  px="2"
                  py="1"
                  w="6.5rem"
                />
              </Flex>
            </Stack>
          );
        })}
      </Grid>
      {totalPages > 1 && (
        <Flex justify="flex-end" align="center" gap="4">
          <Button
            variant="secondary"
            size="medium"
            h="auto"
            py="1.5"
            px="3"
            gap="2"
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
          >
            <Icon as={MdKeyboardArrowLeft} boxSize="3.5" flexShrink="0" />
            Prev page
          </Button>
          <Button
            variant="secondary"
            size="medium"
            h="auto"
            py="1.5"
            px="3"
            gap="2"
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
          >
            Next page
            <Icon as={MdKeyboardArrowRight} boxSize="3.5" flexShrink="0" />
          </Button>
        </Flex>
      )}
      <Divider borderColor="grey.200" opacity="1" />
      {status === 'PENDING' && (
        <Grid templateColumns="1fr 1fr" gap="6">
          <Button variant="accept" w="full" size="default" onClick={() => onApprove('APPROVED')}>
            Approve
          </Button>
          <Button variant="cancel" w="full" size="default" onClick={() => onApprove('DISAPPROVED')}>
            Deny
          </Button>
        </Grid>
      )}
    </Stack>
  );
}

export default VettingModal;
