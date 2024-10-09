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
import { Dropdown } from '@/components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AggregatorModal = ({ isOpen, onClose }: ModalProps) => {
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
            <Text variant="Body1Semibold">Add New Aggregator</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Text as="p" fontSize="13px" color="gray.500" mb={2}>
                Aggregator Name
              </Text>
              <Input variant="primary" height="40px" placeholder="NURTW" marginBottom={4} />
              <Text as="p" fontSize="13px" color="gray.500" mb={2}>
                Set Maximum Agent
              </Text>
              <Input type="number" variant="primary" height="40px" placeholder="300" marginBottom={4} />
              <Text as="p" fontSize="13px" color="gray.500" mb={2}>
                Assign Program
              </Text>
              <Dropdown
                variant="whiteDropdown"
                placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM"
                options={options}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              width="402px"
              height="48px"
              onClick={() => {
                console.log('Aggregator added');
                onClose();
              }}
            >
              Add New Aggregator
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AggregatorModal };
