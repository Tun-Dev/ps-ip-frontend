'use client';

import {
  Button,
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
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregators } from '@/hooks/useGetAggregators';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import type { Aggregator } from '@/types';
// import { formatErrorMessage } from '@/utils';

const AggregatorTab = () => {
  const [page, setPage] = useState(1);
  const [programId, setProgramId] = useState('');

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const [agent, setAgent] = useState('');
  const [minAgent, maxAgent] = agent.split('-');

  const { data: programs } = useGetPrograms({ page: 1, pageSize: 10 });

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } = useGetAggregators({
    page,
    pageSize: 10,
    program: programId === '' ? undefined : parseInt(programId),
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    minAgent: agent === '' ? undefined : parseInt(minAgent),
    maxAgent: agent === '' ? undefined : parseInt(maxAgent),
  });
  const aggregators = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setProgramId('');
    setAgent('');
    setQuery('');
  };

  // console.log(data);

  return (
    <Flex
      flexDir="column"
      gap="1.5rem"
      w="100%"
      h="100%"
      padding="1rem 0px"
      borderTop="1px solid"
      borderTopColor="grey.200"
    >
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
              placeholder="Program"
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
            >
              {programs?.body.data.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </Select>
            <Select
              size="small"
              variant="white"
              w="94px"
              fontSize="13px"
              fontWeight="600"
              placeholder="Agents"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="50-100">50-100</option>
              <option value="100-150">100-150</option>
              <option value="150-200">150-200</option>
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
          <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
            Download Report
          </Button>
        </Flex>
      </Flex>

      <>
        <ReusableTable
          selectable
          data={aggregators}
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
      </>
    </Flex>
  );
};

const columns: ColumnDef<Aggregator>[] = [
  {
    header: 'Aggregator',
    accessorKey: 'name',
  },
  {
    header: 'Program',
    accessorKey: 'programName',
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500" textAlign="center">
        Agents
      </Text>
    ),
    accessorKey: 'noOfAgents',
    enableSorting: false,
    cell: (props) => (
      <Text variant="Body2Regular" textAlign="center">
        {props.row.original.noOfAgents}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500" textAlign="center">
        Actions
      </Text>
    ),
    id: 'actions',
    enableSorting: false,
    cell: () => (
      <Flex>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
              <MdMoreHoriz size="1.25rem" />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content" minW="121px" p="8px">
            <PopoverArrow />
            <PopoverBody p="0">
              <Flex flexDir="column">
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400" px="4px">
                  Reassign Aggregator
                </Button>
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400" px="4px">
                  Deactivate Aggregator
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    ),
  },
];

export default AggregatorTab;
