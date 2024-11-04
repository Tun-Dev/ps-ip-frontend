'use client';

import { Box, Button, ButtonGroup, Flex, Icon, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';

import { ModuleCard } from '@/components';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { MultiStepHeader } from '@/shared';
import { ALL_MODULES } from '@/utils';
import { ProgramImage } from './components/program-image';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();
  const reset = useProgramStore((state) => state.reset);
  const { step, selectedModules, activeModuleId, setSelectedModules, nextStep, previousStep, setActiveModuleId } =
    useProgramStore((state) => state);

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
    reset: resetForm,
  } = useProgramForm();

  const hasSelectModulesError = step === 1 && selectedModules.length < 1;
  const hasEditModulesError =
    step === 2 && (!!errors.editModules?.builderForm?.length || !!errors.editModules?.checkboxForm?.length);
  const hasAdminSettingsError = step === 3 && !!errors.settings?.length;
  const hasProgramNameError = step === 4 && !!errors.programName;
  const hasErrors = hasSelectModulesError || hasProgramNameError || hasEditModulesError || hasAdminSettingsError;

  const getModules = () => {
    if (step === 1) return ALL_MODULES;
    return selectedModules;
  };

  const handleNextStep = async () => {
    switch (step) {
      case 1: {
        if (!selectedModules.length) return toast({ title: 'Please select at least one module', status: 'error' });
        setActiveModuleId(selectedModules[0].id);
        nextStep();
        break;
      }
      case 2: {
        const isValid = await trigger('editModules');
        if (isValid) nextStep();
        else toast({ title: 'Please fill out all required fields', status: 'error' });
        break;
      }
      case 3: {
        const isValid = await trigger('settings');
        if (isValid) nextStep();
        else toast({ title: 'Please fill out all required fields', status: 'error' });
        break;
      }
      case 4: {
        console.log(getValues());
        toast({ title: 'Program Created', status: 'success' });
        router.push('/super-admin/programs');
        break;
      }
      default:
        nextStep();
        break;
    }
  };

  useEffect(() => {
    // Reset program state and form when the component is unmounted
    return () => {
      reset();
      resetForm();
    };
  }, [reset, resetForm]);

  return (
    <Flex h="100%" w="full">
      <Stack spacing="0" flex="1 1 0%">
        <Flex pt="20px" gap="24px" flexDir="column">
          <MultiStepHeader activeStep={step} />
          <Flex align="center" gap="3">
            <ProgramImage />
            <Flex alignItems="center" gap="8px">
              <Input
                placeholder="Program Name"
                border="1px dashed"
                borderColor="grey.300"
                {...register('programName')}
              />
              <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />
            </Flex>
          </Flex>
        </Flex>
        <Box mb="2.94rem">{children}</Box>
        <ButtonGroup size="default" spacing="4" alignSelf="end" w="full" maxW="31.25rem">
          <Button onClick={previousStep} variant="secondary" flex="1" visibility={step > 1 ? 'visible' : 'hidden'}>
            Back
          </Button>
          <Button onClick={handleNextStep} variant="primary" flex="1" isDisabled={hasErrors}>
            {step === 4 ? 'Create Program' : 'Next'}
          </Button>
        </ButtonGroup>
      </Stack>

      <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5">
        <Text variant="Body2Semibold" color="grey.400" mb="2">
          Modules
        </Text>
        <Stack spacing="3" minW="263px">
          {getModules().map((item, index) => {
            const foundModule = selectedModules.some((module) => module.id === item.id);
            return (
              <ModuleCard
                key={item.id}
                module={item}
                number={index + 1}
                status={step !== 1 ? 'Edit' : foundModule ? 'Selected' : 'Select'}
                isActive={activeModuleId === item.id}
                disabled={
                  (step === 2 && item.hasForm === false) ||
                  (step === 3 && item.hasSettings === false) ||
                  (step === 4 && item.hasForm === false && item.hasSettings === false)
                }
                onClick={() => {
                  if (step !== 1) {
                    setActiveModuleId(item.id);
                  } else if (!foundModule) {
                    const updatedModules = [...selectedModules, item].sort((a, b) => a.id - b.id);
                    setSelectedModules(updatedModules);
                  }
                }}
              />
            );
          })}
        </Stack>
      </Box>
    </Flex>
  );
};

export default CreateProgramLayout;
