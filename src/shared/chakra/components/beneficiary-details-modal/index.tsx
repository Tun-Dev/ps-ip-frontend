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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdClose, MdDownload } from 'react-icons/md';

import { useGetBeneficiaryDetails } from '@/hooks/useGetBeneficiaryDetails';
import { useUserStore } from '@/providers/user-store-provider';
import type { Beneficiary, ModuleDetail } from '@/types';
import ModuleTab from './module-tab';
import { SummaryTab } from './summary-tab';

type BeneficiaryDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: Beneficiary;
  moduleName: string;
};

function BeneficiaryDetailsModal({ isOpen, onClose, beneficiary, moduleName }: BeneficiaryDetailsModalProps) {
  const user = useUserStore((state) => state.user);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: beneficiaryDetails, isLoading } = useGetBeneficiaryDetails(beneficiary.id);

  const handleTabsChange = (index: number) => setTabIndex(index);

  const getModuleStatus = useCallback(
    (module: ModuleDetail) =>
      beneficiaryDetails?.body?.progressLog.find((log) => log.moduleName === module.moduleName)?.status,
    [beneficiaryDetails]
  );

  const moduleTabs = useMemo(() => {
    if (!beneficiaryDetails || !user) return [];
    if (user.roles.includes('Super Admin')) return beneficiaryDetails.body.moduleDetails;
    if (user.roles.includes('Aggregator'))
      return beneficiaryDetails.body.moduleDetails.filter((module) => module.moduleName === 'Enumeration');
    if (user.roles.includes('Vetting Officer'))
      return beneficiaryDetails.body.moduleDetails.filter((module) => module.moduleName === 'Vetting');
    if (user.roles.includes('Vendor'))
      return beneficiaryDetails.body.moduleDetails.filter((module) => module.moduleName === 'Disbursement');
    return [];
  }, [beneficiaryDetails, user]);

  useEffect(() => {
    if (!moduleTabs || !isOpen) return;
    const index = moduleTabs.findIndex((module) => module.moduleName === moduleName);
    setTabIndex(index === -1 ? 0 : index);
  }, [moduleName, moduleTabs, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent p="0" maxW="57.5rem">
        <ModalHeader p="0" mb="6">
          <Flex p="1rem" justifyContent="flex-end">
            <IconButton
              aria-label="Close modal"
              icon={<MdClose size="1.5rem" />}
              variant="ghost"
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
              <Text variant="Body1Regular">
                {beneficiaryDetails?.body.date &&
                  Intl.DateTimeFormat('en-GB').format(new Date(beneficiaryDetails.body.date))}
              </Text>
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
                {moduleTabs.map((module, index) => (
                  <Tab key={index} fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                    {module.moduleName}
                  </Tab>
                ))}
                <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                  Summary
                </Tab>
              </TabList>

              <TabPanels>
                {moduleTabs.map((module) => (
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
