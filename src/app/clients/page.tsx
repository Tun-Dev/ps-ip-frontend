'use client';

import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdEmojiEmotions,
  MdLocalShipping,
  MdOpenInNew,
  MdStickyNote2,
  MdViewList,
  MdVolunteerActivism,
} from 'react-icons/md';

import { NotificationCard, ReusableTable } from '@/shared';
import { ModuleDashboardCard } from '@/shared/chakra/components';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Link } from '@chakra-ui/next-js';

const ClientsDashboard = () => {
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <Grid gap="1rem" templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}>
          <OverviewCard title="Total Beneficiaries" number={200000} icon={MdEmojiEmotions} />
          <OverviewCard title="Beneficiaries Disbursed" number={150000} icon={MdEmojiEmotions} />
          <OverviewCard title="Orders Disbursable" number={50000} icon={MdVolunteerActivism} />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Modules In Progress
        </Text>
        <Grid gap="1rem" templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}>
          <ModuleDashboardCard text="Applications" number={150000} image="/icons/Application.svg" />
          <ModuleDashboardCard text="Beneficiaries Enumerated" number={50000} image="/icons/Enumeration.svg" />
          <ModuleDashboardCard text="Awaiting KYC Verification" number={150000} image="/icons/Verification.svg" />
          <ModuleDashboardCard text="Awaiting Disbursement" number={20000} image="/icons/Disbursement.svg" />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <Grid gap="1rem" templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}>
          {NOTIFICATION_DATA.map((item, index) => (
            <NotificationCard key={index} {...item} />
          ))}
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <Grid gap="20px" templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}>
          <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card">
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500">
                Enumeration - iDICE
              </Text>
              <Flex justifyContent="flex-end" color="primary.500">
                <Link href="#">
                  <Text as="span" display="flex" alignItems="center" gap="1" variant="Body3Semibold">
                    View details <Icon as={MdOpenInNew} />
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <ReusableTable data={ENUMERATION} columns={enumerationColumns} />
          </Flex>
          <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card">
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500">
                Disbursement - iDICE
              </Text>
              <Flex justifyContent="flex-end" color="primary.500">
                <Link href="#">
                  <Text as="span" display="flex" alignItems="center" gap="1" variant="Body3Semibold">
                    View details <Icon as={MdOpenInNew} />
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <ReusableTable data={DISBURSEMENT} columns={disbursementColumns} />
          </Flex>
          <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card">
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500">
                KYC Verification - iDICE
              </Text>
              <Flex justifyContent="flex-end" color="primary.500">
                <Link href="#">
                  <Text as="span" display="flex" alignItems="center" gap="1" variant="Body3Semibold">
                    View details <Icon as={MdOpenInNew} />
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <ReusableTable data={KYC_VERIFICATION} columns={kycVerificationColumns} />
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};

const ENUMERATION = [
  { name: 'Usman Ola', lga: 'Ikeja', enumerated: 500 },
  { name: 'Oluwaseun Chukwu', lga: 'Agege', enumerated: 1000 },
  { name: 'Chukwudi Abubakar', lga: 'Badagry', enumerated: 500 },
  { name: 'Amina Adewale', lga: 'Ikorodu', enumerated: 500 },
  { name: 'Chijindu Aliyu', lga: 'Mushin', enumerated: 1000 },
];

const DISBURSEMENT = [
  { name: 'Usman Ola', lga: 'Ikeja', status: 'Pending' },
  { name: 'Oluwaseun Chukwu', lga: 'Agege', status: 'Disbursed' },
  { name: 'Chukwudi Abubakar', lga: 'Badagry', status: 'Pending' },
  { name: 'Amina Adewale', lga: 'Ikorodu', status: 'Pending' },
  { name: 'Chijindu Aliyu', lga: 'Mushin', status: 'Disbursed' },
];

const KYC_VERIFICATION = [
  { name: 'Usman Ola', lga: 'Ikeja', status: 'Failed' },
  { name: 'Oluwaseun Chukwu', lga: 'Agege', status: 'Passed' },
  { name: 'Chukwudi Abubakar', lga: 'Badagry', status: 'Failed' },
  { name: 'Amina Adewale', lga: 'Ikorodu', status: 'Failed' },
  { name: 'Chijindu Aliyu', lga: 'Mushin', status: 'Passed' },
];

const enumerationColumns: ColumnDef<(typeof ENUMERATION)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Name
      </Text>
    ),
    accessorKey: 'name',
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
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Enumerated
      </Text>
    ),
    accessorKey: 'enumerated',
    enableSorting: false,
    cell: (info) => (
      <Box
        padding="2px 10px"
        bg={info.row.original.enumerated / 1000 < 1 ? 'grey.200' : 'primary.100'}
        borderRadius="12px"
        width="fit-content"
      >
        {info.row.original.enumerated}/1000
      </Box>
    ),
  },
];

const disbursementColumns: ColumnDef<(typeof DISBURSEMENT)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Name
      </Text>
    ),
    accessorKey: 'name',
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
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Status
      </Text>
    ),
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body3Semibold" color={info.row.original.status === 'Pending' ? 'grey.500' : 'green'}>
        {info.row.original.status}
      </Text>
    ),
  },
];

const kycVerificationColumns: ColumnDef<(typeof KYC_VERIFICATION)[number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Name
      </Text>
    ),
    accessorKey: 'name',
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
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="gray.500">
        Status
      </Text>
    ),
    accessorKey: 'status',
    enableSorting: false,
    cell: (info) => (
      <Text variant="Body3Semibold" color={info.row.original.status === 'Failed' ? 'red' : 'green'}>
        {info.row.original.status}
      </Text>
    ),
  },
];

const NOTIFICATION_DATA = [
  {
    title: 'Disbursement Update',
    time: '2hrs ago',
    desc: 'Disbursement at Ikeja is at 50% completion',
    boldWord: 'Ikeja',
    Icon: MdLocalShipping,
  },
  {
    title: 'Enumeration Update',
    time: '3hrs ago',
    desc: 'Enumeration from Ikeja just concluded',
    boldWord: 'Ikeja',
    Icon: MdViewList,
  },
  {
    title: 'Application Update',
    time: '3hrs ago',
    desc: '5,000 new beneficiaries sent in applications from Ikeja',
    boldWord: 'Ikeja',
    Icon: MdStickyNote2,
  },
];

export default ClientsDashboard;
