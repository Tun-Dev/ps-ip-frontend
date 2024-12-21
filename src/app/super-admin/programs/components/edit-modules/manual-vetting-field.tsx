import { Box, Button, Flex, Grid, Icon, Input, Stack } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { useFieldArray, type FieldArrayWithId, type UseFormRegisterReturn } from 'react-hook-form';
import { MdAddCircle, MdEdit, MdPerson } from 'react-icons/md';

import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { useProgramForm } from '@/providers/form-provider';
import { Dropdown } from '@/shared/chakra/components';
import type { DropdownOption } from '@/types';
import { getDropdownIcon, getDropdownName } from '@/utils';

type Field = {
  name: string;
  status: string;
  value: number;
  options: { value: string; label: string }[];
};

type Props = {
  field: FieldArrayWithId<{ fields: Field[] }, 'fields', 'id'>;
  onDelete: () => void;
  onChange: (value: DropdownOption) => void;
  inputProps: UseFormRegisterReturn<`vettingForm.manualFields.${number}.name`>;
  index: number;
};

export function ManualVettingField({ field, inputProps, onDelete, onChange, index }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
    id: field.id,
  });

  const { control, register } = useProgramForm();
  const { fields, remove, append } = useFieldArray({ name: `vettingForm.manualFields.${index}.options`, control });

  const { data: questionTypes, isLoading } = useGetQuestionTypes();

  const options = useMemo(() => {
    if (!questionTypes) return [];
    return questionTypes.body.map((type) => ({
      label: getDropdownName(type.status),
      value: type.value,
      status: type.status,
      icon: getDropdownIcon(type.status),
    }));
  }, [questionTypes]);

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      tabIndex={undefined}
      cursor="auto"
    >
      <Grid alignItems="end" gap="3" gridTemplateColumns={field.status === 'LONG_TEXT' ? '1fr auto' : '13.5rem auto'}>
        <Stack align="flex-start" spacing="2" flex="1">
          <Flex align="center" gap="2">
            <Input
              px="2"
              py="1"
              boxSize="auto"
              border="1px dashed"
              borderColor="grey.300"
              borderRadius="0.25rem"
              fontSize="13px"
              fontWeight="semibold"
              lineHeight="20px"
              {...inputProps}
            />
            <Icon as={MdEdit} aria-label={`Edit ${field.name}`} color="primary.500" boxSize="3" />
          </Flex>
          {field.status === 'UPLOAD' ? (
            <Flex maxW="6.8125rem" justify="center" w="full">
              <Grid
                placeItems="center"
                boxSize="3.6875rem"
                rounded="full"
                border="1px dashed"
                borderColor="grey.300"
                color="primary.400"
              >
                <MdPerson size="2rem" />
              </Grid>
            </Flex>
          ) : (
            <Input placeholder={field.name} border="1px dashed" borderColor="grey.300" isReadOnly />
          )}
        </Stack>
        <Flex alignItems="center" gap="4">
          <Box maxW="12rem" flex="1">
            <Dropdown
              options={options}
              value={options.find((opt) => opt.value === field.value)}
              onChange={(value) => value && onChange({ ...value, options: [] })}
              variant="whiteDropdown"
              isDisabled={isLoading}
            />
          </Box>
          <Button variant="cancel" size="medium" type="button" onClick={onDelete}>
            Delete
          </Button>
          <Grid
            ref={setActivatorNodeRef}
            {...listeners}
            as="button"
            type="button"
            cursor="grab"
            gridTemplateColumns="auto auto"
            gap="1"
            outlineColor="transparent"
            _focus={{ boxShadow: 'outline' }}
            style={{ touchAction: 'none' }}
          >
            {Array.from(Array(6).keys()).map((index) => (
              <Box key={index} bg="primary.400" boxSize="1" />
            ))}
          </Grid>
        </Flex>
      </Grid>
      {(field.status === 'DROPDOWN' || field.status === 'MULTIPLE_CHOICE' || field.status === 'CHECKBOX') && (
        <Stack spacing="3" mt="3">
          {fields.map((optionField, idx) => (
            <Flex key={optionField.id} gap="3" align="center">
              <Input
                placeholder={`${String.fromCharCode(65 + idx)}. Option ${String.fromCharCode(65 + idx)}`}
                border="1px dashed"
                borderColor="grey.300"
                w="fit-content"
                {...register(`vettingForm.manualFields.${index}.options.${idx}.label`)}
              />
              <Button variant="cancel" size="medium" type="button" onClick={() => remove(idx)}>
                Delete
              </Button>
            </Flex>
          ))}
          <Button
            type="button"
            variant="tertiary"
            size="default"
            leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
            onClick={() => append({ label: '', value: '' })}
            border="1px dashed"
            borderColor="grey.300"
            p="0.5rem 0.75rem"
            color="grey.400"
          >
            Add Entry
          </Button>
        </Stack>
      )}
    </Box>
  );
}
