'use client';

import {
  Button,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdCloudUpload, MdDownload, MdSearch, MdMoreHoriz } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const VettingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <ReusableTable data={data} columns={columns} onClick={onOpen} selectable />
      )}
      <BeneficiaryDetailsModal isOpen={isOpen} onClose={onClose} initialTab={2} />
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
    status: 'Approved',
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
    status: 'Denied',
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
    status: 'Denied',
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
    status: 'Denied',
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
    status: 'Approved',
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
    status: 'Approved',
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
    header: () => (
      <Text variant="Body3Semibold" textAlign="center">
        Gender
      </Text>
    ),
    accessorKey: 'gender',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" textAlign="center" display="block" variant="Body2Regular">
        {info.row.original.gender}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" textAlign="center">
        Age
      </Text>
    ),
    accessorKey: 'age',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" textAlign="center" display="block" variant="Body2Regular">
        {info.row.original.age}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" textAlign="center">
        Disabled
      </Text>
    ),
    accessorKey: 'disabled',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" textAlign="center" display="block" variant="Body2Regular">
        {info.row.original.disabled ? 'YES' : 'NO'}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" textAlign="center">
        Liberate
      </Text>
    ),
    accessorKey: 'liberate',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" textAlign="center" display="block" variant="Body2Regular">
        {info.row.original.liberate ? 'YES' : 'NO'}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" textAlign="center">
        Vetting Score
      </Text>
    ),
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
      <Text variant="Body3Semibold" color="gray.500" textAlign="center">
        Actions/Status
      </Text>
    ),
    accessorKey: 'actions',
    enableSorting: false,
    cell: () => (
      <Flex onClick={(e) => e.stopPropagation()}>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
              <MdMoreHoriz size="1.25rem" />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="121px" p="8px">
            <PopoverArrow />
            <PopoverBody p="0">
              <Flex flexDir="column">
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400">
                  Approve
                </Button>
                <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400">
                  Deny
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    ),
  },
];

export default VettingPage;
