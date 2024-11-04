'use client';

import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdDownload, MdSearch } from 'react-icons/md';

import { Dropdown } from '@/components';
import { ReusableTable } from '@/shared';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const EnumerationPage = () => {
  const [sort, setSort] = useState<Option | null>(options[0]);
  const [selectedAgent, setSelectedAgent] = useState<(typeof aggregatorData)[number] | null>(null);

  return (
    <Box w="full">
      <Flex align="center" justify="space-between" mb="8">
        <Flex align="center" gap="6">
          <Flex align="center" gap="2" shrink={0}>
            <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
              Sort by
            </Text>
            <Dropdown variant="primaryDropdown" options={options} value={sort} onChange={setSort} />
          </Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="primary.600">
              <MdSearch />
            </InputLeftElement>
            <Input placeholder="Search" variant="primary" pl="2.5rem" />
          </InputGroup>
        </Flex>
        <Button leftIcon={<MdDownload size="0.875rem" />} variant="primary" size="medium">
          Download Report
        </Button>
      </Flex>
      {selectedAgent ? (
        <ReusableTable data={beneficiaryData} columns={beneficiaryColumns} />
      ) : (
        <ReusableTable
          data={aggregatorData}
          columns={aggregatorColumns}
          onClick={(aggregator) => setSelectedAgent(aggregator)}
        />
      )}
    </Box>
  );
};

const aggregatorData = [
  {
    agent: 'Fiorenze Dehn',
    LGA: 'Corzuela',
    aggregator: 'WQOOH',
    objective: 400,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Augusto Chatelain',
    LGA: 'Qianqiao',
    aggregator: 'JDEIY',
    objective: 994,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Lockwood Gorring',
    LGA: 'Bobrov',
    aggregator: 'IRVTY',
    objective: 889,
    statusAndCompletionTime: 'Online',
    status: 'Active',
  },
  {
    agent: 'Lindsay Coatman',
    LGA: 'Ćićevac',
    aggregator: 'XZMEA',
    objective: 545,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Molly Kynton',
    LGA: 'Keruguya',
    aggregator: 'RPQDP',
    objective: 297,
    statusAndCompletionTime: 'Online',
    status: 'Active',
  },
  {
    agent: 'Zacharie Bagenal',
    LGA: 'Gyangkar',
    aggregator: 'SRGPX',
    objective: 568,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Halie Webber',
    LGA: 'Nanqiao',
    aggregator: 'VLWEE',
    objective: 301,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Linnet Pfeuffer',
    LGA: 'Yousheng',
    aggregator: 'AFMOF',
    objective: 182,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Oliviero Willas',
    LGA: 'Paso de Carrasco',
    aggregator: 'BRKIM',
    objective: 592,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
  {
    agent: 'Georgianna Harkins',
    LGA: 'Ulricehamn',
    aggregator: 'QAIFS',
    objective: 543,
    statusAndCompletionTime: 'Online',
    status: 'Active',
  },
  {
    agent: 'Neill Bannard',
    LGA: 'Shtip',
    aggregator: 'PARXH',
    objective: 1000,
    statusAndCompletionTime: '2024-10-08 15:47:03',
    status: 'Deactivated',
  },
  {
    agent: 'Florette Fairbourne',
    LGA: 'Bureya',
    aggregator: 'SOOSL',
    objective: 838,
    statusAndCompletionTime: 'Online',
    status: 'Deactivated',
  },
];

const aggregatorColumns: ColumnDef<(typeof aggregatorData)[number]>[] = [
  {
    header: 'Agents (50)',
    accessorKey: 'agent',
    cell: (info) => (
      <Text as="span" variant="Body2Semibold">
        {info.row.original.agent}
      </Text>
    ),
  },
  {
    header: 'LGA',
    accessorKey: 'LGA',
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.LGA}
      </Text>
    ),
  },
  {
    header: 'Aggregator',
    accessorKey: 'aggregator',
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.aggregator}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" display="block" textAlign="center" variant="Body3Semibold">
        Objective
      </Text>
    ),
    accessorKey: 'objective',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        w="fit-content"
        mx="auto"
        variant="Body2Semibold"
        bgColor="grey.200"
        rounded="xl"
        p="0.125rem 0.71875rem"
      >
        {info.row.original.objective}/1000
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" display="block" textAlign="center" variant="Body3Semibold">
        Status/Completion time
      </Text>
    ),
    accessorKey: 'statusAndCompletionTime',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        textAlign="center"
        variant={info.row.original.statusAndCompletionTime === 'Online' ? 'Body3Semibold' : 'Body2Regular'}
        color={info.row.original.statusAndCompletionTime === 'Online' ? 'green' : 'text'}
      >
        {info.row.original.statusAndCompletionTime}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" display="block" textAlign="center" variant="Body3Semibold">
        Status
      </Text>
    ),
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        textAlign="center"
        variant="Body3Semibold"
        color={info.row.original.status === 'Active' ? 'green' : 'red'}
      >
        {info.row.original.status}
      </Text>
    ),
  },
];

const beneficiaryData = [
  {
    beneficiary: 'Gretel Peotz',
    LGA: 'Minador do Negrão',
    agent: 'Emelina Dufton',
    gender: 'Female',
    age: 33,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Celisse Dable',
    LGA: 'Rambatan',
    agent: 'Laney Cardoe',
    gender: 'Female',
    age: 37,
    disabled: true,
    liberate: true,
    status: 'Denied',
  },
  {
    beneficiary: 'Rickert McGinlay',
    LGA: 'Lingyuan',
    agent: 'Tomlin Scambler',
    gender: 'Bigender',
    age: 49,
    disabled: true,
    liberate: true,
    status: 'Approved',
  },
  {
    beneficiary: 'Matilde Menlove',
    LGA: 'Cisalak',
    agent: 'Demetra Kippax',
    gender: 'Female',
    age: 43,
    disabled: false,
    liberate: false,
    status: 'Pending',
  },
  {
    beneficiary: 'Brande Kynastone',
    LGA: 'Kozel’shchyna',
    agent: 'Erika Twopenny',
    gender: 'Female',
    age: 50,
    disabled: true,
    liberate: false,
    status: 'Denied',
  },
  {
    beneficiary: 'Elyn De Roberto',
    LGA: 'Mó',
    agent: 'Maryanna Earley',
    gender: 'Bigender',
    age: 22,
    disabled: false,
    liberate: false,
    status: 'Approved',
  },
  {
    beneficiary: 'Celine Rowney',
    LGA: 'Qingtang',
    agent: 'Thomasine Daout',
    gender: 'Female',
    age: 39,
    disabled: false,
    liberate: false,
    status: 'Pending',
  },
  {
    beneficiary: 'Perri Sprackling',
    LGA: 'Jembe Timur',
    agent: 'Belinda Hurworth',
    gender: 'Female',
    age: 23,
    disabled: false,
    liberate: true,
    status: 'Approved',
  },
  {
    beneficiary: 'Hansiain Vinnicombe',
    LGA: 'Lincheng',
    agent: 'Axe Warne',
    gender: 'Male',
    age: 37,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Tabbitha Afonso',
    LGA: 'El Peñol',
    agent: 'Johnna Hothersall',
    gender: 'Female',
    age: 42,
    disabled: false,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Case Glancy',
    LGA: 'Khuzdār',
    agent: 'Stanfield Martlew',
    gender: 'Male',
    age: 52,
    disabled: false,
    liberate: true,
    status: 'Approved',
  },
  {
    beneficiary: 'Ynes Macquire',
    LGA: 'Ciangir',
    agent: 'Domini Watts',
    gender: 'Female',
    age: 61,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
];

const beneficiaryColumns: ColumnDef<(typeof beneficiaryData)[number]>[] = [
  {
    header: 'Enumerated Beneficiaries (20,000)',
    accessorKey: 'beneficiary',
    cell: (info) => (
      <Text as="span" variant="Body2Semibold">
        {info.row.original.beneficiary}
      </Text>
    ),
  },
  {
    header: 'LGA',
    accessorKey: 'LGA',
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.LGA}
      </Text>
    ),
  },
  {
    header: 'Agent',
    accessorKey: 'agent',
    cell: (info) => (
      <Text as="span" variant="Body2Semibold">
        {info.row.original.agent}
      </Text>
    ),
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.gender}
      </Text>
    ),
  },
  {
    header: 'Age',
    accessorKey: 'age',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.age}
      </Text>
    ),
  },
  {
    header: 'Disabled',
    accessorKey: 'disabled',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.disabled ? 'YES' : 'NO'}
      </Text>
    ),
  },
  {
    header: 'Liberate',
    accessorKey: 'liberate',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.liberate ? 'YES' : 'NO'}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" display="block" textAlign="center" variant="Body3Semibold">
        Status
      </Text>
    ),
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        color={
          info.row.original.status === 'Approved' ? 'green' : info.row.original.status === 'Denied' ? 'red' : 'grey.500'
        }
        textAlign="center"
        variant="Body3Semibold"
      >
        {info.row.original.status}
      </Text>
    ),
  },
];

export default EnumerationPage;
