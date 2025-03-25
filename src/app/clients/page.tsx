'use client';

import { Box, Flex, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdEmojiEmotions,
  MdLocalShipping,
  MdOpenInNew,
  MdStickyNote2,
  MdViewList,
  MdVolunteerActivism,
} from 'react-icons/md';

import { useGetDashboardData } from '@/hooks/useGetDashboardData';
import { NotificationCard, ReusableTable } from '@/shared';
import { ModuleDashboardCard } from '@/shared/chakra/components';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { EnumerationsTableData } from '@/types';
import { Link } from '@chakra-ui/next-js';

const ClientsDashboard = () => {
  const { data, isPending, isError } = useGetDashboardData();

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overviewss
        </Text>
        <SimpleGrid gap="5" columns={{ base: 3, sm: 4 }}>
          <OverviewCard
            title="Total Beneficiaries"
            number={isPending || isError ? '...' : data.body.totalBeneficiaries}
            icon={MdEmojiEmotions}
          />
          <OverviewCard
            title="Beneficiaries Disbursed"
            number={isPending || isError ? '...' : data.body.beneficiariesDisbursed}
            icon={MdEmojiEmotions}
          />
          <OverviewCard
            title="Orders Disbursed"
            number={isPending || isError ? '...' : data.body.beneficiariesDisbursed}
            icon={MdVolunteerActivism}
          />
        </SimpleGrid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Modules In Progress
        </Text>
        <SimpleGrid gap="5" columns={{ base: 3, sm: 4 }}>
          <ModuleDashboardCard
            text="Applications"
            number={isPending || isError ? '...' : data.body.applications}
            image="/icons/Application.svg"
          />
          <ModuleDashboardCard
            text="Beneficiaries Enumerated"
            number={isPending || isError ? '...' : data.body.beneficiariesEnumerated}
            image="/icons/Enumeration.svg"
          />
          <ModuleDashboardCard
            text="Awaiting KYC Verification"
            number={isPending || isError ? '...' : data.body.awaitingKYCVerification}
            image="/icons/Verification.svg"
          />
          <ModuleDashboardCard
            text="Awaiting Disbursement"
            number={isPending || isError ? '...' : data.body.awaitingDisbursement}
            image="/icons/Disbursement.svg"
          />
        </SimpleGrid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <SimpleGrid gap="4" columns={{ base: 2, sm: 3 }}>
          {NotificationData.map((item, index) => (
            <NotificationCard key={index} {...item} />
          ))}
        </SimpleGrid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <SimpleGrid gap="5" columns={{ base: 2, sm: 3 }}>
          <ActivityTable data={data?.body.enumerations ?? []} />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

const ActivityTable = ({ data }: { data: EnumerationsTableData[] }) => {
  return (
    <Stack gap="1" py="2" px="2.5" borderRadius="0.75rem" boxShadow="card" bgColor="primary.100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          Enumeration
        </Text>
        <Flex justifyContent="flex-end" color="secondary.500">
          <Link href="/super-admin/agents">
            <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
              View details <Icon as={MdOpenInNew} />
            </Text>
          </Link>
        </Flex>
      </Flex>
      <ReusableTable data={data} columns={columns} p="0" border="none" shadow="none" />
    </Stack>
  );
};

const columns: ColumnDef<EnumerationsTableData>[] = [
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
        Enumerated
      </Text>
    ),
    accessorKey: 'enumerated',
    enableSorting: false,
    cell: (info) => {
      const [current, total] = info.row.original.enumerated.split('/');
      return (
        <Box
          padding="2px 10px"
          bg={current !== total ? 'grey.200' : 'primary.100'}
          borderRadius="12px"
          width="fit-content"
          mx="auto"
        >
          {info.row.original.enumerated}
        </Box>
      );
    },
  },
];

const NotificationData = [
  {
    title: 'Enumeration Update',
    time: '1hr ago',
    desc: 'Enumeration from Ikeja just concluded',
    Icon: MdViewList,
  },
  {
    title: 'Disbursement Update',
    time: '2hrs ago',
    desc: 'Disbursement at Ikeja is at 50% completion',
    Icon: MdLocalShipping,
  },
  {
    title: 'Application Update',
    time: '3hrs ago',
    desc: '5,000 new beneficiaries sent in applications from Ikeja',
    Icon: MdStickyNote2,
  },
];

export default ClientsDashboard;
