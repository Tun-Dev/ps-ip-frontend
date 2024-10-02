'use client';
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Select, Stack, Text } from '@chakra-ui/react';
import { MdAddCircle, MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft } from 'react-icons/md';

import { Dropdown, ModuleCard } from '@/components';

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
          <Buttons />

          <ModuleCardSection />

          <GeepComponents />

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


const ModuleCardSection = () => {
  return (
    <Box maxW="16.375rem">
      <Heading mb="4">Module Card</Heading>
      <ModuleCard text="Applications" number={300000} image="/images/undraw-my-app.svg" />

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
