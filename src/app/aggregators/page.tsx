'use client';

import { Box, Flex, Grid, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdGroups, MdOpenInNew, MdRefresh, MdViewCarousel, MdViewList } from 'react-icons/md';

import { useGetAggregatorDashboard } from '@/hooks/useGetAggregatorDashboard';
import { NotificationCard, ReusableTable } from '@/shared';
import { ActivityTableSkeleton } from '@/shared/chakra/components/activity-table-skeleton';
import { NotificationCardSkeleton } from '@/shared/chakra/components/notification-card-skeleton';
import { OverviewCard } from '@/shared/chakra/components/overview';
import type { AggregatorActivity, AggregatorActivityTable } from '@/types';

const AggregatorsDashboard = () => {
  const router = useRouter();
  const { data, isPending, isError } = useGetAggregatorDashboard();
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <SimpleGrid gap="1rem" columns={{ base: 3, sm: 4 }}>
          <OverviewCard
            minW="unset"
            title="Programs"
            number={isPending || isError ? '...' : data.body.programCount}
            icon={MdViewCarousel}
            cursor="pointer"
            onClick={() => router.push('/aggregators/programs')}
          />
          <OverviewCard
            minW="unset"
            title="Total Agents"
            number={isPending || isError ? '...' : data.body.totalAgents}
            icon={MdGroups}
            cursor="pointer"
            onClick={() => router.push('/aggregators/agents')}
          />
          <OverviewCard
            minW="unset"
            title="Agents Online"
            number={isPending || isError ? '...' : data.body.agentsOnline}
            icon={MdGroups}
          />
          <OverviewCard
            minW="unset"
            title="Total Enumerations"
            number={isPending || isError ? '...' : data.body.totalEnumerations}
            icon={MdViewList}
          />
          <OverviewCard
            minW="unset"
            title="Unfulfilled objectives"
            number={isPending || isError ? '...' : data.body.unfulfilledObjectives}
            icon={MdRefresh}
          />
        </SimpleGrid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <Grid gap="1rem" templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
          {isPending || isError
            ? Array.from(Array(5).keys()).map((index) => <NotificationCardSkeleton key={index} />)
            : NotificationData.map((item, index) => <NotificationCard key={index} {...item} />)}
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <Grid gap="20px" templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
          {isPending || isError
            ? Array.from(Array(3).keys()).map((index) => <ActivityTableSkeleton key={index} />)
            : data.body.activities.map((activity, index) => <ActivityTable key={index} activity={activity} />)}
        </Grid>
      </Flex>
    </Flex>
  );
};

const ActivityTable = ({ activity }: { activity: AggregatorActivity }) => {
  return (
    <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card" bgColor="primary.100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          {activity.program}
        </Text>
        <Flex justifyContent="flex-end" color="primary.500">
          <Link href="/aggregators/programs">
            <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold" color="secondary.500">
              View details <Icon as={MdOpenInNew} />
            </Text>
          </Link>
        </Flex>
      </Flex>
      <ReusableTable data={activity.activity} columns={columns} p="8px 0px" />
    </Flex>
  );
};

const columns: ColumnDef<AggregatorActivityTable>[] = [
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
    header: (info) => {
      const firstRow = info.table.getRowModel().rows[0]?.original;
      const headerText = firstRow?.enumerated ? 'Enumerated' : 'Status';
      return (
        <Text variant="Body3Semibold" color="gray.500">
          {headerText}
        </Text>
      );
    },
    accessorKey: 'enumerated',
    enableSorting: false,
    cell: (info) => {
      const enumerated = info.row.original.enumerated;
      const status = info.row.original.status;
      if (enumerated) {
        const [current, total] = enumerated.split('/');

        return (
          <Box
            padding="2px 10px"
            bg={current !== total ? 'grey.200' : 'primary.100'}
            borderRadius="12px"
            width="fit-content"
          >
            {enumerated}
          </Box>
        );
      }

      if (status)
        return (
          <Text variant="Body3Semibold" color={status === 'Online' ? 'green' : 'grey.500'}>
            {status}
          </Text>
        );
    },
  },
];

const NotificationData = [
  {
    title: 'Agents Update',
    time: '1hr ago',
    desc: '50 Agents completed enumeration of beneficiaries at Ikeja',
    boldWord: 'Ikeja',
    Icon: MdGroups,
  },
  {
    title: 'Enumeration Update',
    time: '1hr ago',
    desc: 'Enumeration from Ikeja just concluded',
    boldWord: 'Ikeja',
    Icon: MdViewList,
  },
  {
    title: 'Agents Update',
    time: '2hrs ago',
    desc: '50 Agents completed enumeration of beneficiaries at Ikeja',
    boldWord: 'Ikeja',
    Icon: MdGroups,
  },
  {
    title: 'Enumeration Update',
    time: '3hrs ago',
    desc: 'Enumeration from Ikeja just concluded',
    boldWord: 'Ikeja',
    Icon: MdViewList,
  },
  {
    title: 'Agents Update',
    time: '5hrs ago',
    desc: '50 Agents completed enumeration of beneficiaries at Ikeja',
    boldWord: 'Ikeja',
    Icon: MdGroups,
  },
];

export default AggregatorsDashboard;
