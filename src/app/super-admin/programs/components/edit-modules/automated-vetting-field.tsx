import { Box, Button, Flex, Grid, Icon, Input, SimpleGrid, Stack, Switch, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFieldArray, type FieldArrayWithId } from 'react-hook-form';
import { MdAddCircle, MdCancel, MdEdit, MdFileUpload, MdInfo, MdRadioButtonUnchecked } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Fragment } from 'react';

type Field = {
  name: string;
  value: number;
  status: string;
  isRequired: boolean;
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

  const {
    form: { control, register, watch },
  } = useProgramForm();
  const { fields, remove, append } = useFieldArray({ name: `vettingForm.automatedFields.${index}.options`, control });

  const fieldValue = watch(`vettingForm.automatedFields.${index}.value`);
  const optionWeights = watch(`vettingForm.automatedFields.${index}.options`) || [];

  const maxWeight = Math.max(...optionWeights.map((option) => Number(option.weight) || 0));
  const hasMismatch = Number(fieldValue) !== Number(maxWeight);

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
      <Flex justify="space-between" align={field.status === 'MULTIPLE_CHOICE' ? 'flex-start' : 'center'}>
        <Stack gap="4" maxW="35rem">
          <SimpleGrid columns={2} rowGap="4" columnGap="6">
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
                placeholder="Enter Question"
                {...register(`vettingForm.automatedFields.${index}.name`)}
              />
              <Icon as={MdEdit} aria-label={`Edit ${field.name}`} color="primary.500" boxSize="3" />
            </Flex>
            {field.status === 'MULTIPLE_CHOICE' ? (
              <Flex align="center" gap="2">
                <Text as="label" variant="Body2Semibold" color="primary.500" whiteSpace="nowrap">
                  Maximum Score
                </Text>
                <Input
                  type="number"
                  onWheel={(e) => e.currentTarget.blur()}
                  min={0}
                  step={5}
                  maxW="3rem"
                  flexShrink="0"
                  px="2"
                  py="1"
                  rounded="0.25rem"
                  size="sm"
                  color="grey.500"
                  {...register(`vettingForm.automatedFields.${index}.value`)}
                />
                {hasMismatch && (
                  <Flex align="center" gap="2">
                    <MdInfo color="var(--chakra-colors-red)" size="1rem" style={{ flexShrink: 0 }} />
                    <Text w="200px" variant="Body3Regular">
                      Score mismatch. Maximum score should be equal to the highest option score.
                    </Text>
                  </Flex>
                )}
              </Flex>
            ) : (
              <Flex align="center" gap="2.5" flexShrink="0">
                <Text as="label" variant="Body2Regular" color="grey.500" htmlFor={`${field.id}-is-compulsory`}>
                  Required{' '}
                  <Text as="span" color="red">
                    *
                  </Text>
                </Text>
                <Switch
                  id={`${field.id}-is-compulsory`}
                  {...register(`vettingForm.automatedFields.${index}.isRequired`)}
                />
              </Flex>
            )}
            {field.status === 'MULTIPLE_CHOICE' ? (
              fields.map((option, idx) => (
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
                      placeholder="Enter Option"
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
                      onWheel={(e) => e.currentTarget.blur()}
                      min={0}
                      step={5}
                      maxW="3rem"
                      flexShrink="0"
                      px="2"
                      py="1"
                      rounded="0.25rem"
                      size="sm"
                      color="grey.500"
                      {...register(`vettingForm.automatedFields.${index}.options.${idx}.weight`)}
                    />

                    <Button variant="cancel" gap="1" size="small" type="button" onClick={() => remove(idx)}>
                      <Icon as={MdCancel} boxSize="3" />
                      Delete
                    </Button>
                  </Flex>
                </Fragment>
              ))
            ) : (
              <Grid
                placeItems="center"
                rounded="full"
                border="1px dashed"
                borderColor="grey.300"
                boxSize="4.5rem"
                justifySelf="center"
              >
                <Icon as={MdFileUpload} color="primary.400" boxSize="2rem" />
              </Grid>
            )}
          </SimpleGrid>
          {field.status === 'MULTIPLE_CHOICE' && (
            <Button
              type="button"
              variant="tertiary"
              size="default"
              w="full"
              leftIcon={<MdAddCircle color="var(--chakra-colors-primary-600)" size="1.5rem" />}
              onClick={() => append({ label: '', value: '', weight: 0 })}
              border="1px dashed"
              borderColor="grey.300"
              py="0.5rem"
              color="grey.400"
            >
              Add New Option
            </Button>
          )}
        </Stack>
        <Flex gap="4" align="center">
          <Button variant="cancel" gap="1" size="small" type="button" onClick={onDelete}>
            <Icon as={MdCancel} boxSize="3" />
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
