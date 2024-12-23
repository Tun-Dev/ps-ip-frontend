'use client';

import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdDownload, MdGroupAdd, MdGroups, MdSearch } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';

const ClientsAgentsPage = () => {
  const [selected, setSelected] = useState<'agents' | 'aggregators'>('agents');
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <Flex gap="1rem">
          <Box w="265px" onClick={() => setSelected('agents')} cursor="pointer">
            <OverviewCard title="Total Agents" number={200} icon={MdGroups} active={selected === 'agents'} />
          </Box>
          <Box w="265px" onClick={() => setSelected('aggregators')} cursor="pointer">
            <OverviewCard title="Total Aggregators" number={5} icon={MdGroupAdd} active={selected === 'aggregators'} />
          </Box>
        </Flex>
      </Flex>
      {selected === 'agents' ? <AgentsTab /> : <AggregatorTab />}
    </Flex>
  );
};

const AggregatorTab = () => {
  return (
    <Flex flexDir="column" w="100%" borderTop="1px solid" borderTopColor="grey.200">
      <Flex justifyContent="space-between" py="5">
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium">
          Download Report
        </Button>
      </Flex>
      <Box py="2" px="2.5" boxShadow="card" border="1px solid" borderColor="grey.100" borderRadius="12px">
        <ReusableTable selectable data={aggregatorData} columns={aggregatorColumns} />
      </Box>
    </Flex>
  );
};

const AgentsTab = () => {
  return (
    <Flex flexDir="column" w="100%" borderTop="1px solid" borderTopColor="grey.200">
      <Flex justifyContent="space-between" py="5">
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium">
          Download Report
        </Button>
      </Flex>
      <Box py="2" px="2.5" boxShadow="card" border="1px solid" borderColor="grey.100" borderRadius="12px">
        <ReusableTable selectable data={agentsData} columns={agentsColumns} />
      </Box>
    </Flex>
  );
};

const agentsData = [
  { agent: 'Usman Ola', lga: 'Ikeja', aggregator: 'NURTW', gender: 'Female', objective: 500, status: 'Online' },
  { agent: 'Oluwaseun Chukwu', lga: 'Agege', aggregator: 'NURTW', gender: 'Male', objective: 1000, status: 'Offline' },
  { agent: 'Chukwudi Abubakar', lga: 'Badagry', aggregator: 'NURTW', gender: 'Male', objective: 500, status: 'Online' },
  { agent: 'Amina Adewale', lga: 'Ikorodu', aggregator: 'NURTW', gender: 'Female', objective: 1000, status: 'Online' },
  { agent: 'Chukwudi Abubakar', aggregator: 'NURTW', gender: 'Male', objective: 500, status: 'Online' },
  {
    agent: 'Oluwaseun Chukwu',
    lga: 'Ajeromi-Ifelodun',
    aggregator: 'NURTW',
    gender: 'Female',
    objective: 1000,
    status: 'Online',
  },
  { agent: 'Usman Ola', lga: 'Gwagwalada', aggregator: 'NURTW', gender: 'Male', objective: 500, status: 'Online' },
];

const agentsColumns: ColumnDef<(typeof agentsData)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Agent
      </Text>
    ),
    accessorKey: 'agent',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.agent}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        LGA
      </Text>
    ),
    accessorKey: 'lga',
    cell: (info) => (
      <Text variant="Body2Regular">{info.row.original.lga ? info.row.original.lga : '----------------'}</Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Aggregator
      </Text>
    ),
    accessorKey: 'aggregator',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.aggregator}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Gender
      </Text>
    ),
    accessorKey: 'gender',
    enableSorting: false,
    cell: (info) => <Text variant="Body2Regular">{info.row.original.gender}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Objective
      </Text>
    ),
    accessorKey: 'objective',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        variant="Body2Semibold"
        bgColor={info.row.original.objective === 1000 ? 'primary.100' : 'grey.200'}
        rounded="xl"
        p="0.125rem 0.71875rem"
      >
        {info.row.original.objective}/1000
      </Text>
    ),
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
];

const aggregatorData = [
  { aggregator: 'NURTW', program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME', totalAgents: 250, activeAgents: 200 },
  {
    aggregator: 'NURTW',
    program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM',
    totalAgents: 200,
    activeAgents: 150,
  },
  { aggregator: 'NURTW', program: 'ALIKO DANGOTE FOUNDATION FUND', totalAgents: 150, activeAgents: 100 },
  { aggregator: 'NURTW', program: 'CBN BACKWARD INTEGRATION FUND', totalAgents: 300, activeAgents: 250 },
  {
    aggregator: 'NURTW',
    program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM',
    totalAgents: 300,
    activeAgents: 200,
  },
];

const aggregatorColumns: ColumnDef<(typeof aggregatorData)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Aggregator
      </Text>
    ),
    accessorKey: 'aggregator',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.aggregator}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Program
      </Text>
    ),
    accessorKey: 'program',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.program}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Total Agents
      </Text>
    ),
    accessorKey: 'totalAgents',
    enableSorting: false,
    cell: (info) => <Text variant="Body2Regular">{info.row.original.totalAgents}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Active Agents
      </Text>
    ),
    accessorKey: 'activeAgents',
    enableSorting: false,
    cell: (info) => <Text variant="Body2Regular">{info.row.original.activeAgents}</Text>,
  },
];

export default ClientsAgentsPage;
