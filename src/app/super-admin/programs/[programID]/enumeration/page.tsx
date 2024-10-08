'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdCloudUpload, MdDelete, MdDownload, MdSearch } from 'react-icons/md';

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
    <Box>
      <Flex align="center" justify="space-between" mb="8">
        <Flex align="center" gap="6">
          <Flex align="center" gap="2" shrink={0}>
            <Text as="label" variant="Body2Semibold" color="grey.500">
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
        <ButtonGroup size="medium" spacing="4">
          <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary">
            Download Report
          </Button>
          <Button leftIcon={<MdCloudUpload size="0.875rem" />} variant="primary">
            Upload Selected Data
          </Button>
        </ButtonGroup>
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
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Augusto Chatelain',
    LGA: 'Qianqiao',
    aggregator: 'JDEIY',
    objective: 994,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Lockwood Gorring',
    LGA: 'Bobrov',
    aggregator: 'IRVTY',
    objective: 889,
    status: 'Online',
    deactivated: true,
  },
  {
    agent: 'Lindsay Coatman',
    LGA: 'Ćićevac',
    aggregator: 'XZMEA',
    objective: 545,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Molly Kynton',
    LGA: 'Keruguya',
    aggregator: 'RPQDP',
    objective: 297,
    status: 'Online',
    deactivated: true,
  },
  {
    agent: 'Zacharie Bagenal',
    LGA: 'Gyangkar',
    aggregator: 'SRGPX',
    objective: 568,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Halie Webber',
    LGA: 'Nanqiao',
    aggregator: 'VLWEE',
    objective: 301,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Linnet Pfeuffer',
    LGA: 'Yousheng',
    aggregator: 'AFMOF',
    objective: 182,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Oliviero Willas',
    LGA: 'Paso de Carrasco',
    aggregator: 'BRKIM',
    objective: 592,
    status: 'Online',
    deactivated: false,
  },
  {
    agent: 'Georgianna Harkins',
    LGA: 'Ulricehamn',
    aggregator: 'QAIFS',
    objective: 543,
    status: 'Online',
    deactivated: true,
  },
  {
    agent: 'Neill Bannard',
    LGA: 'Shtip',
    aggregator: 'PARXH',
    objective: 1000,
    status: '2024-10-08 15:47:03',
    deactivated: false,
  },
  {
    agent: 'Florette Fairbourne',
    LGA: 'Bureya',
    aggregator: 'SOOSL',
    objective: 838,
    status: 'Online',
    deactivated: false,
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
    header: 'Objective',
    accessorKey: 'objective',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Semibold" bgColor="grey.200" rounded="xl" p="0.125rem 0.71875rem">
        {info.row.original.objective}/1000
      </Text>
    ),
  },
  {
    header: 'Status/Completion time',
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        textAlign="center"
        variant={info.row.original.status === 'Online' ? 'Body3Semibold' : 'Body2Regular'}
        color={info.row.original.status === 'Online' ? 'green' : 'text'}
      >
        {info.row.original.status}
      </Text>
    ),
  },
  {
    id: 'deactivated',
    enableSorting: false,
    cell: (info) =>
      info.row.original.deactivated ? (
        <Flex gap="2" align="center">
          <Text as="span" color="red" textAlign="center" variant="Body3Semibold">
            Deactivated
          </Text>
          <Button variant="accept" size="small">
            Activate
          </Button>
        </Flex>
      ) : (
        <Button variant="cancel" size="small">
          Deactivate agent
        </Button>
      ),
  },
  {
    id: 'actions',
    enableSorting: false,
    cell: () => (
      <IconButton
        icon={<MdDelete />}
        variant="cancel"
        bgColor="transparent"
        p="0"
        boxSize="4"
        minW="unset"
        aria-label="Delete"
        color="red"
      />
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
    id: 'status',
    enableSorting: false,
    cell: (info) =>
      info.row.original.status === 'Approved' ? (
        <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
          Approved
        </Text>
      ) : info.row.original.status === 'Denied' ? (
        <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
          Denied
        </Text>
      ) : (
        <ButtonGroup size="small" spacing="2">
          <Button variant="accept">Approve</Button>
          <Button variant="cancel">Deny</Button>
        </ButtonGroup>
      ),
  },
];

export default EnumerationPage;
