'use client';

import { Button, ButtonGroup, Flex, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdCloudUpload, MdDownload, MdSearch } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
// import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const SurveyPage = () => {
  const { onOpen } = useDisclosure();
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
        <ButtonGroup size="medium" spacing="4">
          <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary">
            Download Report
          </Button>
          <Button leftIcon={<MdCloudUpload size="0.875rem" />} variant="primary">
            Upload Selected Data
          </Button>
        </ButtonGroup>
      </Flex>
      {data.length < 1 ? (
        <Flex align="center" justify="center" flex="1">
          <Text variant="Body2Semibold" textAlign="center" color="grey.500">
            No data available.
          </Text>
        </Flex>
      ) : (
        <ReusableTable data={data} columns={columns} onClick={onOpen} />
      )}
      {/* <BeneficiaryDetailsModal isOpen={isOpen} onClose={onClose} /> */}
    </Flex>
  );
};

const data = [
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
    status: 'Disbursed',
  },
  {
    beneficiary: 'Rickert McGinlay',
    LGA: 'Lingyuan',
    agent: 'Tomlin Scambler',
    gender: 'Bigender',
    age: 49,
    disabled: true,
    liberate: true,
    status: 'Disbursed',
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
    status: 'Disbursed',
  },
  {
    beneficiary: 'Elyn De Roberto',
    LGA: 'Mó',
    agent: 'Maryanna Earley',
    gender: 'Bigender',
    age: 22,
    disabled: false,
    liberate: false,
    status: 'Disbursed',
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
    status: 'Disbursed',
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
    status: 'Disbursed',
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
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text
        as="span"
        display="block"
        color={info.getValue() === 'Disbursed' ? 'green' : 'grey.500'}
        textAlign="center"
        variant="Body3Semibold"
      >
        {info.row.original.status}
      </Text>
    ),
  },
];

export default SurveyPage;
