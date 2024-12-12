import {
  Box,
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
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MdDownload, MdErrorOutline, MdMoreHoriz, MdRefresh, MdSearch } from 'react-icons/md';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetAgents } from '@/hooks/useGetAgents';
import { useGetAggregators } from '@/hooks/useGetAggregators';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Agent } from '@/types';
import { formatErrorMessage } from '@/utils';

const columns: ColumnDef<Agent>[] = [
  {
    header: 'Agents',
    accessorKey: 'firstName',
    cell: (info) => (
      <Text variant="Body2Semibold">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Text>
    ),
  },
  {
    header: 'LGA',
    accessorKey: 'lga',
    cell: (info) => <Text variant="Body2Regular">{info.row.original.lga || '----------------'}</Text>,
  },
  {
    header: 'Aggregator',
    accessorKey: 'aggregator',
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500" textAlign="center">
        Gender
      </Text>
    ),
    accessorKey: 'gender',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body2Regular" textAlign="center">
        {info.row.original.gender || 'N/A'}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500" textAlign="center">
        Status
      </Text>
    ),
    accessorKey: 'status',
    enableSorting: false,
    cell: () => (
      <Text variant="Body3Semibold" color="green" textAlign="center">
        Online{' '}
        <Text as="span" variant="Body3Semibold" display="inline" color="green">
          (Active)
        </Text>
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
          <PopoverContent minW="121px" w="fit-content" p="8px">
            <PopoverArrow />
            <PopoverBody p="0">
              <Flex flexDir="column">
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400" px="4px">
                  Reassign Agent
                </Button>
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400" px="4px">
                  Deactivate Agent
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    ),
  },
];

const AgentsTab = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [aggregatorId, setAggregatorId] = useState('');

  const { data } = useGetAgents({
    page,
    pageSize: 10,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    aggregatorId: aggregatorId === '' ? undefined : parseInt(aggregatorId),
  });
  const total = data?.body.total ?? 0;

  return (
    <Tabs onChange={(index) => setActiveTabIndex(index)} size="sm" variant="unstyled" isLazy>
      <TabList>
        <Tab>
          <Flex alignItems="center" gap="4px">
            <Text variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>Active</Text>
            <Box
              p={'2px 4px'}
              borderRadius="8px"
              bg={activeTabIndex === 0 ? 'primary.100' : 'grey.200'}
              color={activeTabIndex === 0 ? 'text' : 'grey.500'}
            >
              <Text variant="Body3Semibold">{total}</Text>
            </Box>
          </Flex>
        </Tab>
        <Tab>
          <Flex alignItems="center" gap="4px">
            <Text variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>Inactive</Text>
            <Box
              p={'2px 4px'}
              borderRadius="8px"
              bg={activeTabIndex === 1 ? 'primary.100' : 'grey.200'}
              color={activeTabIndex === 1 ? 'text' : 'grey.500'}
            >
              <Text variant="Body3Semibold">{total}</Text>
            </Box>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel px="0">
          <AgentPanel
            page={page}
            setPage={setPage}
            debouncedQuery={debouncedQuery}
            setQuery={setQuery}
            aggregatorId={aggregatorId}
            setAggregatorId={setAggregatorId}
          />
        </TabPanel>
        <TabPanel px="0">
          <AgentPanel
            page={page}
            setPage={setPage}
            debouncedQuery={debouncedQuery}
            setQuery={setQuery}
            aggregatorId={aggregatorId}
            setAggregatorId={setAggregatorId}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type AgentPanelProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
  debouncedQuery: string;
  aggregatorId: string;
  setAggregatorId: Dispatch<SetStateAction<string>>;
};

const AgentPanel = ({ page, setPage, debouncedQuery, setQuery, aggregatorId, setAggregatorId }: AgentPanelProps) => {
  const { data: aggregators } = useGetAggregators({ page: 1, pageSize: 10 });

  const { data, isLoading, error, isPlaceholderData, refetch } = useGetAgents({
    page,
    pageSize: 10,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    aggregatorId: aggregatorId === '' ? undefined : parseInt(aggregatorId),
  });
  const agents = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
    setAggregatorId('');
  };

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex justifyContent="space-between">
        <Flex gap="8px" alignItems="center">
          <Flex gap="8px" alignItems="center">
            <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
              Filter by
            </Text>
            <Select
              size="small"
              variant="white"
              w="7rem"
              fontSize="13px"
              fontWeight="600"
              placeholder="Aggregator"
              value={aggregatorId}
              onChange={(e) => setAggregatorId(e.target.value)}
            >
              {aggregators?.body.data.map((aggregator) => (
                <option key={aggregator.id} value={aggregator.id}>
                  {aggregator.name}
                </option>
              ))}
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium" borderRadius="10px">
          Download Report
        </Button>
      </Flex>
      <Stack gap="4" padding="0px 1rem 1rem" boxShadow="card" borderRadius="12px">
        {!isLoading && error ? (
          <Stack align="center" justify="center" flex="1" gap="2">
            <Icon as={MdErrorOutline} color="red" boxSize="5" />
            <Text variant="Body2Semibold" textAlign="center" color="grey.500">
              {formatErrorMessage(error)}
            </Text>
            <Button
              size="medium"
              variant="link"
              iconSpacing="1"
              color="secondary.500"
              rightIcon={<MdRefresh size="1rem" />}
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </Stack>
        ) : !isLoading && agents.length < 1 ? (
          <Flex align="center" justify="center" flex="1">
            <Text variant="Body2Semibold" textAlign="center" color="grey.500">
              No data available.
            </Text>
          </Flex>
        ) : (
          <>
            <ReusableTable selectable data={agents} columns={columns} headerBgColor="#F3F9F2" isLoading={isLoading} />
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
        )}
      </Stack>
    </Flex>
  );
};

export default AgentsTab;
