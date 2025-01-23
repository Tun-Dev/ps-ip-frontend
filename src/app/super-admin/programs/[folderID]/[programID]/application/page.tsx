/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdArrowRightAlt, MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetUploadStatus } from '@/hooks/useGetUploadStatus';
import { useProcessModule } from '@/hooks/useProcessModule';
import { useUploadProgram } from '@/hooks/useUploadData';
import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const ApplicationPage = () => {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sort, setSort] = useState<Option | null>(options[0]);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { mutate: processModule, isPending: isProcessModulePending } = useProcessModule();
  const { mutate: uploadProgram, isPending } = useUploadProgram();
  const { response } = useGetProgramById(programID?.toString());

  const programModuleId = response?.body?.programModules?.find((module) => module.module === 'Application')?.id ?? '';
  const isProgramCompleted =
    response?.body?.programModules?.find((module) => module.module === 'Application')?.isCompleted ?? true;

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({ page: page, pageSize: 10 }, programID?.toLocaleString(), '1');

  const { data: uploadStatus } = useGetUploadStatus(programModuleId?.toString(), !isProgramCompleted);

  const isUpload = uploadStatus?.body;

  const totalPages = data?.body.totalPages ?? 0;

  const tableData = useMemo(() => {
    return data ? data.body.data : [];
  }, [data]);

  const onApprove = ({ status, id }: { status: string; id: number }) => {
    const payload = {
      status: status.toUpperCase(),
      beneficiaryId: [id],
      moduleId: 1,
      programId: programID.toString(),
    };

    approveBeneficiary(payload, {
      onSuccess: () => {
        toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
      },
    });
  };

  const uploadData = () => {
    processModule(programModuleId.toString(), {
      onSuccess: () => {
        uploadProgram(programModuleId.toString(), {
          onSuccess: () => {
            toast({ title: 'Data uploaded successfully', status: 'success' });
          },
        });
      },
      onError: (error) => {
        let message = 'An unknown error occurred';
        if (error instanceof Error) message = error.message;
        if (error instanceof AxiosError) message = error.response?.data.message || message;
        toast({ title: 'Error', description: message, status: 'error' });
      },
    });
  };

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
          console.log(key);
          const value = info.getValue() as string | number | undefined;
          const realValue =
            key === 'Date of Birth' ? format(parseISO(value as string), 'dd/MM/yyyy') : value?.toString();
          return (
            <Text as="span" textAlign="left" display="block" variant="Body2Regular">
              {info.getValue() !== null && value !== undefined ? realValue : 'N/A'}
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
          <Flex h="full" onClick={(e) => e.stopPropagation()}>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
                  <MdMoreHoriz size="1.25rem" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="121px" p="8px">
                <PopoverArrow />
                <PopoverBody p="0">
                  <Flex flexDir="column">
                    <Button
                      w="100%"
                      bg="transparent"
                      size="small"
                      p="0"
                      fontSize="13px"
                      fontWeight="400"
                      onClick={() => onApprove({ status: 'Approved', id: info.row.original.id })}
                    >
                      Approve
                    </Button>
                    <Button
                      w="100%"
                      bg="transparent"
                      size="small"
                      p="0"
                      fontSize="13px"
                      fontWeight="400"
                      onClick={() => onApprove({ status: 'Disapproved', id: info.row.original.id })}
                    >
                      Deny
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
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
        <Flex gap="16px">
          <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary" size="medium">
            Download Report
          </Button>
          <Button
            rightIcon={<MdArrowRightAlt />}
            variant="primary"
            size="medium"
            isLoading={isPending || isProcessModulePending}
            onClick={uploadData}
            isDisabled={!isUpload}
          >
            Proceed to next Module
          </Button>
        </Flex>
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

export default ApplicationPage;
