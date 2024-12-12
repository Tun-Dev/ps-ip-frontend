'use client';

import { Box, BoxProps, Heading, SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { ModuleCard } from '@/shared/chakra/components';

const SelectModules = memo((props: BoxProps) => {
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const setSelectedModuleIds = useProgramStore((state) => state.setSelectedModules);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const setStep = useProgramStore((state) => state.setStep);

  const { getValues, setValue } = useProgramForm();

  const { data: modules } = useGetModules();

  const handleRemove = (moduleId: number) => {
    const updatedSelectedModuleIds = new Set(selectedModuleIds.ids);
    updatedSelectedModuleIds.delete(moduleId);
    setSelectedModuleIds({ ids: updatedSelectedModuleIds });

    const programModules = getValues('programModules');
    const filteredModules = programModules.filter((md) => md.moduleId !== moduleId);
    setValue('programModules', filteredModules);
  };

  return (
    <Box py="6" w="full" {...props}>
      <Heading variant="Body2Semibold" color="grey.500" mb="4">
        Selected Modules
      </Heading>
      <SimpleGrid columns={3} spacingX="12" spacingY="8">
        {Array.from(selectedModuleIds.ids).map((moduleId, index) => {
          const moduleData = modules?.body.find((module) => module.id === moduleId);
          if (!moduleData) return null;
          return (
            <ModuleCard
              key={moduleId}
              module={moduleData}
              number={index + 1}
              status="Edit"
              onClick={() => {
                setStep(2);
                setActiveModuleId(moduleId);
              }}
              onRemove={() => handleRemove(moduleId)}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
});

SelectModules.displayName = 'SelectModules';

export default SelectModules;
