import { Box, Button, Flex, Grid, Icon, Input, Stack, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FieldArrayWithId } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';

import { OPTIONS } from '@/utils';
import type { FormValues } from '.';
import { Dropdown } from '../dropdown';

type SortableItemProps = {
  field: FieldArrayWithId<FormValues, 'fields', 'id'>;
  onDelete: () => void;
};

export function SortableItem({ field, onDelete }: SortableItemProps) {
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
      <Stack align="flex-start" spacing="2">
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
        <Flex align="center" justify="stretch" gap="3" w="full">
          <Input placeholder={field.name} maxW="13.125rem" border="1px dashed" borderColor="grey.300" />
          <Grid alignItems="center" gap="4" gridTemplateColumns="10rem auto auto">
            <Dropdown value={OPTIONS.find((opt) => opt.value === field.type)} options={OPTIONS} />
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
            >
              {Array.from(Array(6).keys()).map((index) => (
                <Box key={index} bg="primary.400" boxSize="1" />
              ))}
            </Grid>
          </Grid>
        </Flex>
      </Stack>
    </Box>
  );
}
