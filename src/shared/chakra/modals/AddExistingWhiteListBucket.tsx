// import { useGetVendorDetails } from '@/hooks/useGetVendorDetails';
import { useAddExistingWhiteList } from '@/hooks/useAddExistingWhiteList';
import { useGetWhitelistByProgramId } from '@/hooks/useGetWhitelistByProgramId';
import { useRequestOtp } from '@/hooks/useRequestOtp';
import { useUserStore } from '@/providers/user-store-provider';
import { WhitelistDetails } from '@/types';
// import { useRemoveVendorProgram } from '@/hooks/useRemoveVendorProgram';
// import type { VendorDetails, WhitelistDetails } from '@/types';
import { formatErrorMessage } from '@/utils';
// import { formatErrorMessage } from '@/utils';
import {
  Button,
  Flex,
  Grid,
  HStack,
  //   Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  SimpleGrid,
  // SimpleGrid,
  Spinner,
  //   Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  beneficiariesIds: string[];
  programID: string | string[];
  programName: string;
  selectedIds: string[];
  //   setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const AddExistingWhiteListBucket = ({ isOpen, onClose, beneficiariesIds, programID, programName }: Props) => {
  const toast = useToast();
  const user = useUserStore((state) => state.user);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const { isPending: isRequestingOTP, mutate } = useRequestOtp({});
  const { data, isPending, isError, error } = useGetWhitelistByProgramId(
    { page: 1, pageSize: 999 },
    programID?.toLocaleString()
  );

  const { mutate: addExistingWhitelist } = useAddExistingWhiteList();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 2) {
      mutate(
        { firstName: user?.firstName || '', programName },
        {
          onSuccess: () => {
            toast({ title: 'Success', description: `OTP sent to ${user?.email}`, status: 'success' });
          },
        }
      );
    }
  }, [step, mutate, user, programName, toast]);

  const onSubmit = (id: string) => {
    const payload = {
      programId: programID?.toLocaleString(),
      whitelistId: id,
      beneficiaryIds: beneficiariesIds,
      otp: otp,
    };

    addExistingWhitelist(payload, {
      onSuccess: () => {
        toast({ title: `Added to Whitelist successfully`, status: 'success' });
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOtp('');
        setStep(1);
        onClose();
      }}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW="42.375rem">
        <ModalHeader>
          <Text as="span" variant="Body1Semibold">
            Add to Existing Whitelist
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {step === 1 && (
            <Flex flexDir="column" alignItems="center" gap="4">
              <Text textAlign="center">An OTP will be sent to {user?.email} email to continue.</Text>
              <Button mt={4} variant="primary" onClick={() => setStep(2)}>
                Proceed
              </Button>
            </Flex>
          )}

          {step === 2 && (
            <Flex flexDir="column" alignItems="center" gap="4">
              <Text align="center">Please enter OTP to proceed</Text>
              <HStack>
                <PinInput otp size="lg" isDisabled={isRequestingOTP} type="alphanumeric" onChange={(e) => setOtp(e)}>
                  {[...Array(8)].map((_, i) => (
                    <PinInputField key={i} />
                  ))}
                </PinInput>
              </HStack>
              <Text mt={4}>
                Didn’t receive OTP?{' '}
                <Button
                  variant="link"
                  onClick={() => {
                    mutate({ firstName: user?.firstName || '', programName });
                  }}
                >
                  Resend
                </Button>
              </Text>
            </Flex>
          )}

          {step === 3 && (
            <Stack gap="4">
              {isPending ? (
                <Grid placeItems="center" h="10rem">
                  <Spinner />
                </Grid>
              ) : isError ? (
                <Text>{formatErrorMessage(error)}</Text>
              ) : data.body.data.length > 0 ? (
                data.body.data.map((item) => <Item key={item.id} item={item} onClick={() => onSubmit(item.id)} />)
              ) : (
                <Text variant="Body1Regular">No existing whitelist</Text>
              )}
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          {step === 2 && (
            <SimpleGrid w="full" gap="4" columns={2}>
              <Button variant="cancel" height="3rem" w="full" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                height="3rem"
                w="full"
                onClick={() => {
                  if (otp.length === 8) setStep(3);
                }}
                disabled={otp.length !== 8}
              >
                Next Step
              </Button>
            </SimpleGrid>
          )}

          {step === 3 && (
            <SimpleGrid w="full" gap="4">
              <Button variant="cancel" height="3rem" w="full" onClick={onClose}>
                Close
              </Button>
            </SimpleGrid>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Item = ({ item, onClick }: { item: WhitelistDetails; onClick: () => void }) => {
  return (
    <Stack border="1px solid" borderColor="grey.200" borderRadius="12px" p="4">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{item.name}</Text>
        <Button w="156px" h="2rem" variant="secondary" fontSize="10px" fontWeight="600" onClick={onClick}>
          Add to Whitelist
        </Button>
        {/* <Text variant="Body2Semibold" color="#006430">
          {item.programType}
        </Text> */}
      </Flex>
      <Flex align="center" justify="space-between" gap="4" alignItems="center">
        <Flex justifyContent="space-between" flex="1">
          {item.vendorId && (
            <Stack textAlign="center">
              <Text variant="Body2Semibold" color="grey.500">
                Vendor
              </Text>
              <Text variant="Body1Semibold">{item.vendorId ?? 'N/A'}</Text>
            </Stack>
          )}
          <Stack textAlign="center">
            <Text variant="Body2Semibold" color="grey.500">
              No. of Beneficiary
            </Text>
            <Text variant="Body1Semibold">{item.beneficiariesNo ?? 'N/A'}</Text>
          </Stack>
          <Stack textAlign="center">
            <Text variant="Body2Semibold" color="grey.500">
              Status
            </Text>
            <Text variant="Body1Semibold">{item.status ?? 'N/A'}</Text>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
};
