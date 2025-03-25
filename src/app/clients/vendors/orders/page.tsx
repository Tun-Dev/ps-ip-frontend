'use client';

import { useGetVendorsOrders } from '@/hooks/useGetVendorsOrders';
import { useGetVendorsOrdersDetails } from '@/hooks/useGetVendorsOrdersDetails';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { VendorsOrders, VendorsOrdersDetails } from '@/types';
import {
  Button,
  Flex,
  Grid,
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
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { MdArrowBack, MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

const OrderPage = () => {
  const [page, setPage] = useState(1);
  const [detailsPage, setDetailsPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isRefetching, isRefetchError, refetch } = useGetVendorsOrders({
    page: page,
    pageSize: 10,
    query: search,
  });

  const programId = useSearchParams().get('programId') || '';

  // Fetch Details
  const {
    data: details,
    isLoading: isDetailsLoading,
    isRefetching: isDetailsRefetching,
    isError: isDetailsError,
    isRefetchError: isDetailsRefetchError,
    refetch: refetchDetails,
  } = useGetVendorsOrdersDetails(programId);
  console.log(details);

  const router = useRouter();

  const columns: ColumnDef<VendorsOrders>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
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
          <Text variant="Body3Semibold" color="grey.500">
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
          <Text variant="Body3Semibold" color="grey.500">
            Vendor Name
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.vendorName}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
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
          <Text variant="Body3Semibold" color="grey.500">
            Schedule Date
          </Text>
        ),
        accessorKey: 'schedule_date',
        meta: { isCentered: true },
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.scheduledDate ? format(parseISO(info.row.original.scheduledDate), 'MMM. d') : 'N/A'}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            End Date
          </Text>
        ),
        accessorKey: 'end_date',
        meta: { isCentered: true },
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.endDate ? format(parseISO(info.row.original.endDate), 'MMM. d') : 'N/A'}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
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
          <Text variant="Body3Semibold" color="grey.500">
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
          <Text variant="Body3Semibold" color="grey.500">
            LGA
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.lga}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Vendor
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Semibold">{info.row.original.vendor}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
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
          <Text variant="Body3Semibold" color="grey.500">
            Age
          </Text>
        ),
        accessorKey: 'schedule_date',
        meta: { isCentered: true },
        enableSorting: false,
        // cell: (info) => (
        //   <Text variant="Body2Semibold" align="center">
        //     {/* {info.row.original.age} */}
        //   </Text>
        // ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Amount Disbursed
          </Text>
        ),
        accessorKey: 'end_date',
        meta: { isCentered: true },
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.itemDisbursed}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Date Disbursed
          </Text>
        ),
        accessorKey: 'date_disbursed',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.disbursementDate
              ? format(parseISO(info.row.original.disbursementDate), 'MMM. d')
              : 'N/A'}
          </Text>
        ),
      },
    ],
    []
  );

  console.log(detailsColumns);

  // const [program, setProgram] = useState<number | undefined>(undefined);

  const totalPages = data?.body.totalPages ?? 0;
  const detailsTotalPages = details?.body.totalPages ?? 0;

  const orders = useMemo(() => data?.body.data ?? [], [data]);
  const ordersDetails = useMemo(() => details?.body.data ?? [], [details]);

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
      {programId ? (
        isDetailsLoading ? (
          <Grid flex="1" placeItems="center">
            <Spinner />
          </Grid>
        ) : (
          <>
            <Flex>
              <Button
                variant="unstyled"
                fontSize="12px"
                leftIcon={<MdArrowBack />}
                onClick={() => router.push('/clients/vendors/orders')}
              >
                Back
              </Button>
            </Flex>
            <ReusableTable
              selectable
              data={ordersDetails}
              columns={detailsColumns}
              isLoading={isDetailsLoading || isDetailsRefetching}
              isError={isDetailsError || isDetailsRefetchError}
              onRefresh={refetchDetails}
            />

            <TablePagination
              handleNextPage={() => setDetailsPage((prev) => Math.min(prev + 1, detailsTotalPages))}
              handlePrevPage={() => setDetailsPage((prev) => Math.max(prev - 1, 1))}
              handlePageChange={(pageNumber) => setDetailsPage(pageNumber)}
              isNextDisabled={detailsPage >= detailsTotalPages}
              isPrevDisabled={detailsPage <= 1}
              currentPage={detailsPage}
              totalPages={detailsTotalPages}
              isDisabled={isDetailsLoading}
              display={detailsTotalPages > 1 ? 'flex' : 'none'}
            />
          </>
        )
      ) : (
        <>
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
              searchParams.set('programId', `${e.id}`);
              router.push(`/clients/vendors/orders?${searchParams.toString()}`);
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
        </>
      )}
    </Stack>
  );
};

export default OrderPage;
