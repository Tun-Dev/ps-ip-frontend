'use client';

import { Box, Button, ButtonGroup, Flex, Grid, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useEditForm } from '@/hooks/useEditForm';
import { useEditProgram } from '@/hooks/useEditProgram';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { defaultValues, useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { MultiStepHeader } from '@/shared';
import { FormResponse } from '@/types';
import { FormHeader } from '../../../components/form-header';
import { ModulesList } from '../../../components/modules-list';

const EditProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();

  const step = useProgramStore((state) => state.step);
  const nextStep = useProgramStore((state) => state.nextStep);
  const previousStep = useProgramStore((state) => state.previousStep);
  const setStep = useProgramStore((state) => state.setStep);
  const resetState = useProgramStore((state) => state.resetState);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const setSelectedModules = useProgramStore((state) => state.setSelectedModules);

  const {
    form: { getValues, trigger, reset: resetForm },
  } = useProgramForm();

  const { data: modules, isLoading: isModuleLoading } = useGetModules();
  const { data: questionTypes } = useGetQuestionTypes();
  const { mutate: editProgram, isPending } = useEditProgram();
  const { mutate: editForm } = useEditForm();
  const { programID } = useParams();
  const { response: program, isLoading } = useGetProgramById(programID?.toString());

  useEffect(() => {
    if (!program || !modules) return;

    const selectedModulesSet = new Set<number>();

    program.body.programModules
      .sort((a, b) => a.order - b.order)
      .forEach((module) => {
        const currentModule = modules.body.find((md) => md.name === module.module);
        if (currentModule) selectedModulesSet.add(currentModule.id);
      });
    setSelectedModules({ ids: selectedModulesSet });
  }, [setSelectedModules, program, modules]);

  const handlePrevStep = () => {
    const firstModuleId = selectedModules.ids.values().next().value ?? 0;
    setActiveModuleId(firstModuleId);
    previousStep();
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await validateProgramDetails();
      if (isValid) goToNextStep();
    } else if (step === 5) {
      const isValid = await validateProgramDetails();
      if (isValid) handleSubmit();
    } else goToNextStep();
  };

  const handleSubmit = () => {
    const moduleNames = (modules?.body ?? [])
      .filter((module) => selectedModules.ids.has(module.id))
      .map((module) => module.name);

    // If the selected modules contain Survey or Vetting, create forms first
    if (moduleNames.includes('Survey') || moduleNames.includes('Vetting')) {
      const surveyPayload = getSurveyFormPayload();
      const vettingPayload = getVettingFormPayload();
      const formsToEdit: (typeof surveyPayload)[] = [];

      if (moduleNames.includes('Survey')) formsToEdit.push(surveyPayload);
      if (moduleNames.includes('Vetting')) formsToEdit.push(vettingPayload);

      editForm(formsToEdit, {
        onSuccess: (response) => {
          handleEditProgram(response.body);
        },
      });
    } else handleEditProgram();
  };

  const validateProgramDetails = async () => {
    const [isLogoValid, isCoverPhotoValid, isNameValid, isProgramTypeIdValid, isDescriptionValid, isTargetValid] =
      await Promise.all([
        trigger('logo'),
        trigger('coverPhotoID'),
        trigger('name'),
        trigger('programTypeId'),
        trigger('description'),
        trigger('target'),
      ]);

    let errorMessage = '';

    if (!isTargetValid) errorMessage = 'Input a target';
    if (!isDescriptionValid) errorMessage = 'Enter a description';
    if (!isProgramTypeIdValid) errorMessage = 'Select a program type';
    if (!isNameValid) errorMessage = 'Enter a program name';
    if (!isCoverPhotoValid) errorMessage = 'Upload a cover photo for this program';
    if (!isLogoValid) errorMessage = 'Upload a logo for this program';

    if (errorMessage) {
      toast({ title: errorMessage, status: 'error' });
      return false;
    }

    return true;
  };

  const goToNextStep = () => {
    const firstModuleId = selectedModules.ids.values().next().value ?? 0;
    setActiveModuleId(firstModuleId);
    nextStep();
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

  const handleEditProgram = (forms?: FormResponse[]) => {
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
      id: programID,
      name: formValues.name,
      description: formValues.description,
      logo: formValues.logo,
      target: Number(formValues.target),
      programTypeId: Number(formValues.programTypeId),
      programModules: programModules,
      coverPhoto: Number(formValues.coverPhotoID),
      eligibilityCriterion: formValues.eligibilityCriteria,
      hasAutomaticVerification: false,
    };

    editProgram(payload, {
      onSuccess: () => {
        toast({ title: 'Changes saved', status: 'success' });
        router.push('/super-admin/programs');
      },
    });
  };

  const getSurveyFormPayload = () => {
    const formValues = getValues();

    const moduleId = modules?.body.find((module) => module.name === 'Survey')?.id ?? 0; // Survey module id

    const payload = {
      id: formValues.surveyForm.id,
      moduleId: moduleId,
      program: formValues.name,
      questions: formValues.surveyForm.fields.map((field) => ({
        question: field.name,
        type: getType(field.status),
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: true,
      })),
    };

    return payload;
  };

  const getType = (type: string) => {
    const value = questionTypes?.body.find((qt) => qt.status === type)?.value ?? 0;
    return value;
  };

  const getVettingFormPayload = () => {
    const formValues = getValues();

    const moduleId = modules?.body.find((module) => module.name === 'Vetting')?.id ?? 0; // Vetting module id
    const fields =
      formValues.vettingForm.type === 'manual'
        ? formValues.vettingForm.manualFields
        : formValues.vettingForm.automatedFields;

    const totalScore =
      formValues.vettingForm.type === 'manual'
        ? formValues.vettingForm.manualTotalScore
        : formValues.vettingForm.totalScore;

    const passScore =
      formValues.vettingForm.type === 'manual'
        ? formValues.vettingForm.manualPassScore
        : formValues.vettingForm.passScore;

    const payload = {
      id: formValues.vettingForm.id,
      moduleId: moduleId,
      program: formValues.name,
      totalFormScore: Number(totalScore),
      minVetScore: Number(passScore),
      questions: fields.map((field) => ({
        question: field.name,
        type: getType(field.status),
        total: Number(field.value),
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: true,
      })),
    };

    return payload;
  };

  useEffect(() => {
    // Reset program state and form when the component is unmounted
    return () => {
      resetState();
      resetForm(defaultValues);
    };
  }, [resetState, resetForm]);

  if (isLoading || isModuleLoading)
    return (
      <Flex boxSize="full" align="center" justify="center">
        <Spinner />
      </Flex>
    );

  return (
    <Flex h="100%" w="full">
      <Stack spacing="0" flex="1 1 0%">
        <Flex pt="20px" pb="5" gap="24px" flexDir="column" borderBottom="1px solid" borderColor="grey.200">
          <MultiStepHeader activeStep={step} setStep={setStep} />
          {step > 1 && <FormHeader />}
        </Flex>
        <Flex flexDir="column" height="100%">
          <Box mb="2.94rem" flex="1 1 0%">
            {selectedModules.ids.size < 1 && step !== 1 ? <EmptyState /> : children}
          </Box>
          <Flex
            pos="sticky"
            bottom="0"
            py="4"
            borderTop="1px solid"
            justify="end"
            borderTopColor="grey.300"
            bgColor="white"
          >
            <ButtonGroup size="default" spacing="4" w="full" maxW="31.25rem">
              <Button
                onClick={handlePrevStep}
                variant="secondary"
                flex="1"
                visibility={step > 1 ? 'visible' : 'hidden'}
                isDisabled={isPending}
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                isLoading={isPending}
                variant="primary"
                flex="1"
                isDisabled={selectedModules.ids.size < 1 && step === 2}
              >
                {step === 5 ? 'Save Changes' : 'Next'}
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Stack>
      {step > 1 ? <ModulesList /> : null}
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

export default EditProgramLayout;
