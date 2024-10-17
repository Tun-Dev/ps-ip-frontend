'use client';

import { Checkbox, CheckboxGroup, Stack, StackProps } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';

const defaultValues = {
  fields: [
    { label: 'Full Name', value: false },
    { label: 'Upload Picture', value: false },
    { label: 'Date of Birth', value: false },
    { label: 'Gender', value: false },
    { label: 'Phone Number', value: false },
    { label: 'National Identity Number', value: false },
    { label: 'Local Government Area', value: false },
    { label: 'Email', value: false },
    { label: 'Address', value: false },
  ],
};

type FormValues = typeof defaultValues;

export function VettingForm(props: StackProps) {
  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields } = useFieldArray({ name: 'fields', control });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <CheckboxGroup>
        <Stack spacing="5" align="start">
          {fields.map((field, index) => (
            <Checkbox key={field.id} {...register(`fields.${index}.value`)}>
              {field.label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
}
