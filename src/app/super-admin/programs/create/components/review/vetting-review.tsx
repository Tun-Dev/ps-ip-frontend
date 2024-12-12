'use client';

import { Stack, Text } from '@chakra-ui/react';

type Props = {
  fields: {
    name: string;
    value: number;
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
            <Text variant="Body2Semibold" color="grey.500">
              {field.name}: {field.value}
            </Text>
            <Stack gap="1">
              {field.options.map((option, index) => (
                <Text key={index} variant="Body2Semibold" color="grey.500">
                  {option.label}: {option.weight}
                </Text>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
