'use client';

import { Flex, Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { ModulesData } from '@/utils';
import { ModuleCard } from '@/components';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex h="100%" w="full">
      <Flex flex="1 1 0%" w="full">
        {/* <Flex>top part</Flex> */}
        <Flex w="full">{children}</Flex>
      </Flex>

      <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5">
        <Text variant="Body2Semibold" color="grey.400" mb="2">
          Modules
        </Text>
        <Stack spacing="3" minW="263px">
          {ModulesData.map((item, index) => (
            <ModuleCard key={index} {...item} />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default CreateProgramLayout;
