/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReusableTable } from '@/shared';
import { Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

const OrderPage = () => {
  // const data = [
  //   {
  //     vendor: 'PAYSTACK',
  //     program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
  //     product_service_offered: 'Loan',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '₦ 50,000,000.00',
  //   },
  //   {
  //     vendor: 'SOVALABS',
  //     program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAMME',
  //     product_service_offered: 'Tech Skills',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '750 beneficiaries',
  //   },
  //   {
  //     vendor: 'DANGOTE GROUP',
  //     program: 'ALIKO DANGOTE FOUNDATION FUND',
  //     product_service_offered: 'Skill Development',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '₦ 50,000,000.00',
  //   },
  //   {
  //     vendor: 'PAYSTACK',
  //     program: 'CBN BACKWARD INTEGRATION FUND',
  //     product_service_offered: 'Loan',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '₦ 50,000,000.00',
  //   },
  //   {
  //     vendor: 'PAYSTACK',
  //     program: 'CBN BACKWARD INTEGRATION FUND',
  //     product_service_offered: 'Loan',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '₦ 50,000,000.00',
  //   },
  //   {
  //     vendor: 'PAYSTACK',
  //     program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
  //     product_service_offered: 'Loan',
  //     schedule_date: 'Dec. 20',
  //     end_date: 'Dec. 20',
  //     amount_disbursable: '₦ 50,000,000.00',
  //   },
  // ];

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Product/Service Offered
          </Text>
        ),
        accessorKey: 'product_service_offered',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Program
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Vendor Name
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
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
            {info.row.original.amount_disbursable}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Schedule Date
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.schedule_date}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            End Date
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.end_date}
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

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" padding="1rem 0px">
      <ReusableTable selectable data={[]} columns={columns} />{' '}
    </Flex>
  );
};

export default OrderPage;
