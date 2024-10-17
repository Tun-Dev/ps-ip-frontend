import { Stack, Text, type StackProps } from '@chakra-ui/react';
import { MdCheck, MdClear } from 'react-icons/md';

type Props = {
  settings: { label: string; value: boolean }[];
} & StackProps;

export const SettingsReview = ({ settings, ...props }: Props) => {
  return (
    <Stack {...props}>
      <Text as="h3" variant="Body2Semibold">
        Admin Settings
      </Text>
      <Stack spacing="4" align="start">
        {settings.map((setting) => (
          <Text
            key={setting.label}
            display="inline-flex"
            gap="0.5"
            align="center"
            variant="Body2Semibold"
            color="grey.500"
            lineHeight={1}
          >
            {setting.value ? (
              <MdCheck color="var(--chakra-colors-primary-500)" />
            ) : (
              <MdClear color="var(--chakra-colors-red)" />
            )}
            {setting.label}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};
