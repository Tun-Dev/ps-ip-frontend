import { Box, BoxProps, Heading, Stack, Text } from '@chakra-ui/react';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { BuilderReview } from './builder-review';
import { CheckboxFormReview } from './checkbox-form-review';
import { SettingsReview } from './settings-review';
import { VettingReview } from './vetting-review';

const Review = (props: BoxProps) => {
  const { data: modules } = useGetModules();
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);

  const { getValues } = useProgramForm();
  const surveyForm = getValues('surveyForm');
  const vettingForm = getValues('vettingForm');
  const programModules = getValues('programModules');

  if (!activeModuleId || !selectedModuleIds.ids.has(activeModuleId)) return null;

  return (
    <Box flex="1" py="6" {...props}>
      {Array.from(selectedModuleIds.ids).map((moduleId, index) => {
        const currentModule = modules?.body.find((module) => module.id === moduleId);
        const dataPoints = programModules.find((module) => module.moduleId === moduleId)?.dataPoints ?? [];

        if (!currentModule) return null;

        return (
          <Box key={moduleId} display={activeModuleId === moduleId ? 'block' : 'none'}>
            <Heading variant="Body2Semibold" color="primary.500" mb="6" textTransform="capitalize">
              <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
                {index + 1}
              </Box>{' '}
              {currentModule.name}
            </Heading>
            <Stack spacing="6">
              {currentModule.name === 'Survey' && <BuilderReview fields={surveyForm.fields} name="Survey Form" />}
              {currentModule.name === 'Vetting' && vettingForm.type === 'manual' && (
                <BuilderReview fields={vettingForm.manualFields} name="Vetting Form" />
              )}
              {currentModule.name === 'Vetting' && vettingForm.type === 'automated' && (
                <VettingReview fields={vettingForm.automatedFields} />
              )}
              {dataPoints.length > 0 && <CheckboxFormReview dataPoints={dataPoints} />}
              {currentModule.ModuleGuidelines.length > 0 && <SettingsReview module={currentModule} />}
              {currentModule.name !== 'Survey' &&
                currentModule.name !== 'Vetting' &&
                dataPoints.length === 0 &&
                currentModule.ModuleGuidelines.length === 0 && (
                  <Text variant="Body2Semibold" textAlign="center" color="grey.500">
                    No additional review for this module.
                  </Text>
                )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default Review;
