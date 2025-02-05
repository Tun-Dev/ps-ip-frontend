'use client';

import { Box, Flex, Grid, Icon, Image, Spinner, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { MdCheckCircle, MdRefresh } from 'react-icons/md';

import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';
import { formatErrorMessage } from '@/utils';
// import { MultiStepHeaderBen } from './MultiStepHeaderBen';

export default function ModuleStatus() {
  const code = useSearchParams().get('code') || '';
  const { data: beneficiaryStatus, isLoading, error } = useGetBeneficiaryStatus(code);

  if (!code)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          No User ID provided
        </Text>
      </Grid>
    );

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (error)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  if (!beneficiaryStatus)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          No data available
        </Text>
      </Grid>
    );

  const currentModule = beneficiaryStatus.body.currentModule;

  const moduleStatus = MODULE_STATUS[currentModule] || MODULE_STATUS.default;

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
            {beneficiaryStatus.body.programName}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" p="24px" flex="1 1 0%">
        {/* <Box borderBottom="1px solid" borderBottomColor="grey.200" pb="24px">
          <MultiStepHeaderBen
            currentModule={beneficiaryStatus.body.currentModule}
            availableModules={beneficiaryStatus.body.availableModules}
          />
        </Box> */}

        {/* Content for steps */}
        <Flex flex="1 1 0%" mt="24px" mb="48px" flexDir="column">
          <Flex flexDir="column" alignItems="center" gap="80px">
            <Flex w="485px" p="14px" bg="primary.50" borderRadius="12px" boxShadow="banner" gap="8px">
              <Text variant="Body2Semibold" color="text">
                {beneficiaryStatus.body.currentModule}:
              </Text>
              <Text variant="Body2Regular" color="text">
                {moduleStatus.description}
              </Text>
            </Flex>
            <Flex flexDir="column" gap="12px" alignItems="center">
              <Flex mb="4px" alignItems="center" gap="4px">
                <Text variant="Body1Semibold" color="text">
                  {moduleStatus.status}
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
                    {`${currentModule} in Progress`}
                  </Text>
                  <Icon as={MdRefresh} color="secondary.600" boxSize="16px" />
                </Flex>

                <Flex flex="1 1 0%" justifyContent="center" alignItems="center">
                  <Image src={`/icons/${currentModule}.svg`} alt={currentModule} height="100%" />
                </Flex>
              </Flex>
              <Text variant="Body2Regular" color="grey.500">
                Estimated completion time - 3 working days
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const MODULE_STATUS = {
  Application: {
    description: 'The initial step where you submit your information to be considered for the program.',
    status: 'Your application has been submitted.',
  },
  Enumeration: {
    description: 'A process to gather and record information about potential program participants.',
    status: 'Your information has been recorded.',
  },
  Nomination: {
    description: 'A selection process where potential participants are identified for the program.',
    status: 'You have been successfully nominated.',
  },
  Survey: {
    description: 'A data collection phase to better understand participant circumstances.',
    status: 'Your survey has been completed.',
  },
  Verification: {
    description: 'A process to validate your submitted information and confirm your identity.',
    status: 'Your Application has been sent.',
  },
  Vetting: {
    description: 'A review process to determine program eligibility.',
    status: 'Congratulations, you have been verified.',
  },
  Whitelisting: {
    description: 'The selection phase where eligible participants are approved for the program.',
    status: 'Congratulations, you have been vetted.',
  },
  Disbursement: {
    description: 'The final phase where program benefits are distributed to approved participants.',
    status: 'Congratulations, you have been whitelisted.',
  },
  default: {
    description: 'This is the default module status',
    status: 'This is the default status',
  },
};
