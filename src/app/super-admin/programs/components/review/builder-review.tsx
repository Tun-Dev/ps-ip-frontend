'use client';

import { Grid, GridItem, HStack, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

type Props = {
  name: string;
  fields: {
    name: string;
    status: string;
    value: number;
    isRequired: boolean;
    options: { label: string; value: string }[];
  }[];
};

export const BuilderReview = ({ name, fields }: Props) => {
  return (
    <Stack>
      <Text as="h3" variant="Body2Semibold">
        {name}
      </Text>
      <SimpleGrid columns={2} spacingX="7.1875rem" spacingY="8">
        {fields.map((field, index) => (
          <GridItem key={index} colSpan={field.status === 'LONG_TEXT' ? 2 : undefined}>
            <Stack align="flex-start" spacing="2" flex="1">
              <HStack>
                <Text variant="Body2Semibold" color="grey.500">
                  {field.name}{' '}
                  {field.isRequired && (
                    <Text as="span" color="red">
                      *
                    </Text>
                  )}
                </Text>
                {name === 'Vetting Form' && (
                  <Text variant="Body2Semibold" color="primary.500">
                    Score: {field.value}
                  </Text>
                )}
              </HStack>
              {field.status === 'IMAGE_UPLOAD' ? (
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
    </Stack>
  );
};
