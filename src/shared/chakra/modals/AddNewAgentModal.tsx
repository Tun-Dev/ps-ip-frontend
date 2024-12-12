import {
  Text,
  Input,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { Dropdown } from '@/shared/chakra/components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewAgentModal = ({ isOpen, onClose }: ModalProps) => {
  const options = [
    { label: 'Short answer', value: 'Short answer' },
    { label: 'Paragraph', value: 'Paragraph' },
    { label: 'Dropdown', value: 'Dropdown' },
    { label: 'Date', value: 'Date' },
    { label: 'File upload', value: 'File upload' },
  ];
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="498px" height="756px" borderRadius="12px">
          <ModalHeader>
            <Text variant="Body1Semibold">Add New Agent</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Text variant="Body2Semibold" color="gray.500" mb={2}>
                Agent Name
              </Text>
              <Input variant="primary" height="40px" placeholder="Agent Usman" marginBottom={4} />
              <Text variant="Body2Semibold" color="gray.500" mb={2}>
                Local Government Area to Enumerate
              </Text>
              <Input variant="primary" height="40px" placeholder="Agent LGA" marginBottom={4} />
              <Text variant="Body2Semibold" color="gray.500" mb={2}>
                Assign Program
              </Text>
              <Dropdown
                variant="whiteDropdown"
                placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM"
                options={options}
              />
              <Text variant="Body2Semibold" color="gray.500" mb={2} mt={4}>
                Set Objective
              </Text>
              <Input variant="primary" height="40px" placeholder="1000" marginBottom={4} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              width="402px"
              height="48px"
              onClick={() => {
                // console.log('Agent added');
                onClose();
              }}
            >
              Add New Agent
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddNewAgentModal };
