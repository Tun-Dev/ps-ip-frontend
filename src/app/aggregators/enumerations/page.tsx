/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import { Flex, Text, Box, Select, InputGroup, InputLeftElement, Icon, Input, Button } from '@chakra-ui/react';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { MdSearch, MdDownload, MdRefresh, MdCheckCircle, MdCloudUpload, MdEdit, MdDelete } from 'react-icons/md';
import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';

const EnumerationsTable = () => {
  const agentsData = [
    { agent: 'Usman Ola', lga: 'Ikeja', status: 'Online', activated: true, objective: 600 },
    { agent: 'Usman Ola', lga: 'Ikeja', status: 'Online', activated: true, objective: 800 },
    { agent: 'Usman Ola', lga: 'Ikeja', status: 'Online', activated: false, objective: 900 },
    { agent: 'Usman Ola', lga: 'Ikeja', status: 'Online', activated: true, objective: 600 },
    { agent: 'Usman Ola', lga: 'Ikeja', activated: true, objective: 1000 },
  ];

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Agent
          </Text>
        ),
        accessorKey: 'agent',
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
        cell: (info) => <>{info.row.original.lga ? info.row.original.lga : '----------------'}</>,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Objective
          </Text>
        ),
        accessorKey: 'gender',
        enableSorting: false,
        cell: (info) => (
          <Box
            padding="2px 10px"
            bg={info.row.original.objective / 1000 < 1 ? 'grey.200' : 'primary.100'}
            borderRadius="12px"
            width="fit-content"
          >
            {info.row.original.objective}/1000
          </Box>
        ),
      },
      {
        header: () => (
          <Flex w="154px" justifyContent="center">
            <Text variant="Body3Semibold" color="gray.500">
              Status
            </Text>
          </Flex>
        ),
        accessorKey: 'status',
        enableSorting: false,
        cell: (info) => (
          <Flex w="154px" justifyContent="center">
            <Text
              variant="Body2Semibold"
              color={info.row.original.status === 'Online' ? 'green' : 'text'}
              textAlign="center"
              w="154px"
            >
              {info.row.original.status === 'Online' ? 'Online' : 'Dec. 20, 4:00pm'}
            </Text>
          </Flex>
        ),
      },
      {
        header: () => (
          <Flex justifyContent="center" w="143px">
            <Button variant="cancel" size="small" w="100%">
              Deactivate Agent
            </Button>
          </Flex>
        ),
        accessorKey: 'activated',
        enableSorting: false,
        cell: (info) => (
          <Flex justifyContent="center" w="143px">
            {info.row.original.activated ? (
              <Button variant="cancel" size="small" w="100%">
                Deactivate Agent
              </Button>
            ) : (
              <Flex gap={2} alignItems="center">
                <Text variant="Body3Bold" color="red">
                  Deactivated
                </Text>
                <Button variant="secondary" size="small">
                  Activate
                </Button>
              </Flex>
            )}
          </Flex>
        ),
      },
      {
        header: () => <></>,
        accessorKey: 'status_',
        enableSorting: false,
        cell: () => (
          <Flex gap={2}>
            <Icon as={MdDelete} color="red" />
            <Icon as={MdEdit} color="primary.600" />
          </Flex>
        ),
      },
    ],
    []
  );

  return (
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
        <Flex gap={2}>
          <Button leftIcon={<MdDownload />} variant="secondary" size="medium" borderRadius="10px">
            Download Report
          </Button>
          <Button leftIcon={<MdCloudUpload />} variant="primary" size="medium" borderRadius="10px">
            Upload Selected Data
          </Button>
        </Flex>
      </Flex>
      <Box
        padding="0px 1rem 1rem"
        boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
        borderRadius="12px"
      >
        <ReusableTable data={agentsData} columns={columns} />
      </Box>
    </Flex>
  );
};

const AggregatorsEnumerationDashboard = () => {
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="Body1Semibold" color="grey.400">
            Enumeration - iDICE
          </Text>
        </Flex>
        <Flex gap="1rem">
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Completed Objectives" number={20} icon={MdCheckCircle} />
          </Box>
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Objectives Pending" number={20} icon={MdRefresh} />
          </Box>
          <Box w="265px" cursor="pointer">
            <OverviewCard title="Pending Reviews" number={20} icon={MdRefresh} />
          </Box>
        </Flex>
      </Flex>
      <EnumerationsTable />
    </Flex>
  );
};

export default AggregatorsEnumerationDashboard;
