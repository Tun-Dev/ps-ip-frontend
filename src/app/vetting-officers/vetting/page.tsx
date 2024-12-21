'use client';

import React, { useMemo } from 'react';
import { MdOutlineChecklistRtl, MdSearch, MdDownload, MdCloudUpload, MdMoreHoriz } from 'react-icons/md';
import {
  Flex,
  Text,
  Box,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { ColumnDef } from '@tanstack/react-table';
import { ReusableTable } from '@/shared';

const VettingOfficersVettingPage = () => {
  const cards = [
    {
      name: 'Awaiting Vetting',
      icon: MdOutlineChecklistRtl,
      value: 100000,
    },
    {
      name: 'Total Successful Vetting',
      icon: MdOutlineChecklistRtl,
      value: 50000,
    },
    {
      name: 'Total Failed Vetting',
      icon: MdOutlineChecklistRtl,
      value: 100000,
    },
  ];

  type Data = {
    beneficiaries: string;
    lga: string;
    agent: string;
    gender: 'Male' | 'Female';
    age: number;
    disabled: 'YES' | 'NO';
    literate: 'YES' | 'NO';
    vetting_score: number;
  };

  const data: Data[] = [
    {
      beneficiaries: 'John Doe',
      lga: 'Abuja Municipal',
      agent: 'Agent Smith',
      gender: 'Male',
      age: 45,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 85,
    },
    {
      beneficiaries: 'Jane Smith',
      lga: 'Kaduna North',
      agent: 'Agent Johnson',
      gender: 'Female',
      age: 32,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 92,
    },
    {
      beneficiaries: 'Michael Okonkwo',
      lga: 'Enugu East',
      agent: 'Agent Williams',
      gender: 'Male',
      age: 55,
      disabled: 'YES',
      literate: 'NO',
      vetting_score: 67,
    },
    {
      beneficiaries: 'Amina Abdullahi',
      lga: 'Kano Municipal',
      agent: 'Agent Brown',
      gender: 'Female',
      age: 40,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 88,
    },
    {
      beneficiaries: 'David Oluwaseun',
      lga: 'Lagos Mainland',
      agent: 'Agent Davis',
      gender: 'Male',
      age: 28,
      disabled: 'YES',
      literate: 'YES',
      vetting_score: 75,
    },
    {
      beneficiaries: 'Sarah Mohammed',
      lga: 'Jos South',
      agent: 'Agent Wilson',
      gender: 'Female',
      age: 50,
      disabled: 'NO',
      literate: 'NO',
      vetting_score: 62,
    },
    {
      beneficiaries: 'Emmanuel Nwachukwu',
      lga: 'Owerri West',
      agent: 'Agent Taylor',
      gender: 'Male',
      age: 38,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 90,
    },
    {
      beneficiaries: 'Fatima Bello',
      lga: 'Sokoto North',
      agent: 'Agent Martinez',
      gender: 'Female',
      age: 47,
      disabled: 'YES',
      literate: 'NO',
      vetting_score: 58,
    },
    {
      beneficiaries: 'Peter Obi',
      lga: 'Anambra West',
      agent: 'Agent Anderson',
      gender: 'Male',
      age: 33,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 95,
    },
    {
      beneficiaries: 'Grace Okeke',
      lga: 'Delta Central',
      agent: 'Agent Thompson',
      gender: 'Female',
      age: 42,
      disabled: 'NO',
      literate: 'YES',
      vetting_score: 87,
    },
  ];

  const columns: ColumnDef<Data>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Enumerated Beneficiaries (20,000)
          </Text>
        ),
        accessorKey: 'beneficiaries',
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
            Agent
          </Text>
        ),
        accessorKey: 'agent',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Gender
          </Text>
        ),
        accessorKey: 'gender',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.gender}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Age
          </Text>
        ),
        accessorKey: 'age',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.age}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Diabled
          </Text>
        ),
        accessorKey: 'disabled',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.disabled}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Literate
          </Text>
        ),
        accessorKey: 'literate',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body2Regular" align="center">
            {info.row.original.literate}
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" align="center">
            Ventting Score
          </Text>
        ),
        accessorKey: 'vetting_score',
        enableSorting: false,
        cell: (info) => (
          <Text variant="Body1Bold" align="center" color="green">
            {info.row.original.vetting_score}%
          </Text>
        ),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
            Actions
          </Text>
        ),
        accessorKey: 'deactivate',
        enableSorting: false,
        cell: () => (
          <Flex>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
                  <MdMoreHoriz size="1.25rem" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="fit-content">
                <PopoverArrow />
                <PopoverBody>
                  <Flex flexDir="column">
                    <Button w="100%" bg="transparent" size="small">
                      Approve
                    </Button>
                    <Button w="100%" bg="transparent" size="small">
                      Deny
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <Flex flexDir="column" gap="12px">
        <Text variant="Body1Semibold" color="grey.400">
          iDICE Disbursement
        </Text>
        <Grid gap="6" templateColumns="repeat(auto-fit, minmax(265px, 1fr))">
          {cards.map((card, index) => (
            <Box key={index}>
              <OverviewCard title={card.name} number={card.value} icon={card.icon} />
            </Box>
          ))}
        </Grid>
      </Flex>
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
            <Button leftIcon={<MdDownload />} variant="secondary" w="155px" borderRadius="10px" size="medium">
              Download Report
            </Button>
            <Button leftIcon={<MdCloudUpload />} variant="primary" w="124px" borderRadius="10px" size="medium">
              Upload Data
            </Button>
          </Flex>
        </Flex>
        <ReusableTable selectable data={data} columns={columns} />
      </Flex>
    </Flex>
  );
};

export default VettingOfficersVettingPage;
