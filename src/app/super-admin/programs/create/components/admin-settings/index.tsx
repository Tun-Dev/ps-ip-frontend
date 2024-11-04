import { Box, Heading, Stack, StackProps } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';

import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { SettingsForm } from './settings-form';

const AdminSettings = (props: StackProps) => {
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const activeModule = selectedModules.find((module) => module.id === activeModuleId);
  const activeModuleIndex = selectedModules.findIndex((module) => module.id === activeModuleId);

  const { control } = useProgramForm();
  const { fields } = useFieldArray({ name: 'settings', control, keyName: 'key' });

  return (
    <Stack py="6" spacing="2.94rem" {...props}>
      <Box flex="1">
        <Heading variant="Body2Semibold" color="primary.500" mb="4" textTransform="capitalize">
          <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
            {activeModuleIndex + 1}
          </Box>{' '}
          {activeModule?.name}
        </Heading>
        {fields.map((field, index) => (
          <SettingsForm key={field.key} index={index} display={activeModuleId === field.id ? 'flex' : 'none'} />
        ))}
      </Box>
    </Stack>
  );
};

export default AdminSettings;
