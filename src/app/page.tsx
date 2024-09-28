'use client';

import { Box, Container, Flex, Grid, GridItem, Heading, Select, Stack, Text } from '@chakra-ui/react';
import { MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft } from 'react-icons/md';

import { Dropdown } from '@/components';

import colors from '@/shared/chakra/colors';
import heading from '@/shared/chakra/components/heading';
import text from '@/shared/chakra/components/text';

import { ShortAnswerIcon } from '../../public/icons';

export default function Home() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Dropdowns />
          <Colors />
          <Texts />
          <Headings />
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
          <Select placeholder="Select...">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
      </Stack>
    </Box>
  );
};
