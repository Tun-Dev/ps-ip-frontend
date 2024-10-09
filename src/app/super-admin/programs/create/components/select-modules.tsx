'use client';

import { Box, Button, Heading, SimpleGrid, Stack, StackProps } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';

const SelectModules = (props: StackProps) => {
  const [modules, setModules] = useState(ModulesData);
  return (
    <Stack py="6" w="full" spacing="8.75rem" {...props}>
      <Box>
        <Heading variant="Body2Semibold" color="grey.500" mb="4">
          Selected Modules
        </Heading>
        <SimpleGrid columns={3} spacingX="12" spacingY="8">
          {modules.map((item, index) => (
            <ModuleCard
              key={item.id}
              {...item}
              id={index + 1}
              isDisabled={false}
              status="Edit"
              onRemove={() => setModules((prev) => prev.filter((module) => module.id !== item.id))}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Button
        as={Link}
        href="/super-admin/programs/create?step=2"
        variant="primary"
        size="default"
        alignSelf="end"
        w="full"
        maxW="15.125rem"
      >
        Next
      </Button>
    </Stack>
  );
};

export default SelectModules;
