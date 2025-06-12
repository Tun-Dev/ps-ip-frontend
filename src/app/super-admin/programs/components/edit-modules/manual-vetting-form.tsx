import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ManualVettingField } from './manual-vetting-field';

type Item = {
  name: string;
  status: string;
  value: number;
  isRequired: boolean;
  options: { label: string; value: string }[];
};

const ManualVettingForm = memo(({ display }: { display: string }) => {
  const {
    form: { control, register, getValues },
  } = useProgramForm();
  const { fields, remove, append, update, replace } = useFieldArray({ name: 'vettingForm.manualFields', control });

  const handleDropdown = (idx: number, status: string) => {
    update(idx, {
      name: getValues(`vettingForm.manualFields.${idx}.name`),
      value: getValues(`vettingForm.manualFields.${idx}.value`),
      isRequired: getValues(`vettingForm.manualFields.${idx}.isRequired`),
      status: status,
      options: [],
    });
  };

  const totalScore = useWatch({ control, name: 'vettingForm.manualTotalScore' });
  const vettingFields = useWatch({ control, name: 'vettingForm.manualFields' });

  const remainderScore = useMemo(() => {
    const usedScore = vettingFields.reduce((acc, field) => acc + Number(field.value), 0);
    return totalScore - usedScore;
  }, [vettingFields, totalScore]);

  return (
    <Box display={display}>
      <Flex align="center" justify="space-between" mb="8">
        <Stack spacing="4">
          <Flex align="center" gap="4">
            <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
              Total Score:
            </Text>
            <Input
              maxW="5rem"
              size="sm"
              {...register('vettingForm.manualTotalScore')}
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              min={0}
              step={10}
            />
          </Flex>
          <Flex align="center" gap="4">
            <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
              Pass Score:
            </Text>
            <Input
              maxW="5rem"
              size="sm"
              {...register('vettingForm.manualPassScore')}
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              min={0}
              step={10}
            />
          </Flex>
        </Stack>
        <Flex align="center" gap="4">
          <Text variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
            Remainder Score:
          </Text>
          <Text variant="Header1Bold" whiteSpace="nowrap">
            {remainderScore}
          </Text>
        </Flex>
      </Flex>
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
            onClick={() =>
              append({
                name: '',
                value: 0,
                status: 'SHORT_TEXT',
                isRequired: true,
                options: [],
                placeholder: 'New Question',
              })
            }
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
