import { useProgramStore } from '@/providers/programs-store-provider';
import { Box, Flex, Text } from '@chakra-ui/react';

const MultiStepHeader = ({ activeStep, setStep }: { activeStep: number; setStep: (n: number) => void }) => {
  const selectedModules = useProgramStore((state) => state.selectedModules);
  const firstModuleId = selectedModules.ids.values().next().value ?? 0;
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  return (
    <Flex justifyContent="center" gap="8px">
      <StepItem
        step={1}
        activeStep={activeStep}
        label="Program Details"
        onClick={() => {
          setStep(1);
          setActiveModuleId(firstModuleId);
        }}
      />
      <ProgressLine step={1} activeStep={activeStep} />
      <StepItem
        step={2}
        activeStep={activeStep}
        label="Select Modules"
        onClick={() => {
          setStep(2);
          setActiveModuleId(firstModuleId);
        }}
      />
      <ProgressLine step={2} activeStep={activeStep} />
      <StepItem
        step={3}
        activeStep={activeStep}
        label="Edit Modules"
        onClick={() => {
          setStep(3);
          setActiveModuleId(firstModuleId);
        }}
      />
      <ProgressLine step={3} activeStep={activeStep} />
      <StepItem
        step={4}
        activeStep={activeStep}
        label="Admin Settings"
        onClick={() => {
          setStep(4);
          setActiveModuleId(firstModuleId);
        }}
      />
      <ProgressLine step={4} activeStep={activeStep} />
      <StepItem
        step={5}
        activeStep={activeStep}
        label="Review"
        onClick={() => {
          setStep(5);
          setActiveModuleId(firstModuleId);
        }}
      />
    </Flex>
  );
};

export { MultiStepHeader };

const StepItem = ({
  step,
  activeStep,
  label,
  onClick,
}: {
  step: number;
  activeStep: number;
  label: string;
  onClick: () => void;
}) => {
  const isActive = activeStep === step || activeStep > step;
  const passed = activeStep > step;
  return (
    <Flex flexDir="column" gap="8px" alignItems="center" boxSize="80px" onClick={onClick} cursor="pointer">
      <Flex
        w="56px"
        h="56px"
        borderRadius="50%"
        border="2px dashed"
        borderColor={passed ? 'primary.200' : isActive ? 'secondary.600' : 'grey.300'}
        justifyContent="center"
        alignItems="center"
        transition="all 0.3s ease-in-out"
      >
        <Flex
          w="40px"
          h="40px"
          bg={passed ? 'primary.200' : isActive ? 'secondary.200' : 'grey.200'}
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          transition="all 0.3s ease-in-out"
        >
          <Text color={isActive ? 'black' : 'grey.400'} transition="all 0.3s ease-in-out">
            {step}
          </Text>
        </Flex>
      </Flex>
      <Text
        variant={isActive ? 'Body3Bold' : 'Body3Regular'}
        color={isActive ? 'black' : 'grey.400'}
        transition="all 0.3s ease-in-out"
      >
        {label}
      </Text>
    </Flex>
  );
};

const ProgressLine = ({ step, activeStep }: { step: number; activeStep: number }) => {
  const isActive = activeStep > step;
  return (
    <Box
      w="48px"
      border="1px solid"
      borderColor={isActive ? 'primary.200' : 'grey.300'}
      h="0"
      mt="28px"
      transition="all 0.3s ease-in-out"
    />
  );
};
