import { Box, Button, Stack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable';
import type { DropdownOption } from '@/types';
import { SurveyFormField } from './survey-form-field';

type Item = {
  name: string;
  status: string;
  value: number;
  options: { label: string; value: string }[];
};

const SurveyForm = memo(() => {
  const { control, register, getValues } = useProgramForm();
  const { fields, remove, append, update, replace } = useFieldArray({ name: 'surveyForm.fields', control });

  const handleDropdown = (idx: number, value: DropdownOption) => {
    const updatedValue = {
      name: getValues(`surveyForm.fields.${idx}.name`),
      status: value.status,
      value: value.value,
      options: value.options,
    };
    update(idx, updatedValue);
  };

  return (
    <Box>
      <Sortable
        id="survey-form"
        items={fields.map((item) => item.id)}
        setItems={(items) => {
          const updatedFields = items.reduce<Item[]>((acc, item) => {
            const fieldIndex = fields.findIndex((field) => field.id === item);
            const field = getValues('surveyForm.fields')[fieldIndex];
            if (field) acc.push(field);
            return acc;
          }, []);
          replace(updatedFields);
        }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            {fields.map((field, idx) => (
              <SurveyFormField
                key={field.id}
                field={field}
                inputProps={register(`surveyForm.fields.${idx}.name`)}
                onChange={(type) => handleDropdown(idx, type)}
                onDelete={() => remove(idx)}
                index={idx}
              />
            ))}
          </Stack>
          <Button
            type="button"
            variant="tertiary"
            size="default"
            leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
            onClick={() => append({ name: 'New Question', value: 1, status: 'SHORT_TEXT', options: [] })}
            border="1px dashed"
            borderColor="grey.300"
            py="1rem"
            color="grey.400"
            w="full"
          >
            Add New Question
          </Button>
        </Stack>
      </Sortable>
    </Box>
  );
});

SurveyForm.displayName = 'FormBuilder';

export default SurveyForm;
