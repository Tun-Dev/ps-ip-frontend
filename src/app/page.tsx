import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

import colors from "@/shared/chakra/colors";
import typography from "@/shared/chakra/typography";
import { MdAddCircle } from "react-icons/md";

export default function Home() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Colors />
          <Typography />
          <Buttons />
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
        {Object.keys(typography.textStyles).map((style) => (
          <Text key={style} textStyle={style}>
            ({style}) The quick brown fox jumps over the lazy dog
          </Text>
        ))}
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
