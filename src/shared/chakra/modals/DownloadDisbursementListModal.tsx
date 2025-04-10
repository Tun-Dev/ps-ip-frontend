'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { useRequestOtp } from '@/hooks/useRequestOtp';
import { useDownloadDisbursementList } from '@/hooks/useDownloadDisbursementList';

type DownloadDisbursementListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programId: string;
};

const DownloadDisbursementListModal = ({ isOpen, onClose, programId }: DownloadDisbursementListModalProps) => {
  const [otp, setOtp] = useState('');
  const { isPending: isRequestingOTP, mutate } = useRequestOtp({});
  const { mutate: download, isPending: isDownloading } = useDownloadDisbursementList();

  useEffect(() => {
    if (isOpen) {
      mutate();
    }
  }, [isOpen, mutate]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setOtp('');
      }}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />

      <ModalContent maxWidth="678px" borderRadius="12px" padding="0" gap="10px">
        <ModalHeader>
          <Text variant="Body1Semibold">Download Disbursement list</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="">
          <Flex align="center" flexDir="column" gap="4">
            <Text>Please enter OTP to proceed</Text>
            <HStack>
              <PinInput
                otp
                size="lg"
                isDisabled={isRequestingOTP}
                type="alphanumeric"
                onChange={(e) => {
                  setOtp(e);
                }}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button
              variant="primary"
              width="402px"
              height="48px"
              mt="40px"
              mb="40px"
              isLoading={isDownloading}
              isDisabled={otp.length !== 8 || isDownloading}
              onClick={() => {
                download({ programId, otp });
                onClose();
              }}
            >
              Submit
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadDisbursementListModal;
