import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramStore } from '@/providers/programs-store-provider';
import CheckboxForm from './checkbox-form';
import SurveyForm from './survey-form';
import VettingForm from './vetting-form';

const EditModules = memo((props: BoxProps) => {
  const { data: modules } = useGetModules();
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);

  if (!activeModuleId || !selectedModuleIds.ids.has(activeModuleId)) return null;

  return (
    <Box flex="1" py="6" {...props}>
      {Array.from(selectedModuleIds.ids).map((moduleId, index) => {
        const currentModule = modules?.body.find((module) => module.id === moduleId);
        return (
          <Box key={moduleId} display={activeModuleId === moduleId ? 'block' : 'none'}>
            <Heading variant="Body2Semibold" color="primary.500" mb="6" textTransform="capitalize">
              <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
                {index + 1}
              </Box>{' '}
              {currentModule?.name}
            </Heading>
            {currentModule?.name === 'Application' || currentModule?.name === 'Enumeration' ? (
              <CheckboxForm moduleId={moduleId} />
            ) : currentModule?.name === 'Vetting' ? (
              <VettingForm />
            ) : currentModule?.name === 'Survey' ? (
              <SurveyForm />
            ) : (
              <Text variant="Body2Semibold" textAlign="center" color="grey.500">
                Cannot edit this module.
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

EditModules.displayName = 'EditModules';

export default EditModules;
