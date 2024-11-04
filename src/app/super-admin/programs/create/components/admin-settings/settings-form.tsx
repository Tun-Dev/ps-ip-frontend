'use client';

import { useProgramForm } from '@/providers/form-provider';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';

type Props = {
  index: number;
  display?: string;
};

export function SettingsForm({ index, display }: Props) {
  const { control, register } = useProgramForm();
  const { fields } = useFieldArray({ name: `settings.${index}.fields`, control });

  return (
    <Stack display={display}>
      <CheckboxGroup>
        <Stack spacing="5" align="start">
          {fields.map((field, idx) => (
            <Checkbox key={field.id} {...register(`settings.${index}.fields.${idx}.value`)}>
              {field.label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
}
