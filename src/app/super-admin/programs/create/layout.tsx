'use client';

import { Box, Button, ButtonGroup, Flex, Grid, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCreateForm } from '@/hooks/useCreateForm';
import { useCreateProgram } from '@/hooks/useCreateProgram';
import { useGetDataPoints } from '@/hooks/useGetDataPoints';
import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { MultiStepHeader } from '@/shared';
import { FormResponse } from '@/types';
import { FormHeader } from './components/form-header';
import { ModulesList } from './components/modules-list';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();
  const [, setRender] = useState(false);

  const step = useProgramStore((state) => state.step);
  const nextStep = useProgramStore((state) => state.nextStep);
  const previousStep = useProgramStore((state) => state.previousStep);
  const resetState = useProgramStore((state) => state.resetState);
  const activeModuleId = useProgramStore((state) => state.activeModuleId);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const selectedModules = useProgramStore((state) => state.selectedModules);

  const { getValues, trigger, reset: resetForm } = useProgramForm();

  const { data: modules } = useGetModules();
  const { data: dataPoints } = useGetDataPoints({ query: '' });
  const { mutate: createProgram, isPending } = useCreateProgram();
  const { mutate: createForm } = useCreateForm();

  const handleNextStep = async () => {
    if (step === 4) {
      const isValid = await trigger(['name', 'programTypeId', 'target', 'description', 'logo']);

      // Force a re-render to ensure errors are updated
      setRender((prev) => !prev);

      if (!isValid) return;

      const moduleNames = (modules?.body ?? [])
        .filter((module) => selectedModules.ids.has(module.id))
        .map((module) => module.module);

      // If the selected modules contain Survey or Vetting, create forms first
      if (moduleNames.includes('Survey') || moduleNames.includes('Vetting')) {
        const surveyPayload = getSurveyFormPayload();
        const vettingPayload = getVettingFormPayload();
        const formsToCreate = [];

        if (moduleNames.includes('Survey')) formsToCreate.push(surveyPayload);
        if (moduleNames.includes('Vetting')) formsToCreate.push(vettingPayload);

        createForm(formsToCreate, {
          onSuccess: (response) => {
            handleCreateProgram(response.body);
          },
        });
      } else handleCreateProgram();
    } else {
      const firstModuleId = selectedModules.ids.values().next().value ?? 0;
      if (!activeModuleId || !selectedModules.ids.has(activeModuleId)) setActiveModuleId(firstModuleId);
      nextStep();
    }
  };

  const mapProgramModules = () => {
    const formValues = getValues();

    const programModules = formValues.programModules.map((module, index) => {
      const moduleData = { ...module, order: index + 1 };

      if (!module.dataPoints) return { ...moduleData, dataPoints: [] };

      return {
        ...moduleData,
        dataPoints: module.dataPoints.map((dp) => ({ isRequired: dp.isRequired, dataPoint: dp.dataPoint.id })),
      };
    });

    return programModules;
  };

  const handleCreateProgram = (forms?: FormResponse[]) => {
    const formValues = getValues();
    const mappedModules = mapProgramModules();

    // If forms are provided, map the formId to the programModule
    const programModules = forms
      ? mappedModules.map((module) => {
          const matchingForm = forms.find((form) => form.programModuleId === module.moduleId);
          if (matchingForm) return { ...module, formId: matchingForm.formId };
          return module;
        })
      : mappedModules;

    const payload = {
      name: formValues.name,
      description: formValues.description,
      logo: formValues.logo,
      target: Number(formValues.target),
      programTypeId: Number(formValues.programTypeId),
      programModules: programModules,
    };

    createProgram(payload, {
      onSuccess: () => {
        toast({ title: 'Program Created successfully', status: 'success' });
        resetState();
        resetForm();
        router.push('/super-admin/programs');
      },
    });
  };

  const getSurveyFormPayload = () => {
    const formValues = getValues();

    const moduleId = modules?.body.find((module) => module.module === 'Survey')?.id ?? 0; // Survey module id

    const payload = {
      moduleId: moduleId,
      program: formValues.name,
      questions: formValues.surveyForm.fields.map((field) => ({
        question: field.name,
        type: field.value,
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: true,
      })),
    };

    return payload;
  };

  const getVettingFormPayload = () => {
    const formValues = getValues();

    const moduleId = modules?.body.find((module) => module.module === 'Vetting')?.id ?? 0; // Vetting module id

    const manualPayload = {
      moduleId: moduleId,
      program: formValues.name,
      questions: formValues.vettingForm.manualFields.map((field) => ({
        question: field.name,
        type: field.value,
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: true,
      })),
    };

    if (formValues.vettingForm.type === 'manual') return manualPayload;

    const checkboxType = dataPoints?.body.questionType.find((qt) => qt.status === 'CHECKBOX')?.value ?? 0; // Checkbox question type

    const automatedPayload = {
      moduleId: moduleId,
      program: formValues.name,
      totalFormScore: Number(formValues.vettingForm.totalScore),
      minVetScore: Number(formValues.vettingForm.passScore),
      questions: formValues.vettingForm.automatedFields.map((field) => ({
        question: field.name,
        type: checkboxType,
        total: field.value,
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: true,
      })),
    };

    return automatedPayload;
  };

  useEffect(() => {
    // Reset program state and form when the component is unmounted
    return () => {
      resetState();
      resetForm();
    };
  }, [resetState, resetForm]);

  return (
    <Flex h="100%" w="full">
      <Stack spacing="0" flex="1 1 0%">
        <Flex pt="20px" pb="5" gap="24px" flexDir="column" borderBottom="1px solid" borderColor="grey.200">
          <MultiStepHeader activeStep={step} />
          <FormHeader />
        </Flex>
        {selectedModules.ids.size < 1 ? (
          <EmptyState />
        ) : (
          <Flex flexDir="column" height="100%">
            <Box mb="2.94rem" flex="1 1 0%">
              {children}
            </Box>
            <ButtonGroup size="default" spacing="4" alignSelf="end" justifySelf="end" w="full" maxW="31.25rem">
              <Button
                onClick={previousStep}
                variant="secondary"
                flex="1"
                visibility={step > 1 ? 'visible' : 'hidden'}
                isDisabled={isPending}
              >
                Back
              </Button>
              <Button onClick={handleNextStep} isLoading={isPending} variant="primary" flex="1">
                {step === 4 ? 'Create Program' : 'Next'}
              </Button>
            </ButtonGroup>
          </Flex>
        )}
      </Stack>
      <ModulesList />
    </Flex>
  );
};

const EmptyState = () => (
  <Grid placeContent="center" color="grey.500" minH="30rem">
    <Text variant="Body2Semibold" textAlign="center">
      No module selected.
    </Text>
    <Text variant="Body2Semibold" textAlign="center">
      Please select a module to start creating a program.
    </Text>
  </Grid>
);

export default CreateProgramLayout;
