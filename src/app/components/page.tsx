'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  MdAddCircle,
  MdArrowDropDown,
  MdCloudUpload,
  MdDateRange,
  MdFormatAlignLeft,
  MdLocalShipping,
  MdStickyNote2,
  MdViewCarousel,
  MdViewList,
  MdVolunteerActivism,
} from 'react-icons/md';

import { ReusableTable } from '@/shared';
import colors from '@/shared/chakra/colors';
import { Dropdown, GeepComponent, ModuleDashboardCard, ModuleProgressCard } from '@/shared/chakra/components';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Text as typography } from '@/shared/chakra/themes/typography';

import { NotificationCard } from '@/shared';
import { ALL_MODULES } from '@/utils';
import { ShortAnswerIcon } from '../../../public/icons';

export default function ComponentPage() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Dropdowns />
          <Colors />
          <Texts />
          <Buttons />
          <Flex gap="15px">
            <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
            <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
            <OverviewCard title="Total Partners" number={10} icon={MdVolunteerActivism} />
            <OverviewCard title="Running program" number={20} icon={MdViewCarousel} />
          </Flex>
          <Table />
          <ModuleDashboardCardSection />
          <GeepComponents />
          <NotificationCards />
          <Input variant="primary" placeholder="input username" />
          <ModuleProgressCards />
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
      <Heading mb="4">Typography</Heading>
      <Stack gap="6">
        {typography.variants &&
          Object.keys(typography.variants).map((variant) => (
            <Text key={variant} variant={variant}>
              ({variant}) The quick brown fox jumps over the lazy dog
            </Text>
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
        <Stack spacing="2">
          <Heading variant="Header1Bold" mb="2">
            React Select
          </Heading>
          <Text fontWeight="bold">Primary</Text>
          <Dropdown variant="primaryDropdown" options={options} />
          <Text fontWeight="bold">White</Text>
          <Dropdown variant="whiteDropdown" options={options} />
        </Stack>
        <Stack spacing="2">
          <Heading variant="Header1Bold">Chakra Select</Heading>
          <Text fontWeight="bold">Small (Primary)</Text>
          <Select placeholder="Select..." size="small">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Text fontWeight="bold">Medium (Primary)</Text>
          <Select placeholder="Select...">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Text fontWeight="bold">Small (White)</Text>
          <Select placeholder="Select..." size="small" variant="white">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Text fontWeight="bold">Medium (White)</Text>
          <Select placeholder="Select..." variant="white">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Stack>
      </Stack>
    </Box>
  );
};

const Buttons = () => {
  const sizes = ['small', 'medium', 'default'];
  const types = ['primary', 'secondary', 'tertiary', 'accept', 'cancel'];
  return (
    <Box>
      <Heading size="md" mb="4">
        Buttons
      </Heading>
      <Flex flexDirection="column" gap="6">
        {types.map((variant, variantIndex) => (
          <Flex key={variantIndex} flexDirection="column" gap="4">
            <Text fontWeight="bold" textTransform="capitalize">
              {variant}
            </Text>
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

  const columns: ColumnDef<(typeof data)[number]>[] = useMemo(
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
      <Text variant="Body1Bold" fontSize="24px">
        Table
      </Text>
      <ReusableTable data={data} columns={columns} />
    </Flex>
  );
};

const ModuleDashboardCardSection = () => {
  return (
    <Box maxW="16.375rem">
      <Heading mb="4">Module Card</Heading>
      <ModuleDashboardCard text="Applications" number={300000} image="/icons/Application.svg" />
    </Box>
  );
};

const GeepComponents = () => {
  return (
    <Box maxW="33.75rem">
      <Heading mb="4">GEEP Components</Heading>
      <SimpleGrid columns={2} spacing="4">
        <GeepComponent
          name="Government Enterprise And Empowerment Programme"
          logo="GEEP LOGO"
          count={5}
          waveDirection="top"
          bgColor="white"
        />
        <GeepComponent
          name="CBN Backward Integration Fund"
          logo="CBNIF LOGO"
          count={5}
          waveDirection="bottom"
          bgColor="white"
        />
        <GeepComponent
          name="Government Enterprise And Empowerment Programme"
          logo="GEEP LOGO"
          count={5}
          waveDirection="top"
          bgColor="primary.50"
        />
        <GeepComponent
          name="CBN Backward Integration Fund"
          logo="CBNIF LOGO"
          count={5}
          waveDirection="bottom"
          bgColor="primary.50"
        />
      </SimpleGrid>
    </Box>
  );
};

const NotificationCards = () => {
  return (
    <Box>
      <Heading size="md" mb="4">
        Notification Cards
      </Heading>
      <Grid gap="6" templateColumns="repeat(auto-fit, minmax(22.375rem, 1fr))">
        {NotificationData.map((item, index) => (
          <NotificationCard key={index} {...item} />
        ))}
      </Grid>
    </Box>
  );
};

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

const ModuleProgressCards = () => {
  return (
    <Box>
      <Heading size="md" mb="4">
        Module Progress Cards
      </Heading>
      <Grid gap="4" templateColumns="repeat(auto-fit, minmax(15.9375rem, 1fr))">
        {ALL_MODULES.map((item, index) => (
          <ModuleProgressCard
            key={index}
            number={index + 1}
            name={item.module}
            status={index > 1 ? 'Pending' : index === 1 ? 'In Progress' : 'Completed'}
          />
        ))}
      </Grid>
    </Box>
  );
};
