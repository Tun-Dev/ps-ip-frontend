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
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Dropdown } from '@/shared/chakra/components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewPartnerModal = ({ isOpen, onClose }: ModalProps) => {
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
            <Text variant="Body1Semibold">Add New Partner</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Text variant="Body2Semibold" color="gray.500" mb={2}>
                Partner Name
              </Text>
              <Input variant="primary" height="40px" placeholder="Partner Usman" marginBottom={4} />
              <Text variant="Body2Semibold" color="gray.500" mb={2}>
                Assign Program
              </Text>
              <Dropdown
                variant="whiteDropdown"
                placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM"
                options={options}
              />
              <Text variant="Body2Semibold" color="gray.500" mb={2} mt={4}>
                Products/Services offered
              </Text>
              <Dropdown
                variant="whiteDropdown"
                placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM"
                options={options}
              />
              <Text variant="Body2Semibold" color="gray.500" mb={2} mt={4}>
                Amount Disbursable
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <Text>₦</Text>
                </InputLeftElement>
                <Input type="number" placeholder="50,000,000"></Input>
              </InputGroup>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              width="402px"
              height="48px"
              onClick={() => {
                // console.log('Partner added');
                onClose();
              }}
            >
              Add New Partner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddNewPartnerModal };
