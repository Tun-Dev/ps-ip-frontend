'use client';

import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';

type Props = {
  moduleId: number;
};

export const SettingsForm = memo(({ moduleId }: Props) => {
  const [checkedGuidelines, setCheckedGuidelines] = useState<number[]>([]);
  const {
    form: { setValue, getValues },
  } = useProgramForm();
  const { data: modules } = useGetModules();
  const programModules = getValues('programModules');
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const moduleIndex = Array.from(selectedModuleIds.ids).indexOf(moduleId);
  const currentModule = useMemo(() => modules?.body.find((module) => module.id === moduleId), [moduleId, modules]);

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
    if (!program || !currentModule) return;
    const foundModule = program.body.programModules.find((module) => module.module === currentModule.name);
    if (foundModule) setCheckedGuidelines(foundModule.moduleGuidelines.map((guideline) => guideline.id));
  }, [currentModule, program]);

  useEffect(() => {
    setValue(
      'programModules',
      programModules.map((module) =>
        module.moduleId === moduleId ? { ...module, guidelines: checkedGuidelines } : module
      )
    );
  }, [checkedGuidelines, moduleId, moduleIndex, programModules, setValue]);

  return (
    <Stack>
      <CheckboxGroup>
        <Stack spacing="5" align="start">
          {currentModule?.moduleGuidelines.map((guideline) => (
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
