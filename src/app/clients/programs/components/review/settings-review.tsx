import { Stack, Text } from '@chakra-ui/react';
import { MdCheck, MdClear } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';
import { Module } from '@/types';

type Props = {
  module: Module;
};

export const SettingsReview = ({ module }: Props) => {
  const {
    form: { getValues },
  } = useProgramForm();
  const programModules = getValues('programModules');

  const guidelines = programModules.find((md) => md.moduleId === module.id)?.guidelines ?? [];

  return (
    <Stack>
      <Text as="h3" variant="Body2Semibold">
        Admin Settings
      </Text>
      <Stack spacing="4" align="start">
        {module.moduleGuidelines.map((guideline) => (
          <Text
            key={guideline.id}
            display="inline-flex"
            gap="0.5"
            align="center"
            variant="Body2Semibold"
            color="grey.500"
            lineHeight={1}
          >
            {guidelines.includes(guideline.id) ? (
              <MdCheck color="var(--chakra-colors-primary-500)" />
            ) : (
              <MdClear color="var(--chakra-colors-red)" />
            )}
            {guideline.name}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};
