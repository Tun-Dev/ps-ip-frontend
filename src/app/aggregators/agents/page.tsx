'use client';

import { useActivateAgent } from '@/hooks/useActivateAgent';
import { useApproveAgents } from '@/hooks/useApproveAgents';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregatorAgents } from '@/hooks/useGetAggregatorAgents';
import { useGetAggregatorDashboard } from '@/hooks/useGetAggregatorDashboard';
import { useGetPendingAgents } from '@/hooks/useGetPendingAgents';
import { AddNewAgentModal, ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { ManageAgentModal } from '@/shared/chakra/modals/manage-agent-modal';
import { ScheduleActivationModal } from '@/shared/chakra/modals/ScheduleActivationModal';
import type { Agent, PendingAgent } from '@/types';
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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { MdAddCircle, MdDownload, MdGroups, MdMoreHoriz, MdSearch } from 'react-icons/md';

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
            number={isPending || isError ? '...' : data.body.agentsActive}
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
  const { data: pendingAgents } = useGetPendingAgents({ page: 1, pageSize: 10 });

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
        <Tab>
          <Flex alignItems="center" gap="4px">
            <Text variant={activeTabIndex === 2 ? 'Body2Bold' : 'Body2Semibold'}>Pending</Text>
            <Box
              p={'2px 4px'}
              borderRadius="8px"
              bg={activeTabIndex === 2 ? 'primary.100' : 'grey.200'}
              color={activeTabIndex === 2 ? 'text' : 'grey.500'}
            >
              <Text variant="Body3Semibold">{pendingAgents?.body.total ?? 0}</Text>
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
        <TabPanel px="0" h="100%">
          <PendingAgentPanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type AgentPanelProps = {
  type: 'active' | 'inactive';
};

const columnHelper = createColumnHelper<Agent>();

const AgentPanel = ({ type }: AgentPanelProps) => {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const debouncedQuery = useDebounce(query);

  const { onClose: onManageClose, onOpen: onManageOpen, isOpen: isManageOpen } = useDisclosure();
  const { onClose: onScheduleClose, onOpen: onScheduleOpen, isOpen: isScheduleOpen } = useDisclosure();

  const [selectedAgent, setSelectedAgent] = useState<Agent>();
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

  const { mutate: activateAgent } = useActivateAgent();
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

  const handleAgentActivation = useCallback(
    (agentId: string, isActive: boolean) => {
      activateAgent(
        { agentId, isActive },
        {
          onSuccess: () => {
            toast({
              title: `${isActive !== true ? 'Deactivated' : 'Activated'} agent successfully`,
              status: 'success',
            });
          },
        }
      );
    },
    [activateAgent, toast]
  );

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('firstName', {
          header: 'Agent',
          cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        }),
        columnHelper.accessor('gender', {
          header: () => (
            <Text as="span" variant="Body3Semibold" display="block" textAlign="center">
              Gender
            </Text>
          ),
          cell: (info) => (
            <Text as="span" variant="Body2Regular" display="block" textAlign="center">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
          enableSorting: false,
        }),
        columnHelper.accessor('programCount', {
          header: () => (
            <Text as="span" variant="Body3Semibold" display="block" textAlign="center">
              No. of Programs
            </Text>
          ),
          cell: (info) => (
            <Text as="span" variant="Body2Regular" display="block" textAlign="center">
              {info.getValue()}
            </Text>
          ),
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'status',
          header: () => (
            <Text as="span" variant="Body3Semibold" display="block" textAlign="center">
              Status
            </Text>
          ),
          cell: ({ row }) => {
            return (
              <Text variant="Body3Semibold" color={row.original.isOnline ? 'green' : 'grey.500'} textAlign="center">
                {row.original.isOnline ? 'Online' : 'Offline'}{' '}
                <Text
                  as="span"
                  variant="Body3Semibold"
                  display="inline"
                  color={row.original.isActive ? 'green' : 'grey.500'}
                >
                  ({row.original.isActive ? 'Active' : 'Deactivated'})
                </Text>
              </Text>
            );
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: () => {
            if (selectedAgents.length < 1)
              return (
                <Text variant="Body3Semibold" color="grey.500" textAlign="center">
                  Actions
                </Text>
              );

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
                  p="0"
                  onClick={(e) => e.stopPropagation()}
                />
                <MenuList>
                  <MenuItem>
                    <Text as="span" variant="Body2Regular">
                      Approve agents
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={onScheduleOpen}>
                    <Text as="span" variant="Body2Regular">
                      Batch schedule
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            );
          },
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
                  onClick={() => {
                    onManageOpen();
                    setSelectedAgent(info.row.original);
                  }}
                >
                  <Text as="span" variant="Body2Regular">
                    Manage agent
                  </Text>
                </MenuItem>
                {info.row.original.isActive && (
                  <>
                    <MenuItem
                      onClick={() => {
                        onScheduleOpen();
                        setSelectedAgent(info.row.original);
                      }}
                    >
                      <Text as="span" variant="Body2Regular">
                        Schedule agent
                      </Text>
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  onClick={() => {
                    handleAgentActivation(info.row.original.id, !info.row.original.isActive);
                  }}
                >
                  <Text as="span" variant="Body2Regular">
                    {info.row.original.isActive === true ? 'Deactivate' : 'Activate'} agent
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ),
        }),
      ] as ColumnDef<Agent>[],
    [handleAgentActivation, onScheduleOpen, onManageOpen, selectedAgents]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      {selectedAgent && <ManageAgentModal isOpen={isManageOpen} onClose={onManageClose} agent={selectedAgent} />}
      <ScheduleActivationModal
        isOpen={isScheduleOpen}
        onClose={() => {
          onScheduleClose();
          setSelectedAgent(undefined);
        }}
        agents={selectedAgent ? [selectedAgent] : selectedAgents}
      />
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
        </Flex>
      </Flex>
      <ReusableTable
        selectable
        data={data?.body.data ?? []}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
        onSelectionChange={setSelectedAgents}
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

const pendingAgentColumnHelper = createColumnHelper<PendingAgent>();

const PendingAgentPanel = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [selectedAgents, setSelectedAgents] = useState<PendingAgent[]>([]);

  const { mutate: approveAgent } = useApproveAgents();

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetchError, isRefetching } = useGetPendingAgents({
    page,
    pageSize: 10,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
  });

  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

  const handleApprove = useCallback(
    (agents: PendingAgent[]) => {
      const agentsToApprove = agents.map((agent) => ({ agentId: agent.id }));
      approveAgent(agentsToApprove);
    },
    [approveAgent]
  );

  const columns = useMemo(
    () =>
      [
        pendingAgentColumnHelper.accessor('firstName', {
          header: 'Agent',
          cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        }),
        pendingAgentColumnHelper.accessor('gender', {
          header: () => (
            <Text as="span" variant="Body3Semibold" display="block" textAlign="center">
              Gender
            </Text>
          ),
          cell: (info) => (
            <Text as="span" variant="Body2Regular" display="block" textAlign="center">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
          enableSorting: false,
        }),
        pendingAgentColumnHelper.accessor('state', {
          header: 'State',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        pendingAgentColumnHelper.accessor('lga', {
          header: 'LGA',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        pendingAgentColumnHelper.display({
          id: 'actions',
          header: () => {
            if (selectedAgents.length < 1)
              return (
                <Text variant="Body3Semibold" color="grey.500" textAlign="center">
                  Actions
                </Text>
              );

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
                  p="0"
                  onClick={(e) => e.stopPropagation()}
                />
                <MenuList>
                  <MenuItem onClick={() => handleApprove(selectedAgents)}>
                    <Text as="span" variant="Body2Regular">
                      Approve agents
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            );
          },
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
                <MenuItem onClick={() => handleApprove([info.row.original])}>
                  <Text as="span" variant="Body2Regular">
                    Approve agent
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ),
        }),
      ] as ColumnDef<PendingAgent>[],
    [handleApprove, selectedAgents]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      <Flex justifyContent="space-between">
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium" borderRadius="10px">
          Download Report
        </Button>
      </Flex>
      <>
        <ReusableTable
          selectable
          data={data?.body.data ?? []}
          columns={columns}
          isLoading={isLoading || isRefetching}
          isError={isError || isRefetchError}
          onRefresh={refetch}
          onSelectionChange={setSelectedAgents}
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

export default AggregatorsAgentsDashboard;
