'use client';

import { Box, Button, ButtonGroup, Flex, Grid, Stack, Text, useToast } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAddProgramToGroup } from '@/hooks/useAddProgramToGroup';
import { useCreateForm } from '@/hooks/useCreateForm';
import { useCreateProgram } from '@/hooks/useCreateProgram';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { defaultValues, useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { MultiStepHeader } from '@/shared';
import { FormResponse, Program } from '@/types';
import { FormHeader } from '../../components/form-header';
import { ModulesList } from '../../components/modules-list';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();
  const { folderID } = useParams();

  const step = useProgramStore((state) => state.step);
  const nextStep = useProgramStore((state) => state.nextStep);
  const previousStep = useProgramStore((state) => state.previousStep);
  const resetState = useProgramStore((state) => state.resetState);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const setStep = useProgramStore((state) => state.setStep);
  const selectedModules = useProgramStore((state) => state.selectedModules);

  const {
    form: { getValues, trigger, reset: resetForm },
  } = useProgramForm();

  const { data: modules } = useGetModules();
  const { data: questionTypes } = useGetQuestionTypes();
  const { mutate: createProgram, isPending } = useCreateProgram();
  const { mutate: addProgramToGroup, isPending: isAddProgramToGroupPending } = useAddProgramToGroup();
  const { mutate: createForm } = useCreateForm();

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
      const formsToCreate: (typeof surveyPayload)[] = [];

      if (moduleNames.includes('Survey')) formsToCreate.push(surveyPayload);
      if (moduleNames.includes('Vetting')) formsToCreate.push(vettingPayload);

      createForm(formsToCreate, {
        onSuccess: (response) => {
          handleCreateProgram(response.body);
        },
      });
    } else handleCreateProgram();
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
      coverPhoto: Number(formValues.coverPhotoID),
      eligibilityCriteria: formValues.eligibilityCriteria,
      programModules: programModules,
      hasAutomaticVerification: false,
    };

    createProgram(payload, {
      onSuccess: (response) => {
        handleAddProgramToGroup(response.body);
      },
    });
  };

  const handleAddProgramToGroup = (response: Program) => {
    const payload = {
      id: folderID.toString(),
      programIds: [response.id],
    };

    addProgramToGroup(payload, {
      onSuccess: () => {
        toast({ title: 'Program Created successfully', status: 'success' });
        router.push(`/super-admin/programs/${folderID.toString()}`);
      },
    });
  };

  const getSurveyFormPayload = () => {
    const formValues = getValues();

    const moduleId = modules?.body.find((module) => module.name === 'Survey')?.id ?? 0; // Survey module id

    const payload = {
      moduleId: moduleId,
      program: formValues.name,
      questions: formValues.surveyForm.fields.map((field) => ({
        question: field.name,
        type: getType(field.status),
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: field.isRequired,
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
      moduleId: moduleId,
      program: formValues.name,
      totalFormScore: Number(totalScore),
      minVetScore: Number(passScore),
      questions: fields.map((field) => ({
        question: field.name,
        type: getType(field.status),
        total: Number(field.value),
        options: field.options.map((option) => ({ ...option, value: option.label })),
        mandatory: field.isRequired,
      })),
    };

    return payload;
  };

  useEffect(() => {
    // Reset program state when the component is unmounted
    return () => {
      resetState();
      resetForm(defaultValues);
    };
  }, [resetState, resetForm]);

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
                isDisabled={isPending || isAddProgramToGroupPending}
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                isLoading={isPending || isAddProgramToGroupPending}
                variant="primary"
                flex="1"
                isDisabled={selectedModules.ids.size < 1 && step === 2}
              >
                {step === 5 ? 'Create Program' : 'Next'}
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Stack>
      {/* Module list */}
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

export default CreateProgramLayout;
