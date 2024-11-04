import { Heading, Stack, Text } from '@chakra-ui/react';
import { MdCheck, MdClear } from 'react-icons/md';

type Props = {
  sections: { heading: string; fields: { label: string; value: boolean }[] }[];
  display?: string;
};

export const CheckboxFormReview = ({ sections, display }: Props) => {
  return (
    <Stack display={display}>
      <Text as="h3" variant="Body2Semibold">
        Module Settings
      </Text>
      <Stack spacing="4" align="start">
        {sections.map((section, index) => (
          <Stack key={index} spacing="2" align="start">
            {section.heading && (
              <Heading as="h4" variant="Body2Semibold" color="primary.500">
                {section.heading}
              </Heading>
            )}
            <Stack spacing="4" align="start">
              {section.fields.map((field) => (
                <Text
                  key={field.label}
                  display="inline-flex"
                  gap="0.5"
                  align="center"
                  variant="Body2Semibold"
                  color="grey.500"
                  lineHeight={1}
                >
                  {field.value ? (
                    <MdCheck color="var(--chakra-colors-primary-500)" />
                  ) : (
                    <MdClear color="var(--chakra-colors-red)" />
                  )}
                  {field.label}
                </Text>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
