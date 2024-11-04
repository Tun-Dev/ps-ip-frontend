'use client';

import { Grid, GridItem, Input, SimpleGrid, type SimpleGridProps, Stack, Text } from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

type Props = {
  fields: { name: string; type: string }[];
} & SimpleGridProps;

export const BuilderReview = ({ fields, ...props }: Props) => {
  return (
    <SimpleGrid columns={2} spacingX="7.1875rem" spacingY="8" {...props}>
      {fields.map((field) => (
        <GridItem key={field.name} colSpan={field.type === 'Paragraph' ? 2 : undefined}>
          <Stack align="flex-start" spacing="2" flex="1">
            <Text as="label" variant="Body2Semibold" color="grey.500">
              {field.name}
            </Text>
            {field.type === 'File upload' ? (
              <Grid
                mx="2"
                placeItems="center"
                boxSize="4.5rem"
                rounded="full"
                border="1px dashed"
                borderColor="grey.300"
                color="primary.400"
              >
                <MdPerson size="2rem" />
              </Grid>
            ) : (
              <Input placeholder={field.name} isReadOnly />
            )}
          </Stack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
