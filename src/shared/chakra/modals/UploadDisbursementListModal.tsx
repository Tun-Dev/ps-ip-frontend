'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
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
import { IconType } from 'react-icons';
import { MdDeleteForever, MdUploadFile } from 'react-icons/md';
import { useRequestOtp } from '@/hooks/useRequestOtp';
import { useUploadDisbursementList } from '@/hooks/useUploadDisbursementList';

type UploadDisbursementListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programId: string;
};

const UploadArea = ({
  text,
  icon,
  bg,
  borderColor,
  textColor,
  iconColor,
  onClick,
  setFile,
  file,
}: {
  text?: string;
  icon?: IconType;
  bg?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  onClick?: () => void;
  setFile: Dispatch<SetStateAction<File | null>>;
  file: File | null;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
    } else if (selectedFile) {
      alert('Please upload only Excel (.xlsx) files');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleDelete = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Box width="100%">
      <Text variant="Body1Regular" color="GrayText" textAlign="center" mb="2">
        Please ensure the Disbursement Date column is filled in your Excel file before uploading. Missing disbursement
        dates will prevent the upload from being processed.
      </Text>
      <Flex
        border={`1px dashed ${borderColor}`}
        w="100%"
        h="92px"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="6px"
        gap="8px"
        bg={bg}
        onClick={() => {
          inputRef.current?.click();
          onClick?.();
        }}
        cursor="pointer"
        position="relative"
      >
        <Input type="file" accept=".xlsx" ref={inputRef} onChange={handleFileChange} display="none" />
        <Text variant="Body2Semibold" color={textColor}>
          {text}
        </Text>
        {icon && <Icon as={icon} width="32px" height="32px" color={iconColor} />}
      </Flex>

      {file && (
        <Flex
          mt="12px"
          p="8px 12px"
          bg="gray.50"
          borderRadius="4px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Text variant="Body2" fontWeight="medium" isTruncated maxW="70%">
            {file.name}
          </Text>
          <Flex alignItems="center" gap="12px">
            <Text variant="Body2" color="gray.600">
              {formatFileSize(file.size)}
            </Text>
            <Icon as={MdDeleteForever} color="red.500" cursor="pointer" onClick={handleDelete} w="14px" h="14px" />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

const UploadDisbursementListModal = ({ isOpen, onClose, programId }: UploadDisbursementListModalProps) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [otp, setOtp] = useState('');
  const resetStuff = () => {
    onClose();
    setFile(null);
    setOtp('');
    setStep(1);
  };

  const { isPending: isRequestingOTP, mutate } = useRequestOtp({});
  const { mutate: upload, isPending: isUploading } = useUploadDisbursementList({ onClose: resetStuff });

  const handleUpload = async (file: File) => {
    upload({ programId, otp, file });
  };

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
        setFile(null);
        setOtp('');
        setStep(1);
      }}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />

      <ModalContent maxWidth="678px" borderRadius="12px" padding="0" gap="10px">
        <ModalHeader>
          <Text variant="Body1Semibold">Upload Disbursement list</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="">
          <Flex align="center" flexDir="column" gap="4">
            {step === 1 ? (
              <>
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
              </>
            ) : (
              <>
                <UploadArea
                  text="Upload Nomination File"
                  bg="#FBF7EE"
                  borderColor="#EEDDBC"
                  icon={MdUploadFile}
                  iconColor="#D5AB57"
                  textColor="#D5AB57"
                  file={file}
                  setFile={setFile}
                />
              </>
            )}

            <Button
              variant="primary"
              width="402px"
              height="48px"
              mt="40px"
              mb="40px"
              isDisabled={otp.length !== 8 || isUploading}
              isLoading={isUploading}
              onClick={() => {
                if (step === 1) {
                  if (otp.length === 8) setStep(2);
                } else {
                  if (otp && programId && file) {
                    handleUpload(file);
                  }
                }
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

export default UploadDisbursementListModal;
