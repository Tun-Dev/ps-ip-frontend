import {
  Box,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useActivateAgent } from '@/hooks/useActivateAgent';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAgents } from '@/hooks/useGetAgents';
import { useGetAggregators } from '@/hooks/useGetAggregators';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Agent } from '@/types';

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
  // const total = data?.body.total ?? 0;
  const active = data?.body.data.filter((agent) => agent.status === true).length ?? 0;
  const inactive = data?.body.data.filter((agent) => agent.status === false).length ?? 0;

  return (
    <Tabs onChange={(index) => setActiveTabIndex(index)} size="sm" variant="unstyled" isLazy flex="1 1 0%">
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
              <Text variant="Body3Semibold">{active}</Text>
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
              <Text variant="Body3Semibold">{inactive}</Text>
            </Box>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels h="100%">
        <TabPanel px="0" h="100%">
          <AgentPanel
            page={page}
            setPage={setPage}
            debouncedQuery={debouncedQuery}
            setQuery={setQuery}
            aggregatorId={aggregatorId}
            setAggregatorId={setAggregatorId}
            type="active"
          />
        </TabPanel>
        <TabPanel px="0" h="100%">
          <AgentPanel
            page={page}
            setPage={setPage}
            debouncedQuery={debouncedQuery}
            setQuery={setQuery}
            aggregatorId={aggregatorId}
            setAggregatorId={setAggregatorId}
            type="inactive"
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
  type: 'active' | 'inactive';
};

const AgentPanel = ({
  page,
  setPage,
  debouncedQuery,
  setQuery,
  aggregatorId,
  setAggregatorId,
  type,
}: AgentPanelProps) => {
  const toast = useToast();
  const { data: aggregators } = useGetAggregators({ page: 1, pageSize: 10 });

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetchError, isRefetching } = useGetAgents({
    page,
    pageSize: 10,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    aggregatorId: aggregatorId === '' ? undefined : parseInt(aggregatorId),
  });
  const { mutate } = useActivateAgent();
  const agents = useMemo(() => filterByStatus(data?.body.data || [], type) ?? [], [data, type]);

  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
    setAggregatorId('');
  };

  const handleOnclick = (id: string, status: boolean, programID: string) => {
    const payload = {
      agentId: id,
      isActive: status,
      programId: programID,
    };

    mutate(payload, {
      onSuccess: () => {
        toast({ title: `${status !== true ? 'Deactivated' : 'Activated'} agent successfully`, status: 'success' });
      },
    });
  };

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
    // {
    //   header: 'Aggregator',
    //   accessorKey: 'aggregator',
    // },
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
      cell: (info) => {
        return (
          <>
            {info.row.original.status === true ? (
              <Text variant="Body3Semibold" color="green" textAlign="center">
                Online{' '}
                <Text as="span" variant="Body3Semibold" display="inline" color="green">
                  (Active)
                </Text>
              </Text>
            ) : (
              <Text variant="Body3Semibold" color="grey.500" textAlign="center">
                Offline{' '}
                <Text as="span" variant="Body3Semibold" display="inline" color="grey.500">
                  (Deactivated)
                </Text>
              </Text>
            )}
          </>
        );
      },
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          Actions
        </Text>
      ),
      id: 'actions',
      enableSorting: false,
      cell: (info) => {
        const { id, status, programId } = info.row.original;
        return (
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
                  handleOnclick(id, !status, programId);
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  {info.row.original.status === true ? 'Deactivate' : 'Activate'} Agent
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    },
  ];

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      <Flex justifyContent="space-between">
        <Flex gap="24px" alignItems="center">
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
      <>
        <ReusableTable
          selectable
          data={agents}
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
    </Flex>
  );
};

export default AgentsTab;

function filterByStatus(data: Agent[], status: 'active' | 'inactive') {
  if (!data) return [];
  const isActive = status.toLowerCase() === 'active';
  return data.filter((item) => item.status === isActive);
}
