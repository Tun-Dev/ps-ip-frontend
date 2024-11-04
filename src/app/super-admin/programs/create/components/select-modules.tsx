'use client';

import { Box, BoxProps, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { ModuleCard } from '@/components';
import { useProgramStore } from '@/providers/programs-store-provider';

const SelectModules = (props: BoxProps) => {
  const modules = useProgramStore((state) => state.selectedModules);
  const setSelectedModules = useProgramStore((state) => state.setSelectedModules);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const setStep = useProgramStore((state) => state.setStep);

  return (
    <Box py="6" w="full" {...props}>
      <Heading variant="Body2Semibold" color="grey.500" mb="4">
        Selected Modules
      </Heading>
      {modules.length > 0 ? (
        <SimpleGrid columns={3} spacingX="12" spacingY="8">
          {modules.map((item, index) => (
            <ModuleCard
              key={item.id}
              module={item}
              number={index + 1}
              status="Edit"
              onClick={() => {
                setStep(2);
                setActiveModuleId(item.id);
              }}
              onRemove={() => setSelectedModules(modules.filter((module) => module.id !== item.id))}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text variant="Body2Semibold" textAlign="center">
          Please select modules from the right panel
        </Text>
      )}
    </Box>
  );
};

export default SelectModules;
