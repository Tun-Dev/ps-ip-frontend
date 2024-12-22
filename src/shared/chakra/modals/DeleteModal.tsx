import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Text, Icon, Button } from '@chakra-ui/react';
import React from 'react';
import { MdWarning } from 'react-icons/md';

const DeleteModal = ({
  isOpen,
  onClose,
  action,
  text,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
  text?: string;
  isLoading?: boolean;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="606px" borderRadius="12px" padding="0" gap="10px">
        <ModalBody padding="40px 89px">
          <Flex flexDir="column" alignItems="center" gap="40px">
            <Flex flexDir="column" alignItems="center" gap="24px">
              <Flex boxSize="64px" alignItems="center" justifyContent="center" bg="red.100" borderRadius="12px">
                <Icon as={MdWarning} width="29px" height="25px" color="#FF0000" />
              </Flex>
              <Flex flexDir="column" alignItems="center" textAlign="center" gap="8px">
                <Text variant="Header1Bold" color="grey.500">
                  Delete Data?
                </Text>
                <Text variant="Body1Regular" color="text">
                  {text}
                </Text>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" w="full">
              <Button variant="secondary" width="200px" height="48px" onClick={onClose}>
                No, Keep
              </Button>
              <Button
                variant="cancel"
                width="200px"
                height="48px"
                onClick={() => {
                  action();
                  // onClose();
                }}
                isLoading={isLoading}
              >
                Yes, Delete
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { DeleteModal };
