import { Box, BoxProps, Heading, Stack } from '@chakra-ui/react';

import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { BuilderReview } from './builder-review';
import { CheckboxFormReview } from './checkbox-form-review';
import { SettingsReview } from './settings-review';

const Review = (props: BoxProps) => {
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const activeModule = selectedModules.find((module) => module.id === activeModuleId);
  const activeModuleIndex = selectedModules.findIndex((module) => module.id === activeModuleId);

  const { getValues } = useProgramForm();
  const settings = getValues('settings');
  const editModules = getValues('editModules');

  return (
    <Box flex="1" py="6" {...props}>
      <Heading variant="Body2Semibold" color="primary.500" mb="4" textTransform="capitalize">
        <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
          {activeModuleIndex + 1}
        </Box>{' '}
        {activeModule?.name}
      </Heading>
      <Stack spacing="6">
        {editModules.builderForm.map((form) => (
          <BuilderReview key={form.id} fields={form.fields} display={activeModuleId === form.id ? 'grid' : 'none'} />
        ))}
        {editModules.checkboxForm.map((form) => (
          <CheckboxFormReview
            key={form.id}
            sections={form.sections}
            display={activeModuleId === form.id ? 'flex' : 'none'}
          />
        ))}
        {settings.map((form) => (
          <SettingsReview key={form.id} settings={form.fields} display={activeModuleId === form.id ? 'flex' : 'none'} />
        ))}
      </Stack>
    </Box>
  );
};

export default Review;
