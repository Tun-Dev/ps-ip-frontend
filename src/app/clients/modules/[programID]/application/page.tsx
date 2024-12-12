'use client';

import { Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdDownload, MdSearch } from 'react-icons/md';

import { Dropdown } from '@/shared/chakra/components';
import { ReusableTable } from '@/shared';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const ApplicationPage = () => {
  const [sort, setSort] = useState<Option | null>(options[0]);

  return (
    <Flex direction="column" h="full">
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
      {beneficiaryData.length < 1 ? (
        <Flex align="center" justify="center" flex="1">
          <Text variant="Body2Semibold" textAlign="center" color="grey.500">
            No data available.
          </Text>
        </Flex>
      ) : (
        <ReusableTable data={beneficiaryData} columns={beneficiaryColumns} />
      )}
    </Flex>
  );
};

const beneficiaryData = [
  {
    beneficiary: 'Gretel Peotz',
    LGA: 'Minador do Negrão',
    gender: 'Female',
    profession: 'Product Engineer',
    age: 33,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Celisse Dable',
    LGA: 'Rambatan',
    gender: 'Female',
    profession: 'Information Systems Manager',
    age: 37,
    disabled: true,
    liberate: true,
    status: 'Denied',
  },
  {
    beneficiary: 'Rickert McGinlay',
    LGA: 'Lingyuan',
    gender: 'Bigender',
    profession: 'Compensation Analyst',
    age: 49,
    disabled: true,
    liberate: true,
    status: 'Passed',
  },
  {
    beneficiary: 'Matilde Menlove',
    LGA: 'Cisalak',
    gender: 'Female',
    profession: 'Sales Representative',
    age: 43,
    disabled: false,
    liberate: false,
    status: 'Pending',
  },
  {
    beneficiary: 'Brande Kynastone',
    LGA: 'Kozel’shchyna',
    gender: 'Female',
    profession: 'Assistant Manager',
    age: 50,
    disabled: true,
    liberate: false,
    status: 'Denied',
  },
  {
    beneficiary: 'Elyn De Roberto',
    LGA: 'Mó',
    gender: 'Bigender',
    profession: 'Budget/Accounting Analyst IV',
    age: 22,
    disabled: false,
    liberate: false,
    status: 'Passed',
  },
  {
    beneficiary: 'Celine Rowney',
    LGA: 'Qingtang',
    gender: 'Female',
    profession: 'Senior Editor',
    age: 39,
    disabled: false,
    liberate: false,
    status: 'Pending',
  },
  {
    beneficiary: 'Perri Sprackling',
    LGA: 'Jembe Timur',
    gender: 'Female',
    profession: 'Executive Secretary',
    age: 23,
    disabled: false,
    liberate: true,
    status: 'Passed',
  },
  {
    beneficiary: 'Hansiain Vinnicombe',
    LGA: 'Lincheng',
    gender: 'Male',
    profession: 'VP Product Management',
    age: 37,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Tabbitha Afonso',
    LGA: 'El Peñol',
    gender: 'Female',
    profession: 'Internal Auditor',
    age: 42,
    disabled: false,
    liberate: true,
    status: 'Pending',
  },
  {
    beneficiary: 'Case Glancy',
    LGA: 'Khuzdār',
    gender: 'Male',
    profession: 'Geological Engineer',
    age: 52,
    disabled: false,
    liberate: true,
    status: 'Passed',
  },
  {
    beneficiary: 'Ynes Macquire',
    LGA: 'Ciangir',
    gender: 'Female',
    profession: 'Payment Adjustment Coordinator',
    age: 61,
    disabled: true,
    liberate: true,
    status: 'Pending',
  },
];

const beneficiaryColumns: ColumnDef<(typeof beneficiaryData)[number]>[] = [
  {
    header: 'Beneficiaries (20,000)',
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
    header: 'Profession',
    accessorKey: 'profession',
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.profession}
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
          info.row.original.status === 'Passed' ? 'green' : info.row.original.status === 'Denied' ? 'red' : 'grey.500'
        }
        textAlign="center"
        variant="Body3Semibold"
      >
        {info.row.original.status}
      </Text>
    ),
  },
];

export default ApplicationPage;
