import { Box, Button, Flex, Grid, Icon, Input, Stack, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FieldArrayWithId } from 'react-hook-form';
import { MdEdit, MdPerson } from 'react-icons/md';

import { OPTIONS, Option } from '@/utils';
import type { FormValues } from '.';
import { Dropdown } from '../dropdown';

type SortableItemProps = {
  field: FieldArrayWithId<FormValues, 'fields', 'id'>;
  onDelete: () => void;
  onChange: (id: string, type: Option['value']) => void;
};

export function SortableItem({ field, onDelete, onChange }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
    id: field.id,
  });

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, touchAction: 'none' }}
      {...attributes}
      tabIndex={undefined}
      cursor="auto"
    >
      <Grid alignItems="end" gap="3" gridTemplateColumns={field.type === 'Paragraph' ? '1fr auto' : '13.5rem auto'}>
        <Stack align="flex-start" spacing="2" flex="1">
          <Flex align="center" gap="2">
            <Text
              as="label"
              variant="Body2Semibold"
              px="2"
              py="1"
              border="1px dashed"
              borderColor="grey.300"
              borderRadius="0.25rem"
            >
              {field.name}
            </Text>
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
              onChange={(value) => value && onChange(field.id, value.value)}
            />
          </Box>
          <Button variant="cancel" size="medium" type="button" onClick={onDelete}>
            Delete
          </Button>
          <Grid
            ref={setActivatorNodeRef}
            {...listeners}
            gridTemplateColumns="auto auto"
            gap="1"
            role="button"
            tabIndex={0}
            outlineColor="transparent"
            _focus={{ boxShadow: 'outline' }}
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
