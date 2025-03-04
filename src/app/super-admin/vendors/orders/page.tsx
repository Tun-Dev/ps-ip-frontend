'use client';

import { ReusableTable } from '@/shared';
import {
  Button,
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
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';
import { useGetVendorsOrders } from '@/hooks/useGetVendorsOrders';
import { VendorsOrders, VendorsOrdersDetails } from '@/types';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { parseISO, format } from 'date-fns';
import { useGetVendorDetails } from '@/hooks/useGetVendorDetails';
import { useRouter } from 'next/navigation';

const OrderPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isRefetching, isRefetchError, refetch } = useGetVendorsOrders();
  console.log(data);

  // Fetch Details
  const { data: details } = useGetVendorDetails('');
  console.log(details);

  const router = useRouter();

  const columns: ColumnDef<VendorsOrders>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Product/Service Offered
          </Text>
        ),
        accessorKey: 'product_service_offered',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.products}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Program
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold">
            {info.row.original.programName} - {info.row.original.programType}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Vendor Name
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.vendorName}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Amount Disbursable
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.amountDisburseable}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Schedule Date
          </Text>
        ),
        accessorKey: 'schedule_date',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {format(parseISO(info.row.original.scheduledDate), 'MMM. d')}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            End Date
          </Text>
        ),
        accessorKey: 'end_date',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {format(parseISO(info.row.original.endDate), 'MMM. d')}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
            Actions
          </Text>
        ),
        accessorKey: 'deactivate',
        enableSorting: false,
        cell: () => (
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
                  Stop Order
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ),
      },
    ],
    []
  );

  const detailsColumns: ColumnDef<VendorsOrdersDetails>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Beneficiaries
          </Text>
        ),
        accessorKey: 'product_service_offered',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.firstname} {info.row.original.lastname}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            LGA
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.lga}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Vendor
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.vendor}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Gender
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.gender}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Age
          </Text>
        ),
        accessorKey: 'schedule_date',
        enableSorting: false,
        // cell: (info) => (
        //   <Text variant="Body2Semibold" align="center">
        //     {/* {info.row.original.age} */}
        //   </Text>
        // ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Amount Disbursed
          </Text>
        ),
        accessorKey: 'end_date',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.itemDisbursed}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Date Disbursed
          </Text>
        ),
        accessorKey: 'date_disbursed',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {format(parseISO(info.row.original.disbursementDate), 'MMM. d')}
          </Text>
        ),
      },
      // {
      //   header: () => (
      //     <Text variant="Body3Semibold" color="gray.500" textAlign="center">
      //       Actions
      //     </Text>
      //   ),
      //   accessorKey: 'deactivate',
      //   enableSorting: false,
      //   cell: () => (
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
      //         <MenuItem>
      //           <Text as="span" variant="Body2Regular" w="full">
      //             Stop Order
      //           </Text>
      //         </MenuItem>
      //       </MenuList>
      //     </Menu>
      //   ),
      // },
    ],
    []
  );

  console.log(detailsColumns);

  // const [program, setProgram] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const totalPages = data?.body.totalPages ?? 0;

  const orders = useMemo(() => data?.body.data ?? [], [data]);

  return (
    <Stack gap="6" w="full" flex="1">
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
              // onChange={(e) => setProgram(Number(e.target.value))}
            >
              {/* {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} */}
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
        selectable
        data={orders}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
        onClick={(e) => {
          // console.log(e);
          const searchParams = new URLSearchParams();
          searchParams.set('program', e.programName);
          router.push(`/super-admin/vendors/orders?${searchParams.toString()}`);
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

export default OrderPage;
