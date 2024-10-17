'use client';

import { useState, useMemo } from 'react';
import { Flex, Text, Box, Button, InputGroup, InputLeftElement, Icon, Input, Select } from '@chakra-ui/react';
import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdSearch,
  MdVolunteerActivism,
  MdDownload,
  MdLocalShipping,
  MdAccountBalanceWallet,
  MdEmojiEmotions,
  MdCloudUpload,
} from 'react-icons/md';
import { OverviewCard } from '@/components/overview';

const VendorsDisbursementDashboard = () => {
  const [isDisbursed, setIsDisbursed] = useState(false);

  const data = [
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Chukwudi Abubakar',
      LGA: 'Ikorodu',
      Gender: 'Male',
      Age: '60',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Agege',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Amina Adewale',
      LGA: 'Ikorodu',
      Gender: 'Female',
      Age: '40',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Amina Adewale',
      LGA: 'Ikeja',
      Gender: 'Female',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Oluwaseun Chukwu Abubakar',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Amina Adewale',
      LGA: 'Ikeja',
      Gender: ' Female',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Female',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
    {
      Beneficiaries: 'Usman Ola Usman',
      LGA: 'Ikeja',
      Gender: 'Male',
      Age: '50',
      Amount: (50000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ScheduleDate: 'Dec.20',
      EndDate: 'Dec.31',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Beneficiaries
          </Text>
        ),
        accessorKey: 'Beneficiaries',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            LGA
          </Text>
        ),
        accessorKey: 'LGA',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Gender
          </Text>
        ),
        accessorKey: 'Gender',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Age
          </Text>
        ),
        accessorKey: 'Age',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Amount
          </Text>
        ),
        accessorKey: 'Amount',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            ScheduleDate
          </Text>
        ),
        accessorKey: 'ScheduleDate',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            EndDate
          </Text>
        ),
        accessorKey: 'EndDate',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Status
          </Text>
        ),
        accessorKey: 'Status',
        enableSorting: false,
        cell: () => (
          <Button variant="secondary" size="small">
            {isDisbursed ? 'Disbursed' : 'Mark as disbursed'}
          </Button>
        ),
      },
    ],
    [isDisbursed]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="gray.400">
          iDICE Disbursement
        </Text>
        <Flex flexWrap="wrap" gap="12px" w="100%">
          <Box flex="1" w="256px" cursor="pointer">
            <OverviewCard title="Order Shipping" number={5000} icon={MdLocalShipping} />
          </Box>
          <Box flex="1" w="256px" cursor="pointer">
            <OverviewCard title="Amount Disbursed" number={375000} icon={MdVolunteerActivism} />
          </Box>
          <Box flex="1" w="256px" cursor="pointer">
            <OverviewCard title="Amount Disbursable" number={375000} icon={MdAccountBalanceWallet} />
          </Box>
          <Box flex="1" w="256px" cursor="pointer">
            <OverviewCard title="Beneficiary Disbursed" number={11000} icon={MdEmojiEmotions} />
          </Box>
        </Flex>
      </Flex>

      <Flex flexWrap="wrap" gap="12px">
        <Text
          variant="Body2Semibold"
          color="gray.500"
          cursor="pointer"
          _hover={{ color: 'primary' }}
          onClick={() => setIsDisbursed(false)}
        >
          Orders Pending{' '}
          <Box as="span" px="8px" py="2px" borderRadius="8px" bg="gray.200" color="gray.500">
            5,000
          </Box>{' '}
        </Text>
        <Text
          variant="Body2Semibold"
          color="gray.500"
          cursor="pointer"
          _hover={{ color: 'primary' }}
          onClick={() => setIsDisbursed(true)}
        >
          Orders Disbursed{' '}
          <Box as="span" px="8px" py="2px" borderRadius="8px" bg="gray.200" color="gray.500">
            15,000
          </Box>{' '}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="8px" alignItems="center">
          <Text variant="Body2Semibold" color="gray.500" whiteSpace="nowrap">
            Sort by
          </Text>
          <Select placeholder="LGA" size="small" defaultValue={'lga'} w="94px" fontSize="13px" fontWeight="600">
            <option key={'lga'} value={'lga'}>
              LGA
            </option>
          </Select>

          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input variant="primary" placeholder="Search" />
          </InputGroup>
        </Flex>

        <Flex gap="8px" alignItems="center">
          <Button
            leftIcon={<MdDownload />}
            variant={isDisbursed ? 'primary' : 'secondary'}
            w="193px"
            borderRadius="10px"
            size="medium"
          >
            Download Report
          </Button>
          {!isDisbursed && (
            <Button leftIcon={<MdCloudUpload />} variant="primary" size="medium" onClick={() => {}}>
              Upload Data
            </Button>
          )}
        </Flex>
      </Flex>

      <Box padding="8px 10px" boxShadow="card" borderRadius="12px">
        <ReusableTable data={data} columns={columns} />
      </Box>
    </Flex>
  );
};

export default VendorsDisbursementDashboard;
