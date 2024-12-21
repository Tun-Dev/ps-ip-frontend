'use client';

import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';

import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import type { Module } from '@/types';
import { useParams } from 'next/navigation';

type Props = {
  currentModule: Module;
};

export const SettingsForm = memo(({ currentModule }: Props) => {
  const [checkedGuidelines, setCheckedGuidelines] = useState<number[]>([]);

  const { setValue, getValues } = useProgramForm();
  const programModules = getValues('programModules');
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const moduleIndex = Array.from(selectedModuleIds.ids).indexOf(currentModule.id);

  const handleCheckboxChange = useCallback((id: number) => {
    setCheckedGuidelines((prev) => {
      const existing = prev.includes(id);
      if (!existing) return [...prev, id];
      return prev.filter((guidelineId) => guidelineId !== id);
    });
  }, []);

  const { programID } = useParams();
  const { response: program } = useGetProgramById(programID?.toString());

  useEffect(() => {
    if (!program) return;
    const foundModule = program.body.programModules.find((module) => module.module === currentModule.module);
    if (foundModule) setCheckedGuidelines(foundModule.moduleGuidelines.map((guideline) => guideline.id));
  }, [currentModule, program]);

  useEffect(() => {
    setValue(
      'programModules',
      programModules.map((module) =>
        module.moduleId === currentModule.id ? { ...module, guidelines: checkedGuidelines } : module
      )
    );
  }, [checkedGuidelines, currentModule, moduleIndex, programModules, setValue]);

  return (
    <Stack>
      <CheckboxGroup>
        <Stack spacing="5" align="start">
          {currentModule.ModuleGuidelines.map((guideline) => (
            <Checkbox
              key={guideline.id}
              isChecked={checkedGuidelines.includes(guideline.id)}
              onChange={() => handleCheckboxChange(guideline.id)}
            >
              {guideline.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
});

SettingsForm.displayName = 'SettingsForm';
