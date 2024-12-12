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

const WhitelistingPage = () => {
  const [sort, setSort] = useState<Option | null>(options[3]);

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
      {data.length < 1 ? (
        <Flex align="center" justify="center" flex="1">
          <Text variant="Body2Semibold" textAlign="center" color="grey.500">
            No data available.
          </Text>
        </Flex>
      ) : (
        <ReusableTable data={data} columns={columns} />
      )}
    </Flex>
  );
};

const data = [
  {
    beneficiary: 'Siegfried Fudge',
    LGA: 'Jianxi',
    agent: 'Trevor Adshed',
    gender: 'Male',
    age: 57,
    disabled: true,
    liberate: false,
    score: 80,
    status: 'Pending',
  },
  {
    beneficiary: 'Willy Hutchinson',
    LGA: 'Yayva',
    agent: 'Miles Pargiter',
    gender: 'Male',
    age: 56,
    disabled: true,
    liberate: true,
    score: 52,
    status: 'Whitelisted',
  },
  {
    beneficiary: 'Caesar Seaborne',
    LGA: 'Xingfeng',
    agent: 'Kennedy Blabey',
    gender: 'Male',
    age: 57,
    disabled: false,
    liberate: false,
    score: 83,
    status: 'Whitelisted',
  },
  {
    beneficiary: 'Linzy Galier',
    LGA: 'Paris 05',
    agent: 'Arlen Stoll',
    gender: 'Female',
    age: 30,
    disabled: false,
    liberate: true,
    score: 69,
    status: 'Pending',
  },
  {
    beneficiary: 'Lyon Stops',
    LGA: 'Saguiaran',
    agent: 'Riley Opdenort',
    gender: 'Male',
    age: 61,
    disabled: false,
    liberate: false,
    score: 93,
    status: 'Pending',
  },
  {
    beneficiary: 'Thelma MacKimmie',
    LGA: 'Nytva',
    agent: 'Charo Vesty',
    gender: 'Female',
    age: 48,
    disabled: false,
    liberate: true,
    score: 76,
    status: 'Whitelisted',
  },
  {
    beneficiary: 'Wenonah Gateshill',
    LGA: 'Migori',
    agent: 'Janot Horning',
    gender: 'Female',
    age: 21,
    disabled: true,
    liberate: false,
    score: 93,
    status: 'Pending',
  },
  {
    beneficiary: 'Adelheid Whyborn',
    LGA: 'Orël',
    agent: 'Magdaia Baribal',
    gender: 'Genderqueer',
    age: 50,
    disabled: false,
    liberate: true,
    score: 89,
    status: 'Whitelisted',
  },
  {
    beneficiary: 'Shurwood Grigoli',
    LGA: 'Posse',
    agent: 'Quinlan Rustman',
    gender: 'Male',
    age: 41,
    disabled: false,
    liberate: true,
    score: 73,
    status: 'Whitelisted',
  },
  {
    beneficiary: 'Gussy Bobasch',
    LGA: 'Seattle',
    agent: 'Aurlie Loweth',
    gender: 'Female',
    age: 19,
    disabled: false,
    liberate: false,
    score: 76,
    status: 'Pending',
  },
  {
    beneficiary: 'Bryana Rutherforth',
    LGA: 'Cruz das Almas',
    agent: 'Rheta Acott',
    gender: 'Female',
    age: 34,
    disabled: false,
    liberate: false,
    score: 89,
    status: 'Pending',
  },
  {
    beneficiary: 'Berty Illesley',
    LGA: 'Mértola',
    agent: 'Lorene Schuchmacher',
    gender: 'Genderqueer',
    age: 27,
    disabled: true,
    liberate: false,
    score: 65,
    status: 'Whitelisted',
  },
];

const columns: ColumnDef<(typeof data)[number]>[] = [
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
    header: 'Vetting Score',
    accessorKey: 'score',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" textAlign="center" display="block" variant="Body1Bold" color="green">
        {info.row.original.score}%
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" display="block" textAlign="center" variant="Body3Semibold">
        Status
      </Text>
    ),
    id: 'status',
    enableSorting: false,
    cell: (info) =>
      info.row.original.status === 'Whitelisted' ? (
        <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
          Whitelisted
        </Text>
      ) : (
        <Button variant="accept" size="small" mx="auto" display="flex">
          Whitelist
        </Button>
      ),
  },
];

export default WhitelistingPage;
