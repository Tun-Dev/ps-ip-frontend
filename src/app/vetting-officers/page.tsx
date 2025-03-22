'use client';

import { useGetVettingOfficersDashboard } from '@/hooks/useGetVettingOfficersDashboard';
import { NotificationCard, ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Flex, Icon, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MdEmojiEmotions, MdOpenInNew, MdOutlineChecklistRtl, MdViewCarousel } from 'react-icons/md';

const VettingOfficersDashboard = () => {
  const router = useRouter();
  const { isPending, isError, data } = useGetVettingOfficersDashboard();

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
            onClick={() => router.push('/vetting-officers/programs')}
          />
          <OverviewCard
            minW="unset"
            title="Total Beneficiaries"
            icon={MdEmojiEmotions}
            number={isPending || isError ? '...' : data.body.totalVetted}
          />
          <OverviewCard
            minW="unset"
            title="Awaiting Vetting"
            icon={MdOutlineChecklistRtl}
            number={isPending || isError ? '...' : data.body.pendingApproval}
          />
          <OverviewCard
            minW="unset"
            title="Total Successful Vetting"
            icon={MdOutlineChecklistRtl}
            iconColor="green"
            number={isPending || isError ? '...' : data.body.successfulVetting}
          />
          <OverviewCard
            minW="unset"
            title="Total Failed Vetting"
            icon={MdOutlineChecklistRtl}
            iconColor="red"
            number={isPending || isError ? '...' : data.body.failedVetting}
          />
        </SimpleGrid>
      </Stack>
      <Stack spacing="3">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <SimpleGrid columns={{ base: 2, xl: 3 }} gap="4">
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
            iconSize="1.25rem"
          />
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
            iconSize="1.25rem"
          />
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
            iconSize="1.25rem"
          />
        </SimpleGrid>
      </Stack>
      <Stack spacing="3">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <SimpleGrid columns={{ base: 2, xl: 3 }} gap="5">
          <ActivityTable activity={ACTIVITY} />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

const ActivityTable = ({ activity }: { activity: Activity }) => {
  return (
    <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card" bgColor="primary.100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          {activity.program}
        </Text>
        <Flex justifyContent="flex-end" color="primary.500">
          <Link href="/vetting-officers/programs">
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

type Activity = { program: string; activity: { name: string; lga: string; status: string }[] };

const ACTIVITY: Activity = { program: 'N/A', activity: [] };

const columns: ColumnDef<Activity['activity'][number]>[] = [
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500">
        Name
      </Text>
    ),
    accessorKey: 'name',
    enableSorting: false,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500">
        LGA
      </Text>
    ),
    accessorKey: 'lga',
    enableSorting: false,
  },
  {
    header: () => (
      <Text variant="Body3Semibold" color="grey.500" textAlign="center">
        Status
      </Text>
    ),
    accessorKey: 'enumerated',
    enableSorting: false,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <Text
          variant="Body3Semibold"
          color={status === 'Approved' ? 'green' : status === 'Denied' ? 'red' : 'grey.500'}
          textAlign="center"
        >
          {status}
        </Text>
      );
    },
  },
];

export default VettingOfficersDashboard;
