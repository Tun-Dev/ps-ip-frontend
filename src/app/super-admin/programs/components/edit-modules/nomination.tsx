import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import NominationModal from '@/shared/chakra/modals/NominationModal';
import {
  Flex,
  Image,
  Text,
  Button,
  useDisclosure,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { MdDownload, MdOutlineUploadFile, MdSearch } from 'react-icons/md';

const options = [
  { label: 'LGA', value: 'LGA' },
  { label: 'Gender', value: 'Gender' },
  // { label: 'Nominated', value: 'Nominated' },
] as const;

type Option = (typeof options)[number];

export const NominationForm = () => {
  return (
    <>
      <EmptyState />
    </>
  );
};

const EmptyState = () => {
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sort, setSort] = useState<Option | null>(options[0]);
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const [showTable, setShowTable] = useState(false);
  return (
    <>
      <NominationModal
        isOpen={isOpen}
        onClose={onClose}
        action={() => setShowTable(true)}
        programId={programID?.toLocaleString()}
      />

      {!showTable ? (
        <Flex height="100%" flexDir="column" alignItems="center" gap="16px" pt="80px">
          <Image src="/icons/empty_nom.svg" alt="Empty state" w="100px" />
          <Text variant="Body2Semibold" color="#7D7D7D">
            No Data Available
          </Text>
          <Button
            mt="16px"
            leftIcon={<MdOutlineUploadFile />}
            variant="primary"
            maxW="320px"
            w="100%"
            h="48px"
            onClick={() => onOpen()}
          >
            Upload Nomination List
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" h="full">
          <Flex align="center" justify="space-between" mb="8">
            <Flex align="center" gap="6">
              <Flex align="center" gap="2" shrink={0}>
                <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
                  Sort by
                </Text>
                <Dropdown variant="primaryDropdown" options={options} value={sort} onChange={setSort} />
              </Flex>
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
              <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary" size="md">
                Download Nomination Data
              </Button>
              <Button leftIcon={<MdOutlineUploadFile size="0.875rem" />} variant="primary" size="md">
                Upload New File
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
            <>
              <ReusableTable data={data} columns={columns} />
              <TablePagination
                handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
                handlePageChange={(pageNumber) => setPage(pageNumber)}
                isNextDisabled={page >= totalPages}
                isPrevDisabled={page <= 1}
                currentPage={page}
                totalPages={totalPages}
                // isDisabled={isLoading || isPlaceholderData}
                display={totalPages > 1 ? 'flex' : 'none'}
              />
            </>
          )}
        </Flex>
      )}
    </>
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
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Celisse Dable',
    LGA: 'Rambatan',
    gender: 'Female',
    profession: 'Information Systems Manager',
    age: 37,
    disabled: true,
    literate: true,
    status: 'Denied',
  },
  {
    beneficiary: 'Rickert McGinlay',
    LGA: 'Lingyuan',
    gender: 'Bigender',
    profession: 'Compensation Analyst',
    age: 49,
    disabled: true,
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Matilde Menlove',
    LGA: 'Cisalak',
    gender: 'Female',
    profession: 'Sales Representative',
    age: 43,
    disabled: false,
    literate: false,
    status: 'Nominated',
  },
  {
    beneficiary: 'Brande Kynastone',
    LGA: 'Kozel’shchyna',
    gender: 'Female',
    profession: 'Assistant Manager',
    age: 50,
    disabled: true,
    literate: false,
    status: 'Denied',
  },
  {
    beneficiary: 'Elyn De Roberto',
    LGA: 'Mó',
    gender: 'Bigender',
    profession: 'Budget/Accounting Analyst IV',
    age: 22,
    disabled: false,
    literate: false,
    status: 'Nominated',
  },
  {
    beneficiary: 'Celine Rowney',
    LGA: 'Qingtang',
    gender: 'Female',
    profession: 'Senior Editor',
    age: 39,
    disabled: false,
    literate: false,
    status: 'Nominated',
  },
  {
    beneficiary: 'Perri Sprackling',
    LGA: 'Jembe Timur',
    gender: 'Female',
    profession: 'Executive Secretary',
    age: 23,
    disabled: false,
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Hansiain Vinnicombe',
    LGA: 'Lincheng',
    gender: 'Male',
    profession: 'VP Product Management',
    age: 37,
    disabled: true,
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Tabbitha Afonso',
    LGA: 'El Peñol',
    gender: 'Female',
    profession: 'Internal Auditor',
    age: 42,
    disabled: false,
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Case Glancy',
    LGA: 'Khuzdār',
    gender: 'Male',
    profession: 'Geological Engineer',
    age: 52,
    disabled: false,
    literate: true,
    status: 'Nominated',
  },
  {
    beneficiary: 'Ynes Macquire',
    LGA: 'Ciangir',
    gender: 'Female',
    profession: 'Payment Adjustment Coordinator',
    age: 61,
    disabled: true,
    literate: true,
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
    header: 'Literate',
    accessorKey: 'literate',
    enableSorting: false,
    cell: (info) => (
      <Text as="span" variant="Body2Regular">
        {info.row.original.literate ? 'YES' : 'NO'}
      </Text>
    ),
  },
];
