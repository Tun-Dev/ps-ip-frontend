import { Box, Button, Stack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable';
import type { DropdownOption } from '@/types';
import { ManualVettingField } from './manual-vetting-field';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';

type Item = {
  name: string;
  status: string;
  value: number;
  options: { label: string; value: string }[];
};

const ManualVettingForm = memo(({ display }: { display: string }) => {
  const { control, register, getValues } = useProgramForm();
  const { fields, remove, append, update, replace } = useFieldArray({ name: 'vettingForm.manualFields', control });

  const handleDropdown = (idx: number, value: DropdownOption) => {
    update(idx, {
      name: getValues(`vettingForm.manualFields.${idx}.name`),
      status: value.status,
      value: value.value,
      options: value.options,
    });
  };

  return (
    <Box display={display}>
      <Sortable
        id="manual-vetting-form"
        items={fields.map((item) => item.id)}
        setItems={(items) => {
          const updatedFields = items.reduce<Item[]>((acc, item) => {
            const fieldIndex = fields.findIndex((field) => field.id === item);
            const field = getValues('vettingForm.manualFields')[fieldIndex];
            if (field) acc.push(field);
            return acc;
          }, []);
          replace(updatedFields);
        }}
        sortingStrategy={verticalListSortingStrategy}
        modifiers={[restrictToVerticalAxis]}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            {fields.map((field, idx) => (
              <ManualVettingField
                key={field.id}
                field={field}
                inputProps={register(`vettingForm.manualFields.${idx}.name`)}
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

ManualVettingForm.displayName = 'ManualVettingForm';

export default ManualVettingForm;
