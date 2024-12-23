'use client';

import { AddNewAgentModal, ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { MdAddCircle, MdDownload, MdEditCalendar, MdGroups, MdSearch } from 'react-icons/md';

const AgentsTab = () => {
  const agentsData = [
    { agent: 'Usman Ola', lga: 'Ikeja', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Oluwaseun Chukwu', lga: 'Agege', aggregator: 'NURTW', gender: 'Male', status: 'Offline' },
    { agent: 'Chukwudi Abubakar', lga: 'Badagry', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
    { agent: 'Amina Adewale', lga: 'Ikorodu', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Chukwudi Abubakar', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
    { agent: 'Oluwaseun Chukwu', lga: 'Ajeromi-Ifelodun', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Usman Ola', lga: 'Gwagwalada', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
  ];

  const inactiveAgentsData = [
    { agent: 'Usman Ola', lga: 'Ikeja', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Oluwaseun Chukwu', lga: 'Agege', aggregator: 'NURTW', gender: 'Male', status: 'Offline' },
    { agent: 'Chukwudi Abubakar', lga: 'Badagry', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
    { agent: 'Amina Adewale', lga: 'Ikorodu', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Chukwudi Abubakar', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
    { agent: 'Oluwaseun Chukwu', lga: 'Ajeromi-Ifelodun', aggregator: 'NURTW', gender: 'Female', status: 'Online' },
    { agent: 'Usman Ola', lga: 'Gwagwalada', aggregator: 'NURTW', gender: 'Male', status: 'Online' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Agent
          </Text>
        ),
        accessorKey: 'agent',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            LGA
          </Text>
        ),
        accessorKey: 'lga',
        enableSorting: false,
        cell: (info) => <>{info.row.original.lga ? info.row.original.lga : '----------------'}</>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Gender
          </Text>
        ),
        accessorKey: 'gender',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Status
          </Text>
        ),
        accessorKey: 'status',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body3Semibold" color={info.row.original.status === 'Online' ? 'green' : 'grey.500'}>
            {info.row.original.status}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
            Last Active
          </Text>
        ),
        accessorKey: 'aggregator',
        enableSorting: false,
        cell: () => <Text variant="Body2Semibold">Dec. 20, 4:00pm</Text>,
      },
      {
        header: () => <p></p>,
        accessorKey: 'amount',
        enableSorting: false,
        cell: () => (
          <Flex justifyContent="center" alignItems="center" gap="8px">
            <Text variant="Body3Semibold" color="grey.500">
              Assigned
            </Text>
            <Button variant="secondary" size="small">
              Reassign
            </Button>
          </Flex>
        ),
      },
      {
        header: () => (
          <Button variant="cancel" size="small">
            Deactivate Agent
          </Button>
        ),
        accessorKey: 'deactivate',
        enableSorting: false,
        cell: () => (
          <Button variant="cancel" size="small">
            Deactivate Agent
          </Button>
        ),
      },
    ],
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inactiveColumns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Agent
          </Text>
        ),
        accessorKey: 'agent',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            LGA
          </Text>
        ),
        accessorKey: 'lga',
        enableSorting: false,
        cell: (info) => <>{info.row.original.lga ? info.row.original.lga : '----------------'}</>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Gender
          </Text>
        ),
        accessorKey: 'gender',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Status
          </Text>
        ),
        accessorKey: 'status',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body3Semibold" color={info.row.original.status === 'Online' ? 'green' : 'grey.500'}>
            {info.row.original.status}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
            Last Active
          </Text>
        ),
        accessorKey: 'aggregator',
        enableSorting: false,
        cell: () => <Text variant="Body2Semibold">Dec. 20, 4:00pm</Text>,
      },
      {
        header: () => <p></p>,
        accessorKey: 'assigned',
        enableSorting: false,
        cell: () => (
          <Flex justifyContent="center" alignItems="center" gap="8px">
            <Text variant="Body3Semibold" color="grey.500">
              Assigned
            </Text>
            <Button variant="secondary" size="small">
              Reassign
            </Button>
          </Flex>
        ),
      },
      {
        header: () => (
          <Button variant="secondary" size="small">
            Activate
          </Button>
        ),
        accessorKey: 'activate',
        enableSorting: false,
        cell: () => (
          <Flex justifyContent="center" alignItems="center" gap="8px">
            <Text variant="Body3Semibold" color="red">
              Deactivated
            </Text>
            <Button variant="secondary" size="small">
              Activate
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Tabs size="sm" variant="unstyled">
        <TabList>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text variant="Body2Semibold">Active</Text>
              <Box p={'2px 4px'} borderRadius="8px" bg="gray.200">
                <Text variant="Body3Semibold">200</Text>
              </Box>
            </Flex>
          </Tab>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text variant="Body2Semibold">Inactive</Text>
              <Box p={'2px 4px'} borderRadius="8px" bg="gray.200">
                <Text variant="Body3Semibold">200</Text>
              </Box>
            </Flex>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="24px" alignItems="center">
                  <Flex gap="8px" alignItems="center">
                    <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
                      Filter by
                    </Text>
                    <Select
                      placeholder="Select..."
                      size="small"
                      defaultValue={'program'}
                      w="94px"
                      fontSize="13px"
                      fontWeight="600"
                    >
                      <option key={'program'} value={'program'}>
                        Program
                      </option>
                    </Select>
                  </Flex>
                  <InputGroup w="212px" size="sm">
                    <InputLeftElement>
                      <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
                    </InputLeftElement>
                    <Input variant="primary" fontSize="10px" placeholder="Search" />
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
              <Box
                padding="0px 1rem 1rem"
                boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
                borderRadius="12px"
              >
                <ReusableTable selectable data={agentsData} columns={columns} />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="24px" alignItems="center">
                  <Flex gap="8px" alignItems="center">
                    <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
                      Filter by
                    </Text>
                    <Select
                      placeholder="Select..."
                      size="small"
                      defaultValue={'program'}
                      w="94px"
                      fontSize="13px"
                      fontWeight="600"
                    >
                      <option key={'program'} value={'program'}>
                        Program
                      </option>
                    </Select>
                  </Flex>
                  <InputGroup w="212px" size="sm">
                    <InputLeftElement>
                      <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
                    </InputLeftElement>
                    <Input variant="primary" fontSize="10px" placeholder="Search" />
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
              <Box
                padding="0px 1rem 1rem"
                boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
                borderRadius="12px"
              >
                <ReusableTable selectable data={inactiveAgentsData} columns={inactiveColumns} />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const AggregatorsAgentsDashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
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
        <Flex gap="1rem">
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Total Agents" number={20} icon={MdGroups} />
          </Box>
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Agents Active" number={20} icon={MdGroups} />
          </Box>
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Agents Online" number={20} icon={MdGroups} />
          </Box>
        </Flex>
      </Flex>
      <AgentsTab />
    </Flex>
  );
};

export default AggregatorsAgentsDashboard;
