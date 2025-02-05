'use client';

import { useActivateAgent } from '@/hooks/useActivateAgent';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAggregatorAgents } from '@/hooks/useGetAggregatorAgents';
import { useGetAggregatorDashboard } from '@/hooks/useGetAggregatorDashboard';
import { AddNewAgentModal, ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { ReassignAgentModal } from '@/shared/chakra/modals/ReassignAgentModal';
import type { AggregatorAgent } from '@/types';
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
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
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
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const debouncedQuery = useDebounce(query);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [selectedAgent, setSelectedAgent] = useState<AggregatorAgent>();

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
    (id: string, status: boolean) => {
      const payload = {
        agentId: id,
        isActive: status,
      };

      activateAgent(payload, {
        onSuccess: () => {
          toast({ title: `${status !== true ? 'Deactivated' : 'Activated'} agent successfully`, status: 'success' });
        },
      });
    },
    [activateAgent, toast]
  );

  const columns: ColumnDef<AggregatorAgent>[] = useMemo(
    () => [
      {
        header: 'Agents',
        accessorKey: 'firstName',
        cell: (info) => (
          <Text variant="Body2Semibold">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Text>
        ),
      },
      {
        header: 'Program',
        accessorKey: 'programName',
        cell: (info) => `${info.row.original.programName} - ${info.row.original.programType}`,
      },
      {
        header: 'LGA',
        accessorKey: 'lga',
        cell: (info) => <Text variant="Body2Regular">{info.row.original.lga || '----------------'}</Text>,
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
        cell: (info) => (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              aria-label="Actions"
              icon={<Icon as={MdMoreHoriz} boxSize="1.25rem" color="grey.500" />}
              h="auto"
              mx="auto"
              display="flex"
              p="1"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  onOpen();
                  setSelectedAgent(info.row.original);
                }}
              >
                <Text as="span" variant="Body2Regular">
                  Reassign Agent
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleAgentActivation(info.row.original.id, !info.row.original.status);
                }}
              >
                <Text as="span" variant="Body2Regular">
                  {info.row.original.status === true ? 'Deactivate' : 'Activate'} Agent
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ),
      },
    ],
    [handleAgentActivation, onOpen]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      {selectedAgent && <ReassignAgentModal isOpen={isOpen} onClose={onClose} agent={selectedAgent} />}
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

export default AggregatorsAgentsDashboard;
