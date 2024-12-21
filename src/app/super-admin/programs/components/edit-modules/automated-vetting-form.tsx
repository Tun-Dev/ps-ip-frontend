import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable';
import { AutomatedVettingField } from './automated-vetting-field';

type Item = {
  name: string;
  value: number;
  options: { label: string; value: string; weight: number }[];
};

const AutomatedVettingForm = memo(({ display }: { display: string }) => {
  const { control, register } = useProgramForm();
  const { fields, remove, append, replace } = useFieldArray({ name: 'vettingForm.automatedFields', control });
  const totalScore = useWatch({ control, name: 'vettingForm.totalScore' });
  const vettingFields = useWatch({ control, name: 'vettingForm.automatedFields' });

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
            <Input maxW="5rem" size="sm" {...register('vettingForm.totalScore')} type="number" min={50} step={50} />
          </Flex>
          <Flex align="center" gap="4">
            <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
              Pass Score:
            </Text>
            <Input maxW="5rem" size="sm" {...register('vettingForm.passScore')} type="number" min={50} step={50} />
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
        id="automated-vetting-form"
        items={fields.map((item) => item.id)}
        setItems={(items) => {
          const updatedFields = items.reduce<Item[]>((acc, item) => {
            const fieldIndex = fields.findIndex((field) => field.id === item);
            const field = vettingFields[fieldIndex];
            if (field) acc.push(field);
            return acc;
          }, []);
          replace(updatedFields);
        }}
      >
        <Stack spacing="8">
          <Stack spacing="0">
            {fields.map((field, idx) => (
              <AutomatedVettingField key={field.id} field={field} onDelete={() => remove(idx)} index={idx} />
            ))}
          </Stack>
          <Button
            type="button"
            variant="tertiary"
            size="default"
            leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
            onClick={() =>
              append({
                name: 'New Question',
                value: 50,
                options: [
                  {
                    label: 'Option 1',
                    value: 'Option 1',
                    weight: 20,
                  },
                  {
                    label: 'Option 2',
                    value: 'Option 2',
                    weight: 15,
                  },
                  {
                    label: 'Option 3',
                    value: 'Option 3',
                    weight: 10,
                  },
                  {
                    label: 'Option 4',
                    value: 'Option 4',
                    weight: 5,
                  },
                ],
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

AutomatedVettingForm.displayName = 'AutomatedVettingForm';

export default AutomatedVettingForm;
