'use client';

import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdClose, MdDownload } from 'react-icons/md';
import DisbursementTab from './disbursement-tab';
import EnumerationTab from './enumeration-tab';
import VerificationTab from './verification-tab';
import VettingTab from './vetting-tab';
import WhitelistingTab from './whitelisting-tab';

type BeneficiaryDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: number;
};

function BeneficiaryDetailsModal({ isOpen, onClose, initialTab }: BeneficiaryDetailsModalProps) {
  const [tabIndex, setTabIndex] = useState(initialTab ?? 0);

  const handleTabsChange = (index: number) => setTabIndex(index);

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
          <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
            <TabList>
              <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                Enumeration
              </Tab>
              <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                Verification
              </Tab>
              <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                Vetting
              </Tab>
              <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                Whitelisting
              </Tab>
              <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
                Disbursement
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0" py="1.25rem">
                <EnumerationTab />
              </TabPanel>
              <TabPanel px="0" py="1.25rem">
                <VerificationTab />
              </TabPanel>
              <TabPanel px="0" py="1.25rem">
                <VettingTab />
              </TabPanel>
              <TabPanel px="0" py="1.25rem">
                <WhitelistingTab />
              </TabPanel>
              <TabPanel px="0" py="1.25rem">
                <DisbursementTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default BeneficiaryDetailsModal;
