import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { ModuleCard } from '@/shared/chakra/components';
import { Module } from '@/types';
import { renameKey } from '@/utils';
import { Box, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const EDITABLE_MODULES = ['Application', 'Enumeration', 'Vetting', 'Survey'];

export function ModulesList() {
  const step = useProgramStore((state) => state.step);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const setSelectedModuleIds = useProgramStore((state) => state.setSelectedModules);

  const { getValues, setValue } = useProgramForm();

  const { data: modules, isLoading } = useGetModules();

  const programModules = useMemo(() => {
    if (!modules) return [];
    if (step === 1) return modules.body;
    return Array.from(selectedModuleIds.ids).map((id) => modules.body.find((module) => module.id === id)) ?? [];
  }, [modules, selectedModuleIds, step]);

  const handleModuleClick = (module: Module, isSelected: boolean) => {
    if (step !== 1) setActiveModuleId(module.id);
    else if (!isSelected) {
      setSelectedModuleIds({ ids: new Set(selectedModuleIds.ids.add(module.id)) });

      const newModule = { moduleId: module.id, order: 0, isBase: false, guidelines: [] };
      setValue('programModules', [...getValues('programModules'), newModule]);
    }
  };

  const isDisabled = (module: Module) =>
    (step === 2 && !EDITABLE_MODULES.includes(module.module)) ||
    (step === 3 && module.ModuleGuidelines.length < 1) ||
    (step === 3 && module.module === 'Vetting');

  return (
    <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5">
      <Text variant="Body2Semibold" color="grey.400" mb="2">
        Modules
      </Text>
      <Stack spacing="3" minW="263px">
        {isLoading
          ? Array.from({ length: 5 }, (_, index) => <Skeleton key={index} h="156px" borderRadius="16px" />)
          : programModules.map((module, index) => {
              if (!module) return null;
              const isSelected = selectedModuleIds.ids.has(module.id);
              const correctedModule = renameKey(module, 'name', 'module');
              return (
                <ModuleCard
                  key={module.id}
                  module={correctedModule}
                  number={index + 1}
                  status={step !== 1 ? 'Edit' : isSelected ? 'Selected' : 'Select'}
                  isActive={step === 1 ? undefined : activeModuleId === correctedModule.id}
                  disabled={isDisabled(correctedModule)}
                  onClick={() => handleModuleClick(module, isSelected)}
                />
              );
            })}
      </Stack>
    </Box>
  );
}
