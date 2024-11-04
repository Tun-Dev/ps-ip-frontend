'use client';

import React, { useState } from 'react';

import { MultiStepHeaderBen } from '../components/MultiStepHeaderBen';
import { Box, Button, Flex, Icon, Text, Input, Image } from '@chakra-ui/react';
import { InputContainer } from '../components/InputContainer';
import { MdCheckCircle, MdInfo, MdOutlineAddCircle, MdRefresh } from 'react-icons/md';
import { Dropdown } from '@/components';
import { useRouter } from 'next/navigation';

const BeneficiaryApplication = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    if (activeStep < 5) {
      setActiveStep((prev: number) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep((prev: number) => prev - 1);
    } else {
      router.push('/beneficiary');
    }
  };

  return (
    <Flex flexDir="column" h="full" borderRadius="12px" overflow="hidden">
      <Flex h="180px" bg="url(/images/benHeader2.png)" p="18px 24px" pos="relative" alignItems="flex-end">
        <Box
          bg="linear-gradient(0deg, rgba(7, 125, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)"
          pos="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
        />
        <Flex justifyContent="space-between" alignItems="center" h="fit-content" w="full" zIndex={2}>
          <Text variant="Header1Bold" color="white">
            Investment in digital Creative Enterprises Program (IDICE)
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" p="24px" flex="1 1 0%">
        <Box borderBottom="1px solid" borderBottomColor="grey.200" pb="24px">
          <MultiStepHeaderBen activeStep={activeStep} />
        </Box>

        {/* Content for steps */}
        <Flex flex="1 1 0%" maxH="calc(100dvh - 494px)" overflow="auto" mt="24px" mb="48px" flexDir="column">
          {activeStep === 1 ? (
            <StepApplication />
          ) : activeStep === 2 ? (
            <PendingPages {...stepsT[0]} />
          ) : activeStep === 3 ? (
            <PendingPages {...stepsT[1]} />
          ) : activeStep === 4 ? (
            <PendingPages {...stepsT[2]} />
          ) : activeStep === 5 ? (
            <PendingPages {...stepsT[3]} />
          ) : null}
        </Flex>

        <Flex gap="16px" justifyContent="flex-end">
          <Button variant="secondary" w="242px" onClick={handlePreviousStep}>
            Back
          </Button>

          <Button variant="primary" w="242px" onClick={handleNextStep}>
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BeneficiaryApplication;

const StepApplication = () => {
  return (
    <Flex gap="24px" flexDir="column">
      <InputContainer labelText="Upload Picture">
        <Flex gap="24px">
          <Flex
            boxSize="96px"
            borderRadius="50%"
            border="2px dashed"
            borderColor="grey.300"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={MdOutlineAddCircle} boxSize="32px" color="primary.600" />
          </Flex>
          <Flex w="230px" gap="8px">
            <Icon as={MdInfo} boxSize="20px" color="grey.400" />
            <Text variant="Body2Regular" color="grey.400">
              Uploaded picture size should not exceed 500kb
            </Text>
          </Flex>
        </Flex>
      </InputContainer>
      <InputContainer labelText="Full Name">
        <Input placeholder="Beneficiary name" />
      </InputContainer>
      <InputContainer labelText="Date of Birth">
        <Input type="date" />
      </InputContainer>
      <InputContainer labelText="Phone Number">
        <Input placeholder="Beneficiary phone no" />
      </InputContainer>
      <InputContainer labelText="Local Government Area" pl="1px">
        <Dropdown variant="whiteDropdown" placeholder="Beneficiary LGA" />
      </InputContainer>
      <InputContainer labelText="Gender" pl="1px">
        <Dropdown variant="whiteDropdown" placeholder="Beneficiary gender" />
      </InputContainer>
      <InputContainer labelText="National Identity Number">
        <Input placeholder="Beneficiary NIN" />
      </InputContainer>
      <InputContainer labelText="Email">
        <Input placeholder="Beneficiary email" />
      </InputContainer>
      <InputContainer labelText="Address" w="full">
        <Input placeholder="Beneficiary address" />
      </InputContainer>
    </Flex>
  );
};

const PendingPages = ({
  stage,
  description,
  status,
  progress,
  estimatedTime,
  image,
}: {
  stage: string;
  description: string;
  status: string;
  progress: string;
  estimatedTime: string;
  image: string;
}) => {
  return (
    <Flex flexDir="column" alignItems="center" gap="80px">
      <Flex w="485px" p="14px" bg="primary.50" borderRadius="12px" boxShadow="banner" gap="8px">
        <Text variant="Body2Semibold" color="text">
          {stage}:
        </Text>
        <Text variant="Body2Regular" color="text">
          {description}
        </Text>
      </Flex>
      <Flex flexDir="column" gap="12px" alignItems="center">
        <Flex mb="4px" alignItems="center" gap="4px">
          <Text variant="Body1Semibold" color="text">
            {status}
          </Text>
          <Icon as={MdCheckCircle} boxSize="20px" color="primary.600" />
        </Flex>
        <Flex
          p="12px 16px"
          bg="primary.50"
          borderRadius="12px"
          flexDir="column"
          w="fit-content"
          boxShadow="banner"
          gap="12px"
          h="176px"
        >
          <Flex alignItems="center" gap="4px">
            <Text variant="Body2Semibold" color="primary.600">
              {progress}
            </Text>
            <Icon as={MdRefresh} color="secondary.600" boxSize="16px" />
          </Flex>

          <Flex flex="1 1 0%" justifyContent="center" alignItems="center">
            <Image src={image} alt="" height="100%" />
          </Flex>
        </Flex>
        <Text variant="Body2Regular" color="grey.500">
          {estimatedTime}
        </Text>
      </Flex>
    </Flex>
  );
};

const stepsT = [
  {
    stage: 'Verification',
    description:
      "During verification, we check your information against the federal government's database to validate your identity.",
    status: 'Your Application has been sent.',
    progress: 'Verification in Progress',
    estimatedTime: 'Estimated completion time - 3 working days',
    image: '/icons/undraw_authentication.svg',
  },
  {
    stage: 'Vetting',
    description:
      "Through vetting, we verify that you meet the program's requirements and are eligible to receive its benefits.",
    status: 'Congratulations, you have been verified.',
    progress: 'Vetting in Progress',
    estimatedTime: 'Estimated completion time - 3 working days',
    image: '/icons/undraw_following.svg',
  },
  {
    stage: 'Whitelisting',
    description: 'After vetting, the most eligible candidates are whitelisted and selected as beneficiaries.',
    status: 'Congratulations, you have been vetted.',
    progress: 'Whitelisting in Progress',
    estimatedTime: 'Estimated completion time - 3 working days',
    image: '/icons/undraw_followers.svg',
  },
  {
    stage: 'Disbursement',
    description:
      "Reaching the disbursement stage means you've been whitelisted and will receive the program's benefits soon.",
    status: 'Congratulations, you have been whitelisted.',
    progress: 'Disbursement in Progress',
    estimatedTime: 'Estimated completion time - 3 working days',
    image: '/icons/undraw_online_payments.svg',
  },
];
