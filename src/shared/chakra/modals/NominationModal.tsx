'use client';

import { useUploadNominationFile } from '@/hooks/useUploadNominationFile';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { MdDeleteForever, MdDownload, MdUploadFile } from 'react-icons/md';
import { Dropdown } from '../components';

const NominationModal = ({
  isOpen,
  onClose,
  action,
  programId,
}: {
  isOpen: boolean;
  onClose: () => void;
  action?: () => void;
  text?: string;
  isLoading?: boolean;
  programId?: string;
}) => {
  const toast = useToast();
  const templates = [
    {
      id: 'individual',
      label: 'Individual Nomination Template',
      value:
        'https://boi-ip-is.s3.eu-north-1.amazonaws.com/nominationTemplates/Intervention_Nomination_Template_Individuals.xlsx',
    },
    {
      id: 'corporate_cac',
      label: 'Corporate Business Nomination Template (With CAC, BVN & NIN)',
      value:
        'https://boi-ip-is.s3.eu-north-1.amazonaws.com/nominationTemplates/Intervention_Nomination_Template_Business_CAC_BVN_NIN.xlsx',
    },
    {
      id: 'corporate_hob',
      label: 'Corporate Business Nomination Template (For HOB)',
      value:
        'https://boi-ip-is.s3.eu-north-1.amazonaws.com/nominationTemplates/Intervention_Nomination_Template_HOB+and+Business.xlsx',
    },
    {
      id: 'corporate_hob_bvn',
      label: 'Corporate Business Nomination Template (For HOB with BVN & NIN)',
      value:
        'https://boi-ip-is.s3.eu-north-1.amazonaws.com/nominationTemplates/Intervention_Nomination_Template_HOB_BVN_NIN.xlsx',
    },
    {
      id: 'agent',
      label: 'Agent Nomination Template',
      value: 'https://boi-ip-is.s3.eu-north-1.amazonaws.com/nominationTemplates/Agent+nomination+template.xlsx',
    },
  ];

  const [downloadUrl, setDownloadUrl] = useState('');

  const onChange = (link: string) => {
    setDownloadUrl(link);
  };

  const { mutate: uploadNominationFile, isPending: isUploading } = useUploadNominationFile(onClose);

  const handleUpload = () => {
    if (file) {
      uploadNominationFile({ file: file, programId: programId || '' });
    }
  };

  const handleDownload = () => {
    const template = templates.find((temp) => temp.value === downloadUrl);
    if (!downloadUrl) {
      toast({
        title: 'Please select a template',
        status: 'error',
      });
    } else if (template && downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      const filename = template.value.split('/').pop() as string;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />

      <ModalContent maxWidth="678px" borderRadius="12px" padding="0" gap="10px">
        <ModalHeader>
          <Text variant="Body1Semibold">Upload Nomination list</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="">
          <Flex flexDir="column" alignItems="center" gap="40px">
            <Dropdown
              id={`templates`}
              variant="whiteDropdown"
              placeholder="Select template"
              name="templates"
              options={templates}
              onChange={(e) => e && onChange(e.value)}
              menuPosition="absolute"
            />
            <DownloadArea
              text="Download Sample Template"
              bg="#F2F7F5"
              borderColor="#CCE0D6"
              icon={MdDownload}
              iconColor="#006430"
              textColor="#006430"
              onClick={handleDownload}
            />

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

            <Button
              variant="primary"
              width="402px"
              height="48px"
              mt="200px"
              mb="40px"
              isLoading={isUploading}
              onClick={() => {
                handleUpload();
                action?.();
              }}
            >
              Upload File
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NominationModal;

const DownloadArea = ({
  text,
  icon,
  bg,
  borderColor,
  textColor,
  iconColor,
  onClick,
}: {
  text?: string;
  icon?: IconType;
  bg?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  onClick?: () => void;
}) => {
  return (
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
      onClick={onClick}
      cursor="pointer"
      position="relative"
    >
      <Text variant="Body2Semibold" color={textColor}>
        {text}
      </Text>
      <Icon as={icon} width="32px" height="32px" color={iconColor} />
    </Flex>
  );
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
