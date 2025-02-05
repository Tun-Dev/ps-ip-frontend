'use client';

import { useGetVendorDashboard } from '@/hooks/useGetVendorDashboard';
import { NotificationCard, ReusableTable } from '@/shared';
import { ActivityTableSkeleton } from '@/shared/chakra/components/activity-table-skeleton';
import { NotificationCardSkeleton } from '@/shared/chakra/components/notification-card-skeleton';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { VendorActivity, VendorActivityBeneficiary } from '@/types';
import { formatCurrency } from '@/utils';
import { Flex, Grid, Icon, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import {
  MdAccountBalanceWallet,
  MdEmojiEmotions,
  MdLocalShipping,
  MdOpenInNew,
  MdStickyNote2,
  MdViewCarousel,
  MdViewList,
  MdVolunteerActivism,
} from 'react-icons/md';

const VendorDashboard = () => {
  const router = useRouter();
  const { data, isPending, isError } = useGetVendorDashboard();

  return (
    <Stack flexDir="column" gap="6">
      <Stack spacing="3">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <SimpleGrid gap="4" columns={{ base: 3, sm: 4 }}>
          <OverviewCard
            minW="unset"
            title="Programs"
            number={isPending || isError ? '...' : data.body.programs}
            icon={MdViewCarousel}
            cursor="pointer"
            onClick={() => router.push('/vendors/programs')}
          />
          <OverviewCard
            minW="unset"
            title="Orders"
            icon={MdLocalShipping}
            number={isPending || isError ? '...' : data.body.orders}
          />
          <OverviewCard
            minW="unset"
            title="Amount Disbursed"
            icon={MdVolunteerActivism}
            number={isPending || isError ? '...' : formatCurrency(data.body.amountDisbursed)}
          />
          <OverviewCard
            minW="unset"
            title="Amount Disbursable"
            icon={MdAccountBalanceWallet}
            number={isPending || isError ? '...' : formatCurrency(data.body.amountDisburseable)}
          />
          <OverviewCard
            minW="unset"
            title="Beneficiary Disbursed"
            icon={MdEmojiEmotions}
            number={isPending || isError ? '...' : data.body.beneficiariesDisbursed}
          />
        </SimpleGrid>
      </Stack>
      <Stack spacing="3">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <Grid gap="1rem" templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
          {isPending || isError
            ? Array.from(Array(3).keys()).map((index) => <NotificationCardSkeleton key={index} />)
            : NOTIFICATION_DATA.map((item, index) => <NotificationCard key={index} {...item} />)}
        </Grid>
      </Stack>
      <Stack spacing="3">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <Grid gap="20px" templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
          {isPending || isError
            ? Array.from(Array(3).keys()).map((index) => <ActivityTableSkeleton key={index} />)
            : [data.body.activities].map((activity, index) => <ActivityTable key={index} activity={activity} />)}
        </Grid>
      </Stack>
    </Stack>
  );
};

const ActivityTable = ({ activity }: { activity: VendorActivity }) => {
  return (
    <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card" bgColor="primary.100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          {activity.module} - {activity.programName}
        </Text>
        <Flex justifyContent="flex-end" color="primary.500">
          <Link href="/aggregators/programs">
            <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold" color="secondary.500">
              View details <Icon as={MdOpenInNew} />
            </Text>
          </Link>
        </Flex>
      </Flex>
      <ReusableTable data={activity.beneficiaries} columns={columns} p="8px 0px" />
    </Flex>
  );
};

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

const columns: ColumnDef<VendorActivityBeneficiary>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500">
        Name
      </Text>
    ),
    accessorKey: 'Name',
    enableSorting: false,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500">
        LGA
      </Text>
    ),
    accessorKey: 'LGA',
    enableSorting: false,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500">
        Status
      </Text>
    ),
    accessorKey: 'Status',
    enableSorting: false,
  },
];

export default VendorDashboard;
