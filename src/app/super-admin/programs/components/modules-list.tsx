import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { ModuleCard } from '@/shared/chakra/components';
import { Module } from '@/types';
import { renameKey } from '@/utils';
import { Box, type BoxProps, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const EDITABLE_MODULES = ['Application', 'Enumeration', 'Vetting', 'Survey', 'Nomination'];

export function ModulesList(props: BoxProps) {
  const step = useProgramStore((state) => state.step);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const setSelectedModuleIds = useProgramStore((state) => state.setSelectedModules);

  const {
    form: { getValues, setValue },
  } = useProgramForm();

  const { data: modules, isLoading } = useGetModules();

  const programModules = useMemo(() => {
    if (!modules) return [];
    if (step === 2) return modules.body;
    return Array.from(selectedModuleIds.ids).map((id) => modules.body.find((module) => module.id === id)) ?? [];
  }, [modules, selectedModuleIds, step]);

  const handleModuleClick = (module: Module, isSelected: boolean) => {
    if (step !== 2) return setActiveModuleId(module.id);
    if (isSelected) return;
    const isVetting = module.name === 'Vetting';
    const manualGuideline = module.moduleGuidelines.find((guideline) => guideline.identifier === 'MANUAL');

    setSelectedModuleIds({ ids: new Set(selectedModuleIds.ids).add(module.id) });
    const newModule = {
      moduleId: module.id,
      order: 0,
      isBase: false,
      guidelines: isVetting && manualGuideline ? [manualGuideline.id] : [],
    };
    setValue('programModules', [...getValues('programModules'), newModule]);
  };

  const isDisabled = (module: Module) =>
    (step === 3 && !EDITABLE_MODULES.includes(module.module)) ||
    (step === 4 && module.moduleGuidelines.length < 1) ||
    (step === 4 && module.module === 'Vetting');

  return (
    <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5" {...props}>
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
                  status={step !== 2 ? 'Edit' : isSelected ? 'Selected' : 'Select'}
                  isActive={step === 2 ? undefined : activeModuleId === correctedModule.id}
                  disabled={isDisabled(correctedModule)}
                  onClick={() => handleModuleClick(module, isSelected)}
                />
              );
            })}
      </Stack>
    </Box>
  );
}
