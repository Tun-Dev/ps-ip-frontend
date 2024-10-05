'use client';

import { useFieldArray, useForm } from 'react-hook-form';

import { OPTIONS } from '@/utils';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { Sortable } from './sortable';
import { SortableItem } from './sortable-item';

export type FormValues = {
  fields: { name: string; type: (typeof OPTIONS)[number]['value'] }[];
};

const defaultValues: FormValues = {
  fields: [
    { name: 'Full Name', type: 'Short answer' },
    { name: 'Gender', type: 'Dropdown' },
    { name: 'Date of Birth', type: 'Date' },
  ],
};

export function FormBuilder() {
  const { control, setValue, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ name: 'fields', control });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Sortable
      items={fields.map((item) => item.id)}
      setItems={(items) => {
        const updatedFields = items.map((item) => {
          const found = fields.find((field) => field.id === item);
          return { name: found?.name ?? 'New Question', type: found?.type ?? 'Short answer' };
        });
        setValue('fields', updatedFields);
      }}
    >
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="6" maxW="32rem">
        <Stack spacing="4">
          {fields.map((field, index) => (
            <SortableItem key={field.id} field={field} onDelete={() => remove(index)} />
          ))}
        </Stack>
        <ButtonGroup size="default" spacing="4">
          <Button
            type="button"
            variant="secondary"
            leftIcon={<MdAddCircle />}
            onClick={() => append({ name: 'New Question', type: 'Short answer' })}
            border="1px dashed"
            borderColor="grey.300"
            w="full"
          >
            Add New Question
          </Button>
          <Button type="submit" variant="primary" w="full">
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Sortable>
  );
}
