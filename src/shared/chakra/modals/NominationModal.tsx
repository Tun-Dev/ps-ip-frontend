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
import * as XLSX from 'xlsx';

const NominationModal = ({
  isOpen,
  onClose,
  // action,
  programId,
}: {
  isOpen: boolean;
  onClose: () => void;
  action?: () => void;
  text?: string;
  isLoading?: boolean;
  programId?: string;
}) => {
  const [response, setResponse] = useState<{ successful: never[]; failed: never[] }>({ successful: [], failed: [] });
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

  const { mutate: uploadNominationFile, isPending: isUploading } = useUploadNominationFile();

  const handleUpload = async () => {
    if (file) {
      uploadNominationFile(
        { file: file, programId: programId || '' },
        {
          onSuccess: (data) => {
            setResponse(data.body);
            if (!data.body.failed.length) onClose();
          },
        }
      );
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

  const downloadAsXLSX = (data: never[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

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
              mt="20px"
              mb="40px"
              isLoading={isUploading}
              onClick={() => {
                handleUpload();
              }}
            >
              Upload File
            </Button>
            {response.failed.length > 0 && (
              <Flex gap={4} flexDir="column" alignItems="center" mb="40px" mt="-40px">
                {/* {response?.successful?.length > 0 && (
                <Button colorScheme="green" onClick={() => downloadAsXLSX(response.successful!, 'successful.xlsx')}>
                  {`Successful (${response.successful.length})`}
                </Button>
              )} */}

                <Text variant="Body1Regular">{`Uploaded file has ${response.failed.length} failed entries, download below`}</Text>

                {response?.failed?.length > 0 && (
                  <Button
                    colorScheme="red"
                    onClick={() => downloadAsXLSX(response.failed!, 'failed.xlsx')}
                    variant="secondary"
                  >
                    {/* {`Failed (${response.failed.length})`} */}
                    Download Failed Entries
                  </Button>
                )}
              </Flex>
            )}
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
