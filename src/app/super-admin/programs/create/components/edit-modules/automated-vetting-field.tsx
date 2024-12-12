import { Box, Button, Flex, Grid, Icon, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFieldArray, type FieldArrayWithId } from 'react-hook-form';
import { MdEdit, MdRadioButtonUnchecked } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Fragment } from 'react';

type Field = {
  name: string;
  value: number;
  options: { label: string; value: string; weight: number }[];
};

type Props = {
  field: FieldArrayWithId<{ fields: Field[] }, 'fields', 'id'>;
  onDelete: () => void;
  index: number;
};

export function AutomatedVettingField({ field, onDelete, index }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
    id: field.id,
  });

  const { control, register } = useProgramForm();
  const { fields } = useFieldArray({ name: `vettingForm.automatedFields.${index}.options`, control });

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      tabIndex={undefined}
      cursor="auto"
      py="5"
      _first={{ borderTop: '1px solid', borderColor: 'grey.200' }}
      borderBottom="1px solid"
      borderColor="grey.200"
    >
      <Flex justify="space-between" align="flex-start">
        <SimpleGrid columns={2} rowGap="4" columnGap="6" maxW="27rem">
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
              {...register(`vettingForm.automatedFields.${index}.name`)}
            />
            <Icon as={MdEdit} aria-label={`Edit ${field.name}`} color="primary.500" boxSize="3" />
          </Flex>
          <Flex align="center" gap="2">
            <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
              Attach Vetting Score
            </Text>
            <Input
              type="number"
              min={50}
              step={50}
              minW="3rem"
              size="sm"
              color="grey.500"
              {...register(`vettingForm.automatedFields.${index}.value`)}
            />
          </Flex>
          {fields.map((option, idx) => (
            <Fragment key={option.id}>
              <Flex align="center" gap="2">
                <MdRadioButtonUnchecked
                  size="1.25rem"
                  color="var(--chakra-colors-grey-500)"
                  style={{ flexShrink: 0 }}
                />
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
                  {...register(`vettingForm.automatedFields.${index}.options.${idx}.label`)}
                />
                <Icon as={MdEdit} aria-label={`Edit ${field.name}`} color="primary.500" boxSize="3" />
              </Flex>
              <Flex align="center" gap="2">
                <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
                  Attach Vetting Score
                </Text>
                <Input
                  type="number"
                  min={5}
                  step={5}
                  minW="3rem"
                  size="sm"
                  color="grey.500"
                  {...register(`vettingForm.automatedFields.${index}.options.${idx}.weight`)}
                />
              </Flex>
            </Fragment>
          ))}
        </SimpleGrid>
        <Flex gap="4" align="center">
          <Button variant="cancel" size="small" type="button" onClick={onDelete}>
            Delete
          </Button>
          <Grid
            ref={setActivatorNodeRef}
            {...listeners}
            as="button"
            type="button"
            cursor="grab"
            gridTemplateColumns="auto auto"
            gap="0.25rem"
            outlineColor="transparent"
            _focus={{ boxShadow: 'outline' }}
            style={{ touchAction: 'none' }}
          >
            {Array.from(Array(6).keys()).map((index) => (
              <Box key={index} bg="primary.400" boxSize="0.25rem" />
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
}
