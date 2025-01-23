'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregatorAgents } from '@/hooks/useGetAggregatorAgents';
import { useGetAggregatorDashboard } from '@/hooks/useGetAggregatorDashboard';
import { AddNewAgentModal, ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import type { AggregatorAgent } from '@/types';
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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdAddCircle, MdDownload, MdEditCalendar, MdGroups, MdMoreHoriz, MdSearch } from 'react-icons/md';

const AggregatorsAgentsDashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isPending, isError } = useGetAggregatorDashboard();

  return (
    <Flex flexDir="column" gap="1.5rem" boxSize="full">
      <AddNewAgentModal isOpen={isOpen} onClose={onClose} />
      <Flex flexDir="column" gap="12px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>
          <Button variant="primary" leftIcon={<MdAddCircle />} onClick={onOpen}>
            Add New Agent
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 3, xl: 4 }} spacing="4">
          <OverviewCard
            title="Total Agents"
            number={isPending || isError ? '...' : data.body.totalAgents}
            icon={MdGroups}
            minW="unset"
          />
          <OverviewCard
            title="Agents Active"
            number={isPending || isError ? '...' : data.body.totalAgents}
            icon={MdGroups}
            minW="unset"
          />
          <OverviewCard
            title="Agents Online"
            number={isPending || isError ? '...' : data.body.agentsOnline}
            icon={MdGroups}
            minW="unset"
          />
        </SimpleGrid>
      </Flex>
      <AgentsTab />
    </Flex>
  );
};

const AgentsTab = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: activeAgents } = useGetAggregatorAgents({ page: 1, pageSize: 10, active: true });
  const { data: inactiveAgents } = useGetAggregatorAgents({ page: 1, pageSize: 10, active: false });

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
              <Text variant="Body3Semibold">{activeAgents?.body.total ?? 0}</Text>
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
              <Text variant="Body3Semibold">{inactiveAgents?.body.total ?? 0}</Text>
            </Box>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels h="100%">
        <TabPanel px="0" h="100%">
          <AgentPanel type="active" />
        </TabPanel>
        <TabPanel px="0" h="100%">
          <AgentPanel type="inactive" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type AgentPanelProps = {
  type: 'active' | 'inactive';
};

const AgentPanel = ({ type }: AgentPanelProps) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const debouncedQuery = useDebounce(query);

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetchError, isRefetching } = useGetAggregatorAgents(
    {
      page,
      pageSize: 10,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      active: type === 'active',
    }
  );

  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

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
              w="94px"
              fontSize="13px"
              fontWeight="600"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
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
        <Flex gap={2}>
          <Button leftIcon={<MdDownload />} variant="secondary" size="medium" borderRadius="10px">
            Download Report
          </Button>
          <Button leftIcon={<MdEditCalendar />} variant="primary" size="medium" borderRadius="10px">
            Schedule Activation
          </Button>
        </Flex>
      </Flex>
      <ReusableTable
        selectable
        data={data?.body.data ?? []}
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

const columns: ColumnDef<AggregatorAgent>[] = [
  {
    header: 'Agents',
    accessorKey: 'firstName',
    cell: (info) => (
      <Text variant="Body2Semibold">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Text>
    ),
  },
  {
    header: 'Program',
    accessorKey: 'aggregator',
  },
  {
    header: 'LGA',
    accessorKey: 'lga',
    cell: (info) => <Text variant="Body2Regular">{info.row.original.lga || '----------------'}</Text>,
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
      // const { id, status, programId } = info.row.original;
      return (
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
                  <Button
                    w="100%"
                    bg="transparent"
                    size="small"
                    p="0"
                    fontSize="13px"
                    fontWeight="400"
                    px="4px"
                    // onClick={() => handleOnclick(id, !status, programId)}
                  >
                    {info.row.original.status === true ? 'Deactivate' : 'Activate'} Agent
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      );
    },
  },
];

export default AggregatorsAgentsDashboard;
