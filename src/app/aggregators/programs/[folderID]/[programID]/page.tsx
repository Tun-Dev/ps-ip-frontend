'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregatorAnalytics } from '@/hooks/useGetAggregatorAnalytics';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import {
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  MdAccessTimeFilled,
  MdCancel,
  MdCheckCircle,
  MdCloudUpload,
  MdDownload,
  MdMoreHoriz,
  MdRefresh,
  MdSearch,
  MdViewList,
} from 'react-icons/md';

const AggregatorsEnumerationDashboard = () => {
  const { programID } = useParams();
  const { isPending, data, isError } = useGetAggregatorAnalytics(programID.toString());
  return (
    <Stack gap="6" boxSize="full">
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Completed Objectives"
          number={isPending || isError ? '...' : data.body.completedObjectives}
          icon={MdCheckCircle}
          iconColor="green"
        />
        <OverviewCard
          title="Objectives Pending"
          number={isPending || isError ? '...' : data.body.pendingObjectives}
          icon={MdRefresh}
        />
        <OverviewCard
          title="Pending Reviews"
          number={isPending || isError ? '...' : data.body.pendingReviews}
          icon={MdRefresh}
        />
      </SimpleGrid>
      <Divider borderColor="grey.200" opacity="1" />
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Total Responses"
          number={isPending || isError ? '...' : data.body.totalResponses}
          icon={MdViewList}
          size="small"
        />
        <OverviewCard
          title="Approved Enumeration"
          number={isPending || isError ? '...' : data.body.approvedEnumerations}
          icon={MdCheckCircle}
          size="small"
          colorScheme="green"
        />
        <OverviewCard
          title="Denied Enumeration"
          number={isPending || isError ? '...' : data.body.deniedEnumerations}
          icon={MdCancel}
          size="small"
          colorScheme="red"
        />
        <OverviewCard
          title="Completion Time"
          number={
            isPending || isError
              ? '...'
              : data.body.completionTime
                ? new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : 'Ongoing'
          }
          icon={MdAccessTimeFilled}
          size="small"
        />
      </SimpleGrid>
      <EnumerationsTable />
    </Stack>
  );
};

const EnumerationsTable = () => {
  const { programID } = useParams();
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const [status, setStatus] = useState('');

  const { data: modules } = useGetModules();
  const enumerationModuleId = modules?.body.find((module) => module.name === 'Enumeration')?.id ?? 0;

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } =
    useGetBeneficiariesById(
      {
        page,
        pageSize: 10,
        query: debouncedQuery === '' ? undefined : debouncedQuery,
      },
      programID.toString(),
      enumerationModuleId.toString()
    );
  const tableData = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setStatus('');
    setQuery('');
  };

  const columns: ColumnDef<Beneficiary>[] = useMemo(() => {
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
                    <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400">
                      Pass
                    </Button>
                    <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400">
                      Fail
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

  return (
    <Flex flexDir="column" gap="1.5rem" boxSize="full">
      <Flex justifyContent="space-between">
        <Flex gap="24px" alignItems="center">
          <Flex gap="8px" alignItems="center">
            <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
              Filter by
            </Text>
            <Select
              size="small"
              variant="white"
              w="94px"
              fontSize="13px"
              fontWeight="600"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </Flex>
          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input
              variant="primary"
              fontSize="10px"
              placeholder="Search"
              onChange={(e) => {
                // Reset filters when search query changes
                resetFilters();
                setQuery(e.target.value);
              }}
            />
          </InputGroup>
        </Flex>
        <Flex gap="8px" alignItems="center">
          <Button leftIcon={<MdDownload />} variant="secondary" size="medium" borderRadius="10px">
            Download Report
          </Button>
          <Button leftIcon={<MdCloudUpload />} variant="primary" size="medium" borderRadius="10px">
            Upload Selected Data
          </Button>
        </Flex>
      </Flex>

      <ReusableTable
        selectable
        data={tableData}
        columns={columns}
        headerBgColor="#F3F9F2"
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
    </Flex>
  );
};

export default AggregatorsEnumerationDashboard;
