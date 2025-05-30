import {
  Button,
  Flex,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { MdCheckCircle, MdContentCopy } from 'react-icons/md';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  isApplication?: boolean;
};

export const BeneficiarySuccessModal = ({ isOpen, onClose, code, isApplication }: Props) => {
  const router = useRouter();
  const { programId } = useParams();
  const { onCopy, hasCopied } = useClipboard(code);

  const handleClose = () => {
    onClose();
    router.push(`/beneficiary/${programId}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="37.5rem" borderRadius="0.75rem" p="0">
        <ModalBody p="8">
          <Stack gap="8" align="center">
            <Stack gap="5">
              {!isApplication && (
                <Grid placeItems="center">
                  <Icon as={MdCheckCircle} boxSize="10" color="primary.600" />
                </Grid>
              )}
              <Text
                variant="Body1Semibold"
                color="text"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="1"
              >
                Your response has been submitted
                {isApplication && <Icon as={MdCheckCircle} boxSize="5" color="primary.600" />}
              </Text>
              {isApplication && (
                <Stack gap="4">
                  <Text variant="Body2Regular" color="grey.500" textAlign="center">
                    You can track your progress with this USER ID
                  </Text>
                  <Flex gap="2.5" justify="center" align="center">
                    <Text variant="Header1Bold" bgColor="primary.150" py="2" px="4" rounded="0.375rem">
                      {code}
                    </Text>
                    <Button
                      variant="secondary"
                      fontWeight="600"
                      fontSize="1rem"
                      rounded="0.375rem"
                      gap="2"
                      onClick={onCopy}
                    >
                      <Icon as={MdContentCopy} boxSize="5" />
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Flex>
                </Stack>
              )}
            </Stack>
            <Button variant="primary" size="default" w="full" maxW="20rem" onClick={handleClose}>
              Continue
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
