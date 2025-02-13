'use client';

import {
  Button,
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
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregators } from '@/hooks/useGetAggregators';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { AggregatorDetailsModal, ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
// import { EditAggregatorModal } from '@/shared/chakra/modals/EditAggregatorModal';
import type { Aggregator } from '@/types';

const AggregatorTab = () => {
  const [page, setPage] = useState(1);
  const [programId, setProgramId] = useState('');

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const [agent, setAgent] = useState('');
  const [minAgent, maxAgent] = agent.split('-');

  const [aggregatorsDetails, setAggregatorsDetails] = useState<Aggregator | null>(null);

  // const [selectedAggregator, setSelectedAggregator] = useState<Aggregator>();

  const { data: programs } = useGetPrograms({ page: 1, pageSize: 10 });

  // const { onClose, onOpen, isOpen } = useDisclosure();
  const { onClose: onCloseDetails, onOpen: onOpenDetails, isOpen: isOpenDetails } = useDisclosure();

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } = useGetAggregators({
    page,
    pageSize: 10,
    program: programId === '' ? undefined : programId,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    minAgent: agent === '' ? undefined : parseInt(minAgent),
    maxAgent: agent === '' ? undefined : parseInt(maxAgent),
  });
  const aggregators = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  console.log('aggregators', aggregators);

  const resetFilters = () => {
    setPage(1);
    setProgramId('');
    setAgent('');
    setQuery('');
  };

  const openAggregatorDetailsModal = (aggregator: Aggregator) => {
    setAggregatorsDetails(aggregator);
    onOpenDetails();
  };

  const columns: ColumnDef<Aggregator>[] = [
    {
      header: 'Aggregator',
      accessorKey: 'name',
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          No. of Program
        </Text>
      ),
      accessorKey: 'programCount',
      enableSorting: false,
      cell: (props) => (
        <Text variant="Body2Regular" textAlign="center">
          {props.row.original.programCount}
        </Text>
      ),
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          No. of Agents
        </Text>
      ),
      accessorKey: 'totalAgents',
      enableSorting: false,
      cell: (props) => (
        <Text variant="Body2Regular" textAlign="center">
          {props.row.original.totalAgents}
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
      cell: (info) => (
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
                openAggregatorDetailsModal(info.row.original);
              }}
            >
              <Text as="span" variant="Body2Regular" w="full">
                Manage Aggregator
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

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
      {/* <EditAggregatorModal isOpen={isOpen} onClose={onClose} initialValues={selectedAggregator} /> */}
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
          // onClick={openAggregatorDetailsModal}
          columns={columns}
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
      {aggregatorsDetails && (
        <AggregatorDetailsModal isOpen={isOpenDetails} onClose={onCloseDetails} aggregator={aggregatorsDetails} />
      )}
    </Flex>
  );
};

export default AggregatorTab;
