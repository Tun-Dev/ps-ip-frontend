'use client';

import {
  Button,
  Flex,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { MdClose, MdDownload } from 'react-icons/md';

import { useGetBeneficiaryDetails } from '@/hooks/useGetBeneficiaryDetails';
import type { Beneficiary, ModuleDetail } from '@/types';
import ModuleTab from './module-tab';
import { SummaryTab } from './summary-tab';

type BeneficiaryDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: Beneficiary;
};

function BeneficiaryDetailsModal({ isOpen, onClose, beneficiary }: BeneficiaryDetailsModalProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: beneficiaryDetails, isLoading } = useGetBeneficiaryDetails(beneficiary.id);

  const handleTabsChange = (index: number) => setTabIndex(index);

  const getModuleStatus = useCallback(
    (module: ModuleDetail) =>
      beneficiaryDetails?.body?.progressLog.find((log) => log.moduleName === module.moduleName)?.status,
    [beneficiaryDetails]
  );

  useEffect(() => {
    if (!beneficiaryDetails || !isOpen) return;
    const index = beneficiaryDetails.body.moduleDetails.findIndex(
      (module) => module.moduleName === beneficiary.moduleName
    );
    setTabIndex(index === -1 ? 0 : index);
  }, [beneficiary.moduleName, beneficiaryDetails, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <Flex align="center" gap="0.9375rem">
              <Text variant="Body2Semibold" color="grey.500">
                Date added:
              </Text>
              <Text variant="Body1Regular">Nov 1, 2024</Text>
            </Flex>
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
                {beneficiaryDetails?.body?.moduleDetails.map((module) => (
                  <Tab key={module.moduleName} fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                    {module.moduleName}
                  </Tab>
                ))}
                <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                  Summary
                </Tab>
              </TabList>

              <TabPanels>
                {beneficiaryDetails?.body?.moduleDetails.map((module) => (
                  <TabPanel key={module.moduleName} px="0" py="1.25rem">
                    <ModuleTab beneficiaryId={beneficiary.id} module={module} status={getModuleStatus(module)} />
                  </TabPanel>
                ))}
                <TabPanel px="0" py="1.25rem">
                  <SummaryTab progressLog={beneficiaryDetails?.body?.progressLog} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default BeneficiaryDetailsModal;
