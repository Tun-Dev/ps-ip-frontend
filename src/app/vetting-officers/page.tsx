'use client';

import { Flex, Text, Grid, Box, Link, Icon } from '@chakra-ui/react';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { MdOutlineChecklistRtl, MdViewCarousel, MdOpenInNew } from 'react-icons/md';
import { NotificationCard, ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const ActivityTable = () => {
  type Person = {
    name: string;
    lga: number;
    enumerated: number;
  };
  const data: Person[] = [
    { name: 'John Doe', lga: 30, enumerated: 1000 },
    { name: 'Jane Smith', lga: 25, enumerated: 300 },
    { name: 'Bob Johnson', lga: 45, enumerated: 700 },
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
    ],
    []
  );
  return (
    <Flex
      gap="4px"
      flexDirection="column"
      padding="10px"
      borderRadius="12px"
      boxShadow="0px 4px 6px -1px rgba(3, 48, 0, 0.04), 0px 2px 4px -1px rgba(3, 48, 0, 0.04)"
      bg="primary.30"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="Body2Semibold" color="grey.500">
          Enumeration - iDICE
        </Text>
        <Flex justifyContent="flex-end" color="secondary.500">
          <Link>
            <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
              View details <Icon as={MdOpenInNew} />
            </Text>
          </Link>
        </Flex>
      </Flex>
      <ReusableTable data={data} columns={columns} headerBgColor="white" />
    </Flex>
  );
};

const VettingOfficersDashboard = () => {
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <Grid gap="1rem" templateColumns="repeat(auto-fit, minmax(265px, 1fr))">
          <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
          <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
          <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
          <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Notifications
        </Text>
        <Grid gap="1rem" templateColumns="repeat(auto-fit, minmax(22.375rem, 1fr))">
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
          />
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
          />
          <NotificationCard
            title="Vetting Updates"
            time="2 hours ago"
            desc="Vetting for iDICE is at 50% completion"
            boldWord="iDICE"
            Icon={MdOutlineChecklistRtl}
          />
        </Grid>
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Recent Activities
        </Text>
        <Box w="33%">
          <ActivityTable />
        </Box>
      </Flex>
    </Flex>
  );
};

export default VettingOfficersDashboard;
