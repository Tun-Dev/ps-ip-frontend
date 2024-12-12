'use client';

import { useMemo } from 'react';
import { Flex, Text, Box, Icon, Grid, Link } from '@chakra-ui/react';
import { NotificationCard, ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdVolunteerActivism,
  MdOpenInNew,
  MdLocalShipping,
  MdAccountBalanceWallet,
  MdEmojiEmotions,
  MdViewList,
  MdStickyNote2,
} from 'react-icons/md';
import { OverviewCard } from '@/shared/chakra/components/overview';

const NOTIFICATION_DATA = [
  {
    title: 'Disbursement Update',
    time: '1hrs ago',
    desc: 'Enumeration from Ikeja just concluded',
    boldWord: 'Ikeja',
    Icon: MdLocalShipping,
  },
  {
    title: 'Disbursement Update',
    time: '3hrs ago',
    desc: 'Disbursement at Ikeja is at 50% completion',
    boldWord: 'Ikeja',
    Icon: MdViewList,
  },
  {
    title: 'Disbursement Update',
    time: '2hrs ago',
    desc: 'Disbursement at ikeja commences tomorrow',
    date: 'Dec.20',
    boldWord: 'Ikeja',
    Icon: MdStickyNote2,
  },
];

const VendorDashboard = () => {
  const data = [
    {
      Name: 'Usman Ola',
      LGA: 'Ikeja',
      Status: 'Pending',
    },
    {
      Name: 'Oluwaseun Chukwu',
      LGA: 'Agege',
      Status: 'Disbursed',
    },
    {
      Name: 'Chukwudi Abubakar',
      LGA: 'Badagry',
      Status: 'Pending',
    },
    {
      Name: 'Amina Adewale',
      LGA: 'Ikorodu',
      Status: 'Pending',
    },
    {
      Name: 'Chijindu Aliyu',
      LGA: 'Mushin',
      Status: 'Disbursed',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Name
          </Text>
        ),
        accessorKey: 'Name',
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
            Status
          </Text>
        ),
        accessorKey: 'Status',
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Text variant="Body1Semibold" color="gray.400">
        Overview
      </Text>

      <Flex flexWrap="wrap" gap="12px">
        <Box flex="1">
          <OverviewCard title="Orders" number={5000} icon={MdLocalShipping} />
        </Box>
        <Box flex="1">
          <OverviewCard title="Amount Disbursed" number={37500000} icon={MdVolunteerActivism} />
        </Box>
        <Box flex="1">
          <OverviewCard title="Amount Disbursable" number={1250000} icon={MdAccountBalanceWallet} />
        </Box>
        <Box flex="1">
          <OverviewCard title="Beneficiary Disbursed" number={15000} icon={MdEmojiEmotions} />
        </Box>
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
        <Text variant="Body1Semibold" color="gray.500">
          Recent Activities
        </Text>

        <Flex
          gap="4px"
          flexDirection="column"
          padding="10px"
          borderRadius="12px"
          boxShadow="0px 4px 6px -1px rgba(3, 48, 0, 0.04), 0px 2px 4px -1px rgba(3, 48, 0, 0.04)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text variant="Body2Semibold" color="gray.500">
              Disbursement-IDICE
            </Text>
            <Flex justifyContent="flex-end" color="primary.500">
              <Link>
                <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
                  View details <Icon as={MdOpenInNew} />
                </Text>
              </Link>
            </Flex>
          </Flex>
          <ReusableTable data={data} columns={columns} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VendorDashboard;
