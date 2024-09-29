'use client';

import { useMemo } from "react";
import { Box, Container, Flex, Grid, GridItem, Heading, Select, Stack, Text,Button } from '@chakra-ui/react';
import { MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft,MdAddCircle } from 'react-icons/md';
import { ReusableTable } from "@/shared";
import { ColumnDef } from "@tanstack/react-table";

import { Dropdown } from '@/components';

import colors from '@/shared/chakra/colors';
import heading from '@/shared/chakra/components/heading';
import text from '@/shared/chakra/components/text';

import { ShortAnswerIcon } from '../../../public/icons';

export default function ComponentPage() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Dropdowns />
          <Colors />
          <Texts />
          <Headings />
          <Buttons/>
          <Table/>
        </Stack>
      </Container>
    </Box>
  );
}

const Colors = () => {
  return (
    <Box>
      <Heading mb="4">Colors</Heading>
      <Grid gap="6" templateColumns="repeat(auto-fit, minmax(12.5rem, 1fr))">
        {Object.entries(colors).map(([label, value]) => {
          if (typeof value === 'string') return <Color key={label} label={label} value={value} />;
          return Object.entries(value).map(([nestedLabel, nestedValue]) => (
            <Color key={`${label} ${nestedLabel}`} label={`${label} ${nestedLabel}`} value={nestedValue} />
          ));
        })}
      </Grid>
    </Box>
  );
};

const Color = ({ label, value }: { label: string; value: string }) => {
  return (
    <GridItem>
      <Flex gap="2" align="center">
        <Box boxSize="12" bgColor={value} rounded="md" shadow="md" />
        <Box>
          <Text textTransform="capitalize" fontWeight="semibold">
            {label}
          </Text>
          <Text textTransform="uppercase">{value}</Text>
        </Box>
      </Flex>
    </GridItem>
  );
};

const Texts = () => {
  return (
    <Box>
      <Heading mb="4">Texts</Heading>
      <Stack gap="6">
        {text.variants &&
          Object.keys(text.variants).map((variant) => (
            <Text key={variant} variant={variant}>
              ({variant}) The quick brown fox jumps over the lazy dog
            </Text>
          ))}
      </Stack>
    </Box>
  );
};

const Headings = () => {
  return (
    <Box>
      <Heading mb="4">Headings</Heading>
      <Stack gap="6">
        {heading.variants &&
          Object.keys(heading.variants).map((variant) => (
            <Heading key={variant} variant={variant}>
              ({variant}) The quick brown fox jumps over the lazy dog
            </Heading>
          ))}
      </Stack>
    </Box>
  );
};

const Dropdowns = () => {
  const options = [
    { label: 'Short answer', value: 'Short answer', icon: ShortAnswerIcon },
    { label: 'Paragraph', value: 'Paragraph', icon: MdFormatAlignLeft },
    { label: 'Dropdown', value: 'Dropdown', icon: MdArrowDropDown },
    { label: 'Date', value: 'Date', icon: MdCloudUpload },
    { label: 'File upload', value: 'File upload', icon: MdDateRange },
  ];

  return (
    <Box maxW="sm">
      <Heading mb="4">Dropdowns</Heading>
      <Stack gap="6">
        <Box>
          <Heading variant="Header1Bold" mb="2">
            React Select
          </Heading>
          <Dropdown options={options} />
        </Box>
        <Box>
          <Heading variant="Header1Bold" mb="2">
            Chakra Select
          </Heading>
          <Stack spacing="2">
            <Text>Small</Text>
            <Select placeholder="Select..." size="small">
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Text>Medium</Text>
            <Select placeholder="Select...">
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const Buttons = () => {
  const sizes = ["small", "medium", "default"];
  const types = ["primary", "secondary", "tertiary", "accept", "cancel"];
  return (
    <Box>
      <Heading size="md" mb="4">
        Buttons
      </Heading>
      <Flex flexDirection="column" gap="6">
        {types.map((variant, variantIndex) => (
          <Flex key={variantIndex} flexDirection="column" gap="4">
            <Text fontWeight="bold" textTransform="capitalize">{variant}</Text>
            <Flex alignItems="center" gap="4" flexWrap="wrap">
              {sizes.map((size) => (
                <Button
                  key={`${variant}-${size}`}
                  variant={variant}
                  size={size}
                  leftIcon={<MdAddCircle />}
                  rightIcon={<MdAddCircle />}
                >
                  {variant}
                </Button>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const Table = () => {
  type Person = {
    name: string;
    age: number;
    email: string;
  };
  const data: Person[] = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 45, email: 'bob@example.com' },
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
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Age
          </Text>
        ),
        accessorKey: 'age',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Email address
          </Text>
        ),
        accessorKey: 'email',
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <Flex flexDir="column" alignItems="center" gap="3">
      <Text variant="Body1Bold" fontSize="24px">Table</Text>
      <ReusableTable data={data} columns={columns} />
    </Flex>
  );
}
