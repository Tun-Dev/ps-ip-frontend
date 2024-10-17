'use client';

import { useMemo } from 'react';
import { Flex, Text, Box, Button, InputGroup, InputLeftElement, Icon, Input, Select } from '@chakra-ui/react';
import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import { MdSearch, MdVolunteerActivism, MdDownload, MdAddCircle } from 'react-icons/md';
import { OverviewCard } from '@/components/overview';

const PartnerTab = () => {
  const data = [
    {
      partner: 'Federal Ministry of Finance',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAM',
      amountDisbursed: (250000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Industry Trade & Investment',
      program: 'INVESTMENT IN DIGITAL CREATIVE PROGRAM',
      amountDisbursed: (500000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Design Foundation',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      amountDisbursed: (300000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Central Bank of Nigeria',
      program: 'CBN BACKWARD INTEGRATION FUND',
      amountDisbursed: (600000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Central Bank of Nigeria',
      program: 'CBN BACKWARD INTEGRATION FUND',
      amountDisbursed: (400000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Industry Trade & Investment',
      program: 'INVESTMENT IN DIGITAL CREATIVE PROGRAM',
      amountDisbursed: (200000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Finance',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAM',
      amountDisbursed: (300000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Industry Trade & Investment',
      program: 'INVESTMENT IN DIGITAL CREATIVE PROGRAM',
      amountDisbursed: (500000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Design Foundation',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      amountDisbursed: (300000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Finance',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAM',
      amountDisbursed: (700000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Central Bank of Nigeria',
      program: 'CBN BACKWARD INTEGRATION FUND',
      amountDisbursed: (250000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Design Foundation',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      amountDisbursed: (100000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Industry Trade & Investment',
      program: 'INVESTMENT IN DIGITAL CREATIVE PROGRAM',
      amountDisbursed: (150000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Design Foundation',
      program: 'ALIKO DANGOTE FOUNDATION FUND',
      amountDisbursed: (300000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      partner: 'Federal Ministry of Finance',
      program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAM',
      amountDisbursed: (250000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Partner
          </Text>
        ),
        accessorKey: 'partner',
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
            Amount Disbursed
          </Text>
        ),
        accessorKey: 'amountDisbursed',
        enableSorting: false,
      },
      {
        header: () => (
          <Button variant="cancel" size="small">
            Delete partner
          </Button>
        ),
        accessorKey: 'actions',
        enableSorting: false,
        cell: () => (
          <Button variant="cancel" size="small">
            Delete Partner
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="gray.400">
          Overview
        </Text>
        <Box w="256px" cursor="pointer">
          <OverviewCard title="Total Partner" number={10} icon={MdVolunteerActivism} />
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="8px" alignItems="center">
          <Text variant="Body2Semibold" color="gray.500" whiteSpace="nowrap">
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

          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input variant="primary" placeholder="Search" />
          </InputGroup>
        </Flex>

        <Flex gap="8px" alignItems="center">
          <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
            Download Report
          </Button>
          <Button leftIcon={<MdAddCircle />} variant="primary" size="medium" onClick={() => {}}>
            Add New Vendor
          </Button>
        </Flex>
      </Flex>

      <Box padding="0px 1rem 1rem" boxShadow="card" borderRadius="12px">
        <ReusableTable data={data} columns={columns} />
      </Box>
    </Flex>
  );
};

export default PartnerTab;
