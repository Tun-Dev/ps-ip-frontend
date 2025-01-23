'use client';

import { useGetDashboardData } from '@/hooks/useGetDashboardData';
import { NotificationCard, ReusableTable } from '@/shared';
import { ModuleDashboardCard } from '@/shared/chakra/components';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { EnumerationsTableData } from '@/types';
import { Box, Flex, Grid, Icon, Link, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  MdEmojiEmotions,
  MdLocalShipping,
  MdOpenInNew,
  MdStickyNote2,
  MdViewCarousel,
  MdViewList,
  MdVolunteerActivism,
} from 'react-icons/md';

const ActivityTable = ({ data }: { data: EnumerationsTableData[] }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
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
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
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
            mx="auto"
          >
            {info.row.original.enumerated}
          </Box>
        ),
      },
    ],
    []
  );
  return (
    <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card" bg="primary.100">
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          Enumeration
          {/* - iDICE */}
        </Text>
        <Flex justifyContent="flex-end" color="secondary.500">
          <Link>
            <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
              View details <Icon as={MdOpenInNew} />
            </Text>
          </Link>
        </Flex>
      </Flex>
      <ReusableTable data={data} columns={columns} headerBgColor="white" p="8px 0px" />
    </Flex>
  );
};

const SuperAdminDashboard = () => {
  const { data, isLoading } = useGetDashboardData();
  console.log(data);
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <Grid gap="1rem" templateColumns="repeat(auto-fit, minmax(265px, 1fr))">
          <OverviewCard
            title="Running programs"
            number={isLoading ? '...' : (data?.body.runningPrograms ?? 0)}
            icon={MdViewCarousel}
          />
          <OverviewCard
            title="Total Beneficiaries"
            number={isLoading ? '...' : (data?.body.totalBeneficiaries ?? 0)}
            icon={MdEmojiEmotions}
          />
          <OverviewCard
            title="Beneficiaries Disbursed"
            number={isLoading ? '...' : (data?.body.beneficiariesDisbursed ?? 0)}
            icon={MdEmojiEmotions}
          />
          <OverviewCard
            title="Amount Disbursed"
            number={isLoading ? '...' : (data?.body.amountDisbursed ?? 0)}
            icon={MdVolunteerActivism}
          />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Modules In Progress
        </Text>
        <Grid gap="1rem" templateColumns="repeat(auto-fit, minmax(262px, 1fr))">
          <ModuleDashboardCard
            text="Applications"
            number={isLoading ? '...' : (data?.body.applications ?? 0)}
            image="/icons/Application.svg"
          />
          <ModuleDashboardCard
            text="Beneficiaries Enumerated"
            number={isLoading ? '...' : (data?.body.beneficiariesEnumerated ?? 0)}
            image="/icons/Enumeration.svg"
          />
          <ModuleDashboardCard
            text="Awaiting KYC Verification"
            number={isLoading ? '...' : (data?.body.awaitingKYCVerification ?? 0)}
            image="/icons/Verification.svg"
          />
          <ModuleDashboardCard
            text="Awaiting  Disbursement"
            number={isLoading ? '...' : (data?.body.awaitingDisbursement ?? 0)}
            image="/icons/Disbursement.svg"
          />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <Grid gap="1rem" templateColumns="repeat(auto-fit, minmax(22.375rem, 1fr))">
          {NotificationData.map((item, index) => (
            <NotificationCard key={index} {...item} />
          ))}
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <Grid gap="20px" templateColumns="repeat(auto-fit, minmax(360px, 1fr))">
          <ActivityTable data={data?.body.enumerations ?? []} />
          <ActivityTable data={data?.body.enumerations ?? []} />
          <ActivityTable data={data?.body.enumerations ?? []} />
        </Grid>
      </Flex>
    </Flex>
  );
};

export default SuperAdminDashboard;

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
