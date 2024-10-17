'use client';

import { Button, Stack, StackProps } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { Sortable } from '@/components/form-builder/sortable';
import { SortableItem } from '@/components/form-builder/sortable-item';
import { Option } from '@/utils';

export type FormValues = {
  fields: { name: string; type: Option['value'] }[];
};

const defaultValues: FormValues = {
  fields: [
    { name: 'Full Name', type: 'Short answer' },
    { name: 'Upload Picture', type: 'File upload' },
    { name: 'Date of Birth', type: 'Date' },
    { name: 'Gender', type: 'Dropdown' },
    { name: 'Phone Number', type: 'Short answer' },
    { name: 'National Identity Number', type: 'Short answer' },
    { name: 'Local Government Area', type: 'Dropdown' },
    { name: 'Email', type: 'Short answer' },
    { name: 'Address', type: 'Paragraph' },
  ],
};

export function ApplicationForm(props: StackProps) {
  const { control, setValue, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ name: 'fields', control });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleDropdown = (fieldId: string, type: Option['value']) => {
    const updated = fields.map((field) => {
      if (field.id === fieldId) return { name: field.name, type };
      return { name: field.name, type: field.type };
    });
    setValue('fields', updated);
  };

  return (
    <Sortable
      key="applicationForm"
      items={fields.map((item) => item.id)}
      setItems={(items) => {
        const updatedFields = items.map((item) => {
          const found = fields.find((field) => field.id === item);
          return { name: found?.name ?? 'New Question', type: found?.type ?? 'Short answer' };
        });
        setValue('fields', updatedFields);
      }}
    >
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
        <Stack spacing="8">
          <Stack spacing="6">
            {fields.map((field, index) => (
              <SortableItem key={field.id} field={field} onChange={handleDropdown} onDelete={() => remove(index)} />
            ))}
          </Stack>
          <Button
            type="button"
            variant="tertiary"
            size="default"
            leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
            onClick={() => append({ name: 'New Question', type: 'Short answer' })}
            border="1px dashed"
            borderColor="grey.300"
            py="1rem"
            color="grey.400"
            w="full"
          >
            Add New Question
          </Button>
        </Stack>
      </Stack>
    </Sortable>
  );
}
