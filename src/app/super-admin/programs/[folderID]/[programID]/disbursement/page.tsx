/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  // MdCloudUpload,
  MdDownload,
  MdMoreHoriz,
  MdSearch,
} from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
// import { useGetUploadStatus } from '@/hooks/useGetUploadStatus';
// import { useProcessModule } from '@/hooks/useProcessModule';
// import { useUploadProgram } from '@/hooks/useUploadData';
import { Beneficiary } from '@/types';
// import { AxiosError } from 'axios';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Image } from '@chakra-ui/next-js';
import { useParams } from 'next/navigation';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const DisbursementPage = () => {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sort, setSort] = useState<Option | null>(options[0]);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  // const { mutate: processModule, isPending: isProcessModulePending } = useProcessModule();
  // const { mutate: uploadProgram, isPending } = useUploadProgram();
  const { response } = useGetProgramById(programID?.toString());

  const programModuleId = response?.body?.programModules?.find((module) => module.module === 'Disbursement')?.id ?? '';

  console.log(programModuleId);

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({ page: page, pageSize: 10 }, programID?.toLocaleString(), '7');

  // const { data: uploadStatus } = useGetUploadStatus(programModuleId?.toString());

  // const isUpload = uploadStatus?.body;

  const totalPages = data?.body.totalPages ?? 0;

  const tableData = useMemo(() => {
    return data ? data.body.data : [];
  }, [data]);

  const onApprove = ({ status, id }: { status: string; id: number }) => {
    const payload = {
      status: status.toUpperCase(),
      beneficiaryId: [id],
      moduleId: 7,
      programId: programID.toString(),
    };

    approveBeneficiary(payload, {
      onSuccess: () => {
        toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
      },
    });
  };

  // const uploadData = () => {
  //   processModule(programModuleId.toString(), {
  //     onSuccess: () => {
  //       uploadProgram(programModuleId.toString(), {
  //         onSuccess: () => {
  //           toast({ title: 'Data uploaded successfully', status: 'success' });
  //         },
  //       });
  //     },
  //     onError: (error) => {
  //       let message = 'An unknown error occurred';
  //       if (error instanceof Error) message = error.message;
  //       if (error instanceof AxiosError) message = error.response?.data.message || message;
  //       toast({ title: 'Error', description: message, status: 'error' });
  //     },
  //   });
  // };

  const dynamicColumns: ColumnDef<Beneficiary>[] = useMemo(() => {
    if (!tableData || tableData.length === 0) return [];
    const keys = Object.keys(tableData[0]);

    const otherColumns = keys
      .filter((key) => key !== 'id' && key !== 'moduleName' && key !== 'status')
      .map((key) => ({
        header: () => (
          <Text variant="Body3Semibold" textAlign="left">
            {key}
          </Text>
        ),
        accessorKey: key,
        cell: (info) => {
          const value = info.getValue() as string | number | undefined;

          if (key === 'Picture' && typeof value === 'string')
            return (
              <Box pos="relative" boxSize="5" rounded="full" overflow="hidden">
                <Image src={value} alt="Beneficiary Image" sizes="1.25rem" sx={{ objectFit: 'cover' }} fill />
              </Box>
            );

          return (
            <Text as="span" textAlign="left" display="block" variant="Body2Regular">
              {info.getValue() !== null && value !== undefined ? value.toString() : 'N/A'}
            </Text>
          );
        },
        enableSorting: false, // You can enable this if sorting is required
      }));

    const statusColumn: ColumnDef<Beneficiary> = {
      header: () => (
        <Text variant="Body3Semibold" textAlign="center">
          Status
        </Text>
      ),
      accessorKey: 'status',
      cell: (info) =>
        info.row.original.status === 'APPROVED' ? (
          <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
            Approved
          </Text>
        ) : info.row.original.status === 'DISAPPROVED' ? (
          <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
            Denied
          </Text>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              aria-label="Actions"
              icon={<Icon as={MdMoreHoriz} boxSize="1.25rem" color="grey.500" />}
              minW="0"
              h="auto"
              mx="auto"
              display="flex"
              p="1"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove({ status: 'Approved', id: info.row.original.id });
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Pass
                </Text>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove({ status: 'Disapproved', id: info.row.original.id });
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Fail
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ),
      enableSorting: false, // Enable sorting for status
    };

    return [...otherColumns, statusColumn];
  }, [tableData]);

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  return (
    <Flex direction="column" h="full">
      <Flex align="center" justify="space-between" mb="8">
        <Flex align="center" gap="6">
          <Flex align="center" gap="2" shrink={0}>
            <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
              Filter by
            </Text>
            <Dropdown variant="primaryDropdown" options={options} value={sort} onChange={setSort} />
          </Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="primary.600">
              <MdSearch />
            </InputLeftElement>
            <Input placeholder="Search" variant="primary" pl="2.5rem" />
          </InputGroup>
        </Flex>
        <ButtonGroup size="medium" spacing="4">
          <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary">
            Download Report
          </Button>
          {/* <Button
            leftIcon={<MdCloudUpload />}
            variant="primary"
            size="medium"
            isLoading={isPending || isProcessModulePending}
            onClick={uploadData}
            isDisabled={!isUpload}
          >
            Upload Data
          </Button> */}
        </ButtonGroup>
      </Flex>
      <>
        <ReusableTable
          data={tableData}
          columns={dynamicColumns}
          onClick={openBeneficiaryModal}
          selectable
          isLoading={isLoading || isRefetching}
          isError={isError || isRefetchError}
          onRefresh={refetch}
        />
        <TablePagination
          handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
          handlePageChange={(pageNumber) => setPage(pageNumber)}
          isNextDisabled={page >= totalPages}
          isPrevDisabled={page <= 1}
          currentPage={page}
          totalPages={totalPages}
          isDisabled={isLoading || isPlaceholderData}
          display={totalPages > 1 ? 'flex' : 'none'}
        />
      </>
      {beneficiary && <BeneficiaryDetailsModal isOpen={isOpen} onClose={onClose} beneficiary={beneficiary} />}
    </Flex>
  );
};

export default DisbursementPage;
