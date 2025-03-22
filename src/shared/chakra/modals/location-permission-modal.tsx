import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export function LocationPermissionModal() {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const requestPermission = () => {
    if (!navigator) return;

    navigator.geolocation.getCurrentPosition(
      () => onClose(),
      () =>
        toast({
          status: 'error',
          title: 'Error',
          description: 'Please allow location access to proceed',
          isClosable: false,
          duration: null,
        })
    );
  };

  useEffect(() => {
    if (!navigator) return;

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state !== 'granted') onOpen();
    });
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent p="0" maxW="35.625rem">
        <ModalBody p="2.5rem">
          <Box mb="6">
            <Heading as="h1" fontWeight="600" textAlign="center" mb="2">
              Note:
            </Heading>
            <Text variant="Body1Regular">
              You would need to grant access to your location before you can proceed to fill out your information. Your
              browser will ask you for this access. Click “allow” when you are asked.
            </Text>
          </Box>
          <Button
            display="flex"
            variant="primary"
            size="default"
            w="full"
            maxW="11.25rem"
            mx="auto"
            onClick={requestPermission}
          >
            Continue
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
