import { Box, Button, Stack } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { Sortable } from '@/components/form-builder/sortable';
import { SortableItem } from '@/components/form-builder/sortable-item';
import { useProgramForm } from '@/providers/form-provider';
import { Option } from '@/utils';

type FormBuilderProps = {
  index: number;
  display?: string;
};

const FormBuilder = ({ index, display }: FormBuilderProps) => {
  const { control, register, getValues } = useProgramForm();
  const { fields, remove, append, update, replace } = useFieldArray({
    name: `editModules.builderForm.${index}.fields`,
    control,
  });

  const handleDropdown = (idx: number, type: Option['value']) => {
    const field = fields.at(idx);
    if (field) update(idx, { name: getValues(`editModules.builderForm.${index}.fields.${idx}.name`), type });
  };

  return (
    <Box display={display}>
      <Sortable
        id={`form-builder-${index}`}
        items={fields.map((item) => item.id)}
        setItems={(items) => {
          const updatedFields = items.reduce<{ name: string; type: Option['value'] }[]>((acc, item) => {
            const field = fields.find((field) => field.id === item);
            if (field) acc.push({ name: field.name, type: field.type as Option['value'] });
            return acc;
          }, []);
          replace(updatedFields);
        }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            {fields.map((field, idx) => (
              <SortableItem
                key={field.id}
                field={field}
                inputProps={register(`editModules.builderForm.${index}.fields.${idx}.name`)}
                onChange={(type) => handleDropdown(idx, type)}
                onDelete={() => remove(idx)}
              />
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
      </Sortable>
    </Box>
  );
};

export default FormBuilder;
