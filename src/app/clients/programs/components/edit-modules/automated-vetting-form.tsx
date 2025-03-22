import { Box, Button, Flex, Input, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AutomatedVettingField } from './automated-vetting-field';

type Item = {
  name: string;
  value: number;
  status: string;
  options: { label: string; value: string; weight: number }[];
};

const AutomatedVettingForm = memo(({ display }: { display: string }) => {
  const toast = useToast();
  const {
    form: { control, register },
  } = useProgramForm();
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
            <Input maxW="5rem" size="sm" {...register('vettingForm.totalScore')} type="number" min={0} step={10} />
          </Flex>
          <Flex align="center" gap="4">
            <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
              Pass Score:
            </Text>
            <Input maxW="5rem" size="sm" {...register('vettingForm.passScore')} type="number" min={0} step={10} />
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
        sortingStrategy={verticalListSortingStrategy}
        modifiers={[restrictToVerticalAxis]}
      >
        <Stack spacing="8">
          <Stack spacing="0">
            {fields.map((field, idx) => (
              <AutomatedVettingField key={field.id} field={field} onDelete={() => remove(idx)} index={idx} />
            ))}
          </Stack>
          <SimpleGrid columns={2} gap="6">
            <Button
              type="button"
              variant="tertiary"
              size="default"
              leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
              onClick={() => {
                if (remainderScore <= 0)
                  return toast({
                    status: 'error',
                    title: 'Error',
                    description: 'Increase total score to add more questions',
                  });
                append({
                  name: 'New Question',
                  value: 20,
                  status: 'MULTIPLE_CHOICE',
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
                });
              }}
              border="1px dashed"
              borderColor="grey.300"
              py="1rem"
              color="grey.400"
              w="full"
            >
              Add New Question
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="default"
              leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
              onClick={() => append({ name: 'Upload File', status: 'FILE_UPLOAD', value: 0, options: [] })}
              border="1px dashed"
              borderColor="grey.300"
              py="1rem"
              color="grey.400"
              w="full"
            >
              Add File Upload
            </Button>
          </SimpleGrid>
        </Stack>
      </Sortable>
    </Box>
  );
});

AutomatedVettingForm.displayName = 'AutomatedVettingForm';

export default AutomatedVettingForm;
