import { Box, Button, Flex, Grid, Icon, Input, Stack } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FieldArrayWithId, UseFormRegisterReturn } from 'react-hook-form';
import { MdEdit, MdPerson } from 'react-icons/md';

import { OPTIONS, Option } from '@/utils';
import { Dropdown } from '../dropdown';

type SortableItemProps = {
  field: FieldArrayWithId<{ fields: { name: string; type: string }[] }, 'fields', 'id'>;
  onDelete: () => void;
  onChange: (type: Option['value']) => void;
  inputProps: UseFormRegisterReturn<`editModules.builderForm.${number}.fields.${number}.name`>;
};

export function SortableItem({ field, inputProps, onDelete, onChange }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
    id: field.id,
  });

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      tabIndex={undefined}
      cursor="auto"
    >
      <Grid alignItems="end" gap="3" gridTemplateColumns={field.type === 'Paragraph' ? '1fr auto' : '13.5rem auto'}>
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
          {field.type === 'File upload' ? (
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
          <Box maxW="10rem" flex="1">
            <Dropdown
              options={OPTIONS}
              value={OPTIONS.find((opt) => opt.value === field.type)}
              onChange={(value) => value && onChange(value.value)}
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
    </Box>
  );
}
