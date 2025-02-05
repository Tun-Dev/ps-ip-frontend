'use client';

import {
  Button,
  ButtonGroup,
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
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdCloudUpload, MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';

const options = [
  { label: 'Profession', value: 'Profession' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Nominated', value: 'Nominated' },
] as const;

type Option = (typeof options)[number];

const NominationPage = () => {
  const [sort, setSort] = useState<Option | null>(options[0]);

  return (
    <Flex direction="column" h="full">
      <Flex align="center" justify="space-between" mb="8">
        <Flex align="center" gap="6">
          <Flex align="center" gap="2" shrink={0}>
            <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
              Filter by
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
        <ReusableTable data={data} columns={columns} />
      )}
    </Flex>
  );
};

const data = [
  {
    beneficiary: 'Gretel Peotz',
    LGA: 'Minador do Negrão',
    gender: 'Female',
    profession: 'Product Engineer',
    age: 33,
    disabled: true,
    liberate: true,
    status: 'Nominated',
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
    status: 'Nominated',
  },
  {
    beneficiary: 'Matilde Menlove',
    LGA: 'Cisalak',
    gender: 'Female',
    profession: 'Sales Representative',
    age: 43,
    disabled: false,
    liberate: false,
    status: 'Nominated',
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
    status: 'Nominated',
  },
  {
    beneficiary: 'Celine Rowney',
    LGA: 'Qingtang',
    gender: 'Female',
    profession: 'Senior Editor',
    age: 39,
    disabled: false,
    liberate: false,
    status: 'Nominated',
  },
  {
    beneficiary: 'Perri Sprackling',
    LGA: 'Jembe Timur',
    gender: 'Female',
    profession: 'Executive Secretary',
    age: 23,
    disabled: false,
    liberate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Hansiain Vinnicombe',
    LGA: 'Lincheng',
    gender: 'Male',
    profession: 'VP Product Management',
    age: 37,
    disabled: true,
    liberate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Tabbitha Afonso',
    LGA: 'El Peñol',
    gender: 'Female',
    profession: 'Internal Auditor',
    age: 42,
    disabled: false,
    liberate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Case Glancy',
    LGA: 'Khuzdār',
    gender: 'Male',
    profession: 'Geological Engineer',
    age: 52,
    disabled: false,
    liberate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Ynes Macquire',
    LGA: 'Ciangir',
    gender: 'Female',
    profession: 'Payment Adjustment Coordinator',
    age: 61,
    disabled: true,
    liberate: true,
    status: 'Denied',
  },
];

const columns: ColumnDef<(typeof data)[number]>[] = [
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
    cell: (info) =>
      info.row.original.status === 'Nominated' ? (
        <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
          Nominated
        </Text>
      ) : (
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
            <MenuItem>
              <Text as="span" variant="Body2Regular" w="full">
                Approve
              </Text>
            </MenuItem>
            <MenuItem>
              <Text as="span" variant="Body2Regular" w="full">
                Deny
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
  },
];

export default NominationPage;
