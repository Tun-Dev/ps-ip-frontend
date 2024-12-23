'use client';

import { Box, Button, Flex, Grid, Icon, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { MdDownload, MdEmojiEmotions, MdGroupAdd, MdGroups, MdSearch, MdVolunteerActivism } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';

const ClientsVendorsPage = () => {
  const [selected, setSelected] = useState<'vendors' | 'orders'>('vendors');
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.500">
          Overview
        </Text>
        <Grid gap="1rem" templateColumns="repeat(4, minmax(0, 1fr))">
          <Box onClick={() => setSelected('vendors')} cursor="pointer">
            <OverviewCard title="Total Vendors" number={10} icon={MdGroups} active={selected === 'vendors'} />
          </Box>
          <Box onClick={() => setSelected('orders')} cursor="pointer">
            <OverviewCard title="Total Orders" number={150000} icon={MdGroupAdd} active={selected === 'orders'} />
          </Box>
          <Box>
            <OverviewCard title="Beneficiaries Disbursable" number={50000} icon={MdVolunteerActivism} />
          </Box>
          <Box>
            <OverviewCard title="Beneficiaries Disbursed" number={150000} icon={MdEmojiEmotions} />
          </Box>
        </Grid>
      </Flex>
      {selected === 'vendors' ? <VendorsTab /> : <OrdersTab />}
    </Flex>
  );
};

const OrdersTab = () => {
  return (
    <Flex flexDir="column" w="100%" borderTop="1px solid" borderTopColor="grey.200">
      <Flex justifyContent="space-between" py="5">
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium">
          Download Report
        </Button>
      </Flex>
      <Box py="2" px="2.5" boxShadow="card" border="1px solid" borderColor="grey.100" borderRadius="12px">
        <ReusableTable data={ordersData} columns={ordersColumns} />
      </Box>
    </Flex>
  );
};

const VendorsTab = () => {
  return (
    <Flex flexDir="column" w="100%" borderTop="1px solid" borderTopColor="grey.200">
      <Flex justifyContent="space-between" py="5">
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
        <Button leftIcon={<MdDownload />} variant="primary" size="medium">
          Download Report
        </Button>
      </Flex>
      <Box py="2" px="2.5" boxShadow="card" border="1px solid" borderColor="grey.100" borderRadius="12px">
        <ReusableTable data={vendorsData} columns={vendorsColumns} />
      </Box>
    </Flex>
  );
};

const vendorsData = [
  {
    vendor: 'Bubblemix',
    program: 'Team-oriented homogeneous function',
    product: 'Engineering',
    scheduleDate: '2024-08-28T19:42:33Z',
    endDate: '2024-05-01T12:39:15Z',
  },
  {
    vendor: 'Leexo',
    program: 'Public-key eco-centric forecast',
    product: 'Product Management',
    scheduleDate: '2023-11-01T01:30:32Z',
    endDate: '2024-04-01T09:43:46Z',
  },
  {
    vendor: 'Jazzy',
    program: 'Programmable dynamic matrices',
    product: 'Support',
    scheduleDate: '2024-04-06T11:33:07Z',
    endDate: '2024-07-07T16:26:16Z',
  },
  {
    vendor: 'Bubblebox',
    program: 'Fully-configurable real-time infrastructure',
    product: 'Human Resources',
    scheduleDate: '2024-09-13T03:39:41Z',
    endDate: '2023-12-29T16:36:50Z',
  },
  {
    vendor: 'Fivespan',
    program: 'Reverse-engineered multimedia array',
    product: 'Human Resources',
    scheduleDate: '2024-01-10T23:26:33Z',
    endDate: '2024-08-13T12:40:19Z',
  },
];

const vendorsColumns: ColumnDef<(typeof vendorsData)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Vendor
      </Text>
    ),
    accessorKey: 'vendor',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.vendor}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Program
      </Text>
    ),
    accessorKey: 'program',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.program}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Product/Service Offered
      </Text>
    ),
    accessorKey: 'product',
    cell: (info) => <Text variant="Body2Regular">{info.row.original.product}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Schedule Date
      </Text>
    ),
    accessorKey: 'scheduleDate',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body2Regular">
        {Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(
          new Date(info.row.original.scheduleDate)
        )}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        End Date
      </Text>
    ),
    accessorKey: 'endDate',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body2Regular">
        {Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date(info.row.original.endDate))}
      </Text>
    ),
  },
];

const ordersData = [
  {
    vendor: 'Bubblemix',
    program: 'Team-oriented homogeneous function',
    product: 'Engineering',
    amount: 750,
    scheduleDate: '2024-08-28T19:42:33Z',
    endDate: '2024-05-01T12:39:15Z',
  },
  {
    vendor: 'Leexo',
    program: 'Public-key eco-centric forecast',
    product: 'Product Management',
    amount: 500,
    scheduleDate: '2023-11-01T01:30:32Z',
    endDate: '2024-04-01T09:43:46Z',
  },
  {
    vendor: 'Jazzy',
    program: 'Programmable dynamic matrices',
    product: 'Support',
    amount: 750,
    scheduleDate: '2024-04-06T11:33:07Z',
    endDate: '2024-07-07T16:26:16Z',
  },
  {
    vendor: 'Bubblebox',
    program: 'Fully-configurable real-time infrastructure',
    product: 'Human Resources',
    amount: 500,
    scheduleDate: '2024-09-13T03:39:41Z',
    endDate: '2023-12-29T16:36:50Z',
  },
  {
    vendor: 'Fivespan',
    program: 'Reverse-engineered multimedia array',
    product: 'Human Resources',
    amount: 750,
    scheduleDate: '2024-01-10T23:26:33Z',
    endDate: '2024-08-13T12:40:19Z',
  },
];

const ordersColumns: ColumnDef<(typeof ordersData)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Product/Service Offered
      </Text>
    ),
    accessorKey: 'product',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.product}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Program
      </Text>
    ),
    accessorKey: 'program',
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.program}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Vendor
      </Text>
    ),
    accessorKey: 'vendor',
    cell: (info) => <Text variant="Body2Regular">{info.row.original.vendor}</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Amount Disbursable
      </Text>
    ),
    accessorKey: 'amount',
    enableSorting: false,
    cell: (info) => <Text variant="Body2Semibold">{info.row.original.amount} Beneficiaries</Text>,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Schedule Date
      </Text>
    ),
    accessorKey: 'scheduleDate',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body2Regular">
        {Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date(info.row.original.scheduleDate))}
      </Text>
    ),
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        End Date
      </Text>
    ),
    accessorKey: 'endDate',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body2Regular">
        {Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date(info.row.original.endDate))}
      </Text>
    ),
  },
];

export default ClientsVendorsPage;
