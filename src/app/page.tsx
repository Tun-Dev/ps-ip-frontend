"use client";

import { Box, Container, Flex, Grid, GridItem, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { MdArrowDropDown, MdCloudUpload, MdDateRange, MdFormatAlignLeft } from "react-icons/md";

import { Dropdown } from "@/components";
import colors from "@/shared/chakra/colors";
import typography from "@/shared/chakra/typography";
import type { DropdownOption } from "@/types";

import { ShortAnswerIcon } from "../../public/icons";

export default function Home() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Dropdowns />
          <Colors />
          <Typography />
        </Stack>
      </Container>
    </Box>
  );
}

const Colors = () => {
  return (
    <Box>
      <Heading size="md" mb="4">
        Colors
      </Heading>
      <Grid gap="6" templateColumns="repeat(auto-fit, minmax(12.5rem, 1fr))">
        {Object.entries(colors).map(([label, value]) => {
          if (typeof value === "string")
            return <Color key={label} label={label} value={value} />;
          return Object.entries(value).map(([nestedLabel, nestedValue]) => (
            <Color
              key={`${label} ${nestedLabel}`}
              label={`${label} ${nestedLabel}`}
              value={nestedValue}
            />
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

const Typography = () => {
  return (
    <Box>
      <Heading size="md" mb="4">
        Typography
      </Heading>
      <Stack gap="6">
        {typography.variants &&
          Object.keys(typography.variants).map((style) => (
            <Text key={style} variant={style}>
              ({style}) The quick brown fox jumps over the lazy dog
            </Text>
          ))}
      </Stack>
    </Box>
  );
};

const Dropdowns = () => {
  const options: readonly DropdownOption[] = [
    { label: "Short answer", value: "Short answer", icon: ShortAnswerIcon },
    { label: "Paragraph", value: "Paragraph", icon: MdFormatAlignLeft },
    { label: "Dropdown", value: "Dropdown", icon: MdArrowDropDown },
    { label: "Date", value: "Date", icon: MdCloudUpload },
    { label: "File upload", value: "File upload", icon: MdDateRange },
  ];

  return (
    <Box maxW="sm">
      <Heading size="md" mb="4">
        Dropdowns
      </Heading>
      <Stack gap="6">
        <Box>
          <Heading size="sm" mb="2">
            React Select
          </Heading>
          <Dropdown options={options} />
        </Box>
        <Box>
          <Heading size="sm" mb="2">
            Chakra Select
          </Heading>
          <Select placeholder="Select..." _placeholder={{ color: "red" }}>
            {options.map(option => (
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
