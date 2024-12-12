/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';
import {
  Flex,
  Text,
  Box,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  useDisclosure,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { OverviewCard } from '@/shared/chakra/components/overview';
import {
  MdSearch,
  MdAddCircle,
  MdDownload,
  MdLocalShipping,
  MdVolunteerActivism,
  MdEmojiEmotions,
  MdAccountBalanceWallet,
  MdMoreHoriz,
} from 'react-icons/md';
import { ReusableTable, NewVendorModal } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import { useGetVendorOverview } from '@/hooks/useGetVendorOverview';

const VendorsTab = () => {
  const data = [
    {
      vendor: 'PAYSTACK',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
      product_service_offered: 'Loan',
      schedule_date: 'Dec 20, 4:00pm',
    },
    {
      vendor: 'SOVALABS',
      program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAMME',
      product_service_offered: 'Tech Skills',
      schedule_date: 'Dec 20, 4:00pm',
    },
    {
      vendor: 'DANGOTE GROUP',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      product_service_offered: 'Skill Development',
      schedule_date: 'Dec 20, 4:00pm',
    },
    {
      vendor: 'PAYSTACK',
      program: 'CBN BACKWARD INTEGRATION FUND',
      product_service_offered: 'Loan',
      schedule_date: 'Dec 20, 4:00pm',
    },
    {
      vendor: 'PAYSTACK',
      program: 'CBN BACKWARD INTEGRATION FUND',
      product_service_offered: 'Loan',
      schedule_date: 'Dec 20, 4:00pm',
    },
    {
      vendor: 'PAYSTACK',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
      product_service_offered: 'Loan',
      schedule_date: 'Dec 20, 4:00pm',
    },
  ];

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Vendor
          </Text>
        ),
        accessorKey: 'vendor',
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
            Product/Service Offered
          </Text>
        ),
        accessorKey: 'product_service_offered',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.product_service_offered}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Scheduled Date
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
                      Delete Vendor
                    </Button>
                    <Button w="100%" bg="transparent" size="small">
                      Edit
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
    <Box padding="0px 1rem 1rem" boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A" borderRadius="12px">
      <ReusableTable selectable data={data} columns={columns} />
    </Box>
  );
};

const OrderTab = () => {
  const data = [
    {
      vendor: 'PAYSTACK',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
      product_service_offered: 'Loan',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '₦ 50,000,000.00',
    },
    {
      vendor: 'SOVALABS',
      program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAMME',
      product_service_offered: 'Tech Skills',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '750 beneficiaries',
    },
    {
      vendor: 'DANGOTE GROUP',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      product_service_offered: 'Skill Development',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '₦ 50,000,000.00',
    },
    {
      vendor: 'PAYSTACK',
      program: 'CBN BACKWARD INTEGRATION FUND',
      product_service_offered: 'Loan',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '₦ 50,000,000.00',
    },
    {
      vendor: 'PAYSTACK',
      program: 'CBN BACKWARD INTEGRATION FUND',
      product_service_offered: 'Loan',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '₦ 50,000,000.00',
    },
    {
      vendor: 'PAYSTACK',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME',
      product_service_offered: 'Loan',
      schedule_date: 'Dec. 20',
      end_date: 'Dec. 20',
      amount_disbursable: '₦ 50,000,000.00',
    },
  ];

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
    <Box padding="0px 1rem 1rem" boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A" borderRadius="12px">
      <ReusableTable selectable data={data} columns={columns} />
    </Box>
  );
};

const AmountsDisbursedTab = () => {
  const data = [
    {
      beneficiary: 'Usman Ola Usman',
      lga: 'Ikeja',
      vendor: 'PAYSTACK',
      gender: 'Male',
      age: 50,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
    {
      beneficiary: 'Oluwaseun Chukwunonye',
      lga: 'Agege',
      vendor: 'PAYSTACK',
      gender: 'Female',
      age: 35,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
    {
      beneficiary: 'Chukwudi Abubakar Amina',
      lga: 'Ajegunle-Ijede',
      vendor: 'PAYSTACK',
      gender: 'Male',
      age: 40,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
    {
      beneficiary: 'Usman Ola Usman',
      lga: 'Ikeja',
      vendor: 'PAYSTACK',
      gender: 'Male',
      age: 50,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
    {
      beneficiary: 'Chidinma Afiyu Oluwaseun',
      lga: 'Gwagwalada',
      vendor: 'PAYSTACK',
      gender: 'Female',
      age: 44,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
    {
      beneficiary: 'Chukwudi Afiyu Oluwaseun',
      lga: 'Gwagwalada',
      vendor: 'PAYSTACK',
      gender: 'Male',
      age: 44,
      amount_disbursed: '₦ 50,000,000',
      date_disbursed: 'Dec. 20',
    },
  ];

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Beneficiaries
          </Text>
        ),
        accessorKey: 'beneficiary',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            LGA
          </Text>
        ),
        accessorKey: 'lga',
        enableSorting: false,
        cell: (info) => <Text variant="Body2Regular">{info.row.original.lga}</Text>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Vendor
          </Text>
        ),
        accessorKey: 'vendor',
        enableSorting: false,
      },
      {
        header: () => (
          <Flex w="100%" justifyContent="center">
            <Text variant="Body3Semibold" color="gray.500" align="center">
              Gender
            </Text>
          </Flex>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.gender}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Age
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.age}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Amount Disbursed
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.amount_disbursed}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Date Disbursed
          </Text>
        ),
        enableSorting: false,
        accessorKey: 'date_disbursed',
        cell: (info) => (
          <Text variant="Body2Semibold" align="center">
            {info.row.original.date_disbursed}
          </Text>
        ),
      },
    ],
    []
  );

  return (
    <Box padding="0px 1rem 1rem" boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A" borderRadius="12px">
      <ReusableTable selectable data={data} columns={columns} />
    </Box>
  );
};

const VendorPage = () => {
  const { response: overview } = useGetVendorOverview();

  const cards = [
    {
      name: 'Vendors',
      icon: MdLocalShipping,
      value: overview?.body?.vendors || 0,
      identifier: 'vendors',
      clickable: true,
    },
    {
      name: 'Orders',
      icon: MdLocalShipping,
      value: overview?.body?.orders || 0,
      identifier: 'orders',
      clickable: true,
    },
    {
      name: 'Amount Disbursed',
      icon: MdVolunteerActivism,
      value: overview?.body?.amountDisbursed || 0,
      identifier: 'amount-disbursed',
      clickable: true,
    },
    {
      name: 'Beneficiaries Disbursed',
      icon: MdEmojiEmotions,
      value: overview?.body?.beneficiariesDisbursed || 0,
      identifier: 'beneficiaries-disbursed',
      clickable: false,
    },
    {
      name: 'Amount Disbursable',
      icon: MdAccountBalanceWallet,
      value: overview?.body?.amountDisburseable || 0,
      identifier: 'amount-disbursable',
      clickable: false,
    },
  ];
  const [selected, setSelected] = useState<string>('vendors');

  let component;
  switch (selected) {
    case 'vendors':
      component = <VendorsTab />;
      break;
    case 'orders':
      component = <OrderTab />;
      break;
    case 'amount-disbursed':
      component = <AmountsDisbursedTab />;
      break;
    default:
      component = <VendorsTab />;
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <NewVendorModal isOpen={isOpen} onClose={onClose} />
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button variant="primary" gap="8px" onClick={onOpen}>
            <MdAddCircle />
            <Text> Add New Vendor</Text>
          </Button>
        </Flex>
        <Grid gap="6" templateColumns="repeat(auto-fit, minmax(265px, 1fr))">
          {cards.map((card, index) => (
            <Box
              key={index}
              onClick={card.clickable ? () => setSelected(card.identifier) : () => {}}
              cursor={card.clickable ? 'pointer' : 'default'}
            >
              <OverviewCard
                title={card.name}
                number={card.value}
                icon={card.icon}
                active={selected === card.identifier}
              />
            </Box>
          ))}
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="1.5rem" w="100%" padding="1rem 0px" borderTop="1px solid" borderTopColor="grey.200">
        <Flex justifyContent="space-between">
          <Flex gap="8px" alignItems="center">
            <Flex gap="8px" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
                Sort by
              </Text>
              <Select
                placeholder="Select..."
                size="small"
                defaultValue={'program'}
                w="94px"
                fontSize="13px"
                fontWeight="600"
              >
                <option key={'program'} value={'program'}>
                  Program
                </option>
              </Select>
            </Flex>
            <InputGroup w="212px" size="sm">
              <InputLeftElement>
                <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
              </InputLeftElement>
              <Input variant="primary" fontSize="10px" placeholder="Search" />
            </InputGroup>
          </Flex>
          <Flex gap="8px" alignItems="center">
            <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
              Download Report
            </Button>
          </Flex>
        </Flex>
        {component}
      </Flex>
    </Flex>
  );
};

export default VendorPage;
