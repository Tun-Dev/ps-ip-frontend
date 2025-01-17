/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import {
  Flex,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';

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
          <Flex>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
                  <MdMoreHoriz size="1.25rem" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="fit-content">
                <PopoverArrow />
                <PopoverBody>
                  <Flex flexDir="column">
                    <Button w="100%" bg="transparent" size="small">
                      Stop Order
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
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
