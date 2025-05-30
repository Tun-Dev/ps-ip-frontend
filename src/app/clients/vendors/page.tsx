'use client';

import { useFilterVendors } from '@/hooks/useFilterVendors';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { ManageVendorModal } from '@/shared/chakra/modals/manage-vendor-modal';
import { Vendor } from '@/types';
import {
  Button,
  Flex,
  Icon,
  // IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  MdDownload,
  //  MdMoreHoriz,
  MdSearch,
} from 'react-icons/md';

// type Test = {
//   vendor: string;
//   program: number;
//   product: string;
//   start_date: string;
//   end_date: string;
// };

const VendorPage = () => {
  const [page, setPage] = useState(1);

  const { isOpen: isManageOpen, onOpen: onManageOpen, onClose: manageModalOnClose } = useDisclosure();
  const [selectedVendor, setSelectedVendor] = useState<Vendor>();

  const columns: ColumnDef<Vendor>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Vendor
          </Text>
        ),
        accessorKey: 'name',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
            No. of Programs
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.programCount}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
            Product/Service Offered
          </Text>
        ),
        accessorKey: 'product',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.product ? info.row.original.product : info.row.original.service}
          </Text>
        ),
      },

      // {
      //   header: () => (
      //     <Text variant="Body3Semibold" color="grey.500" textAlign="center">
      //       Actions
      //     </Text>
      //   ),
      //   accessorKey: 'deactivate',
      //   enableSorting: false,
      //   cell: (info) => (
      //     <Menu>
      //       <MenuButton
      //         as={IconButton}
      //         variant="ghost"
      //         aria-label="Actions"
      //         icon={<Icon as={MdMoreHoriz} boxSize="1.25rem" color="grey.500" />}
      //         minW="0"
      //         h="auto"
      //         mx="auto"
      //         display="flex"
      //         p="1"
      //         onClick={(e) => e.stopPropagation()}
      //       />
      //       <MenuList>
      //         <MenuItem
      //           onClick={(e) => {
      //             e.stopPropagation();
      //             setSelectedVendor(info.row.original);
      //             onManageOpen();
      //           }}
      //         >
      //           <Text as="span" variant="Body2Regular" w="full">
      //             Manage Vendor
      //           </Text>
      //         </MenuItem>
      //         <MenuItem
      //           onClick={(e) => {
      //             e.stopPropagation();
      //             setSelectedVendor(info.row.original);
      //             onEditOpen();
      //           }}
      //         >
      //           <Text as="span" variant="Body2Regular" w="full">
      //             Edit Vendor
      //           </Text>
      //         </MenuItem>
      //         <MenuItem
      //           onClick={(e) => {
      //             e.stopPropagation();
      //             setSelectedVendor(info.row.original);
      //             onDeleteOpen();
      //           }}
      //         >
      //           <Text as="span" variant="Body2Regular" w="full">
      //             Delete Vendor
      //           </Text>
      //         </MenuItem>
      //       </MenuList>
      //     </Menu>
      //   ),
      // },
    ],
    []
  );

  const [program, setProgram] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const {
    response: data,
    isLoading,
    isError,
    isRefetchError,
    isRefetching,
    refetch,
  } = useFilterVendors({
    program: program,
    page: page,
    pageSize: 10,
    query: search,
  });
  const vendors = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 0;

  return (
    <Stack gap="6" w="full" flex="1">
      {selectedVendor && (
        <>
          <ManageVendorModal
            isOpen={isManageOpen}
            onClose={() => {
              manageModalOnClose();
              setSelectedVendor(undefined);
            }}
            vendor={selectedVendor}
            type="client"
          />
        </>
      )}
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
              onChange={(e) => setProgram(e.target.value)}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Flex>
          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input
              variant="primary"
              fontSize="10px"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Flex gap="8px" alignItems="center">
          <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
            Download Report
          </Button>
        </Flex>
      </Flex>

      <ReusableTable
        // selectable
        data={vendors}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
        onClick={(vendor) => {
          setSelectedVendor(vendor);
          onManageOpen();
        }}
      />
      <TablePagination
        handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        handlePageChange={(pageNumber) => setPage(pageNumber)}
        isNextDisabled={page >= totalPages}
        isPrevDisabled={page <= 1}
        currentPage={page}
        totalPages={totalPages}
        isDisabled={isLoading}
        display={totalPages > 1 ? 'flex' : 'none'}
      />
    </Stack>
  );
};

export default VendorPage;

// const dataTest = [
//   {
//     vendor: 'SCHLABS',
//     program: 2,
//     product: 'Tech Skills',
//     start_date: 'Dec-20',
//     end_date: 'Dec-31',
//   },
// ];
