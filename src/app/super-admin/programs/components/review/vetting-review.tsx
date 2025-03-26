'use client';

import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

type Props = {
  fields: {
    name: string;
    status: string;
    value: number;
    isRequired: boolean;
    options: { label: string; value: string; weight: number }[];
  }[];
};

export const VettingReview = ({ fields }: Props) => {
  return (
    <Stack>
      <Text as="h3" variant="Body2Semibold">
        Automated Vetting
      </Text>
      <Stack spacing="4" align="start">
        {fields.map((field, index) => (
          <Stack key={index} gap="1">
            <SimpleGrid columns={2} alignItems="center" gap="2">
              <Text variant="Body2Semibold" color="grey.500">
                {field.name}{' '}
                {field.isRequired && (
                  <Text as="span" color="red">
                    *
                  </Text>
                )}
              </Text>
              <Text variant="Body2Semibold" color="primary.500">
                Score: {field.value}
              </Text>
            </SimpleGrid>
            <Stack gap="1">
              {field.options.map((option, index) => (
                <SimpleGrid key={index} columns={2} alignItems="center" gap="2">
                  <Text variant="Body2Semibold" color="grey.500">
                    • {option.label}
                  </Text>
                  <Text variant="Body2Semibold" color="primary.500">
                    Score: {option.weight}
                  </Text>
                </SimpleGrid>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
