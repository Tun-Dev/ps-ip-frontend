'use client';

import { useMemo } from 'react';
import { Flex, Text, Box, Select, InputGroup, InputLeftElement, Icon, Input, Button } from '@chakra-ui/react';
import { OverviewCard } from '@/components/overview';
import { MdGroups, MdGroupAdd, MdSearch, MdAddCircle, MdDownload } from 'react-icons/md';
import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';

const AgentsPage = () => {
  const data = [
    { organization: 'NURTW', program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME', amount: 250 },
    { organization: 'NURTW', program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM', amount: 200 },
    { organization: 'NURTW', program: 'ALIKO DANGOTE FOUNDATION FUND', amount: 150 },
    { organization: 'NURTW', program: 'CBN BACKWARD INTEGRATION FUND', amount: 300 },
    { organization: 'NURTW', program: 'CBN BACKWARD INTEGRATION FUND', amount: 250 },
    { organization: 'NURTW', program: 'INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM', amount: 300 },
    { organization: 'NURTW', program: 'GOVERNMENT ENTERPRISE EMPOWERMENT PROGRAMME', amount: 250 },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Aggregator
          </Text>
        ),
        accessorKey: 'organization',
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
            Amount
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
      },
      {
        header: () => <p></p>,
        accessorKey: 'amount',
        enableSorting: false,
        cell: () => (
          <Flex justifyContent="center" gap="8px">
            <Button variant="tertiary" size="small">
              Assigned
            </Button>
            <Button variant="secondary" size="small">
              Reassign
            </Button>
          </Flex>
        ),
      },
      {
        header: () => (
          <Button variant="cancel" size="small">
            Deactivate Aggregator
          </Button>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: () => (
          <Button variant="cancel" size="small">
            Deactivate Aggregator
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          Overview
        </Text>
        <Flex gap="1rem">
          <Box w="265px">
            <OverviewCard title="Total Agents" number={20} icon={MdGroups} />
          </Box>
          <Box w="265px">
            <OverviewCard title="Total Aggregators" number={20} icon={MdGroupAdd} />
          </Box>
        </Flex>
      </Flex>
      {/* <Tabs size="sm" colorScheme="primary.500">
        <TabList>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text color="gray.400" variant="Body2Semibold">
                Active
              </Text>
              <Box p={'2px 4px'} borderRadius="8px" bg="gray.200" color="gray.500">
                <Text variant="Body3Semibold">200</Text>
              </Box>
            </Flex>
          </Tab>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text color="gray.400" variant="Body2Semibold">
                Inactive
              </Text>
              <Box p={'2px 4px'} borderRadius="8px" bg="gray.200" color="gray.500">
                <Text variant="Body3Semibold">200</Text>
              </Box>
            </Flex>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
      <Flex flexDir="column" gap="1.5rem" w="100%" padding="1rem 0px" borderTop="1px solid" borderTopColor="grey.200">
        <Flex justifyContent="space-between">
          <Flex gap="8px" alignItems="center">
            <Flex gap="8px" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
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
            </Flex>
            <InputGroup w="212px" size="sm">
              <InputLeftElement>
                <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
              </InputLeftElement>
              <Input variant="primary" fontSize="10px" placeholder="Search" />
            </InputGroup>
          </Flex>
          <Flex gap="8px" alignItems="center">
            <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px">
              Download Report
            </Button>
            <Button leftIcon={<MdAddCircle />} variant="primary">
              Add New Aggregator
            </Button>
          </Flex>
        </Flex>
        <Box padding="1rem" boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A" borderRadius="12px">
          <ReusableTable data={data} columns={columns} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AgentsPage;
