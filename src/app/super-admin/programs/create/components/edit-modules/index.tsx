import { Box, BoxProps, Heading } from '@chakra-ui/react';

import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { useFieldArray } from 'react-hook-form';
import CheckboxForm from './checkbox-form';
import FormBuilder from './form-builder';

const EditModules = (props: BoxProps) => {
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const activeModule = selectedModules.find((module) => module.id === activeModuleId);
  const activeModuleIndex = selectedModules.findIndex((module) => module.id === activeModuleId);

  const { control } = useProgramForm();
  const { fields: checkboxFields } = useFieldArray({ name: 'editModules.checkboxForm', control, keyName: 'key' });
  const { fields: builderFields } = useFieldArray({ name: 'editModules.builderForm', control, keyName: 'key' });

  return (
    <Box flex="1" py="6" {...props}>
      <Heading variant="Body2Semibold" color="primary.500" mb="4" textTransform="capitalize">
        <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
          {activeModuleIndex + 1}
        </Box>{' '}
        {activeModule?.name}
      </Heading>
      {checkboxFields.map((field, index) => (
        <CheckboxForm key={field.key} index={index} display={activeModuleId === field.id ? 'flex' : 'none'} />
      ))}
      {builderFields.map((field, index) => (
        <FormBuilder key={field.key} index={index} display={activeModuleId === field.id ? 'block' : 'none'} />
      ))}
    </Box>
  );
};

export default EditModules;
