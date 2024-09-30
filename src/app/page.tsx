"use client";

import { Box, ChakraProvider, Container, Flex, Grid, GridItem, Heading, Stack, Text, Input } from "@chakra-ui/react";
import colors from "@/shared/chakra/colors";
import typography from "@/shared/chakra/typography";
import theme from './inputTheme'


export default function Home() {
  return (   
    <ChakraProvider theme={theme}> 
      <Box as="main">
        <Container maxW="container.xl" minH="100dvh" py="4">
          <Stack spacing="10">
            <Colors />
            <Typography />
            <Input variant="searchFieldSmall" placeholder="search" />
            <Input variant="textField" placeholder="Date" />
            <Input variant="textFieldLarge" placeholder="Beneficiary address" />
            <Input variant="userNameField" placeholder="input username" />
            <Input variant="newTextField" placeholder="Another field" />
            <Input variant="smallTextField" placeholder="Time" />            
          </Stack>
        </Container>
      </Box>
      </ChakraProvider>  
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
          if (typeof value === "string") return <Color key={label} label={label} value={value} />;
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


const Typography = () => {
  return (
    <Box>
      <Heading size="md" mb="4">
        Typography
      </Heading>
      <Stack gap="6">
        {Object.keys(typography.textStyles).map(style => (
          <Text key={style} textStyle={style}>
            ({style}) The quick brown fox jumps over the lazy dog
          </Text>
        ))}    
      </Stack>
    </Box>
  );
};
