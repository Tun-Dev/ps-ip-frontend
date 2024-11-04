import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const MultiStepHeaderBen = ({ activeStep }: { activeStep: number }) => {
  return (
    <Flex justifyContent="center" gap="8px">
      <StepItem step={1} activeStep={activeStep} label="Application" />
      <ProgressLine step={1} activeStep={activeStep} />
      <StepItem step={2} activeStep={activeStep} label="Verification" />
      <ProgressLine step={2} activeStep={activeStep} />
      <StepItem step={3} activeStep={activeStep} label="Vetting" />
      <ProgressLine step={3} activeStep={activeStep} />
      <StepItem step={4} activeStep={activeStep} label="Whitelisting" />
      <ProgressLine step={4} activeStep={activeStep} />
      <StepItem step={5} activeStep={activeStep} label="Disbursement" />
    </Flex>
  );
};

export { MultiStepHeaderBen };

const StepItem = ({ step, activeStep, label }: { step: number; activeStep: number; label: string }) => {
  const isActive = activeStep === step;
  const isApproved = activeStep > step;
  return (
    <Flex flexDir="column" gap="8px" alignItems="center" boxSize="80px">
      <Flex
        w="56px"
        h="56px"
        borderRadius="50%"
        border="2px dashed"
        borderColor={isActive ? 'secondary.600' : isApproved ? 'primary.400' : 'grey.300'}
        // p="8px"
        justifyContent="center"
        alignItems="center"
        transition="all 0.3s ease-in-out"
      >
        <Flex
          w="40px"
          h="40px"
          bg={isActive ? 'secondary.200' : isApproved ? 'primary.200' : 'grey.200'}
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          transition="all 0.3s ease-in-out"
        >
          <Text color={isActive ? 'black' : isApproved ? 'grey.500' : 'grey.400'} transition="all 0.3s ease-in-out">
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
  const isActive = activeStep === step;
  const isApproved = activeStep > step;
  return (
    <Box
      w="48px"
      border="1px solid"
      borderColor={isActive ? 'secondary.200' : isApproved ? 'primary.400' : 'grey.300'}
      h="0"
      mt="28px"
      transition="all 0.3s ease-in-out"
    />
  );
};
