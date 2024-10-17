'use client';

import { Checkbox, CheckboxGroup, Stack, type StackProps } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

type FormValues = {
  settings: { label: string; value: boolean }[];
};

type Props = {
  defaultValues: FormValues;
} & StackProps;

export function SettingsForm({ defaultValues, ...props }: Props) {
  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields } = useFieldArray({ name: 'settings', control });
  const router = useRouter();

  const onSubmit = (values: FormValues) => {
    console.log(values);
    router.push('/super-admin/programs/create?step=4');
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <CheckboxGroup>
        <Stack spacing="5" align="start">
          {fields.map((field, index) => (
            <Checkbox key={field.id} {...register(`settings.${index}.value`)}>
              {field.label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
}
