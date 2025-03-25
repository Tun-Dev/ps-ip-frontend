'use client';

import { Box, Button, Flex, Grid, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MdCancel, MdCheckCircle, MdLogout } from 'react-icons/md';

import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';
import { BeneficiaryForm } from '@/types';
import { formatErrorMessage, FormStatus, MODULE_STATUS } from '@/utils';
import { MultiStepHeaderBen } from './MultiStepHeaderBen';

type Props = {
  user: BeneficiaryForm['user'];
};

export default function ModuleStatus({ user }: Props) {
  const { programId } = useParams();
  const { data: beneficiaryStatus, isPending, isError, error } = useGetBeneficiaryStatus(user.userCode);

  if (isPending)
    return (
      <Grid flex="1" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (isError)
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  if (!beneficiaryStatus)
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          No data available
        </Text>
      </Grid>
    );

  const currentModule = beneficiaryStatus.body.currentModule as keyof typeof MODULE_STATUS;

  const moduleDescription = MODULE_STATUS[currentModule] || MODULE_STATUS.Application;

  return (
    <Stack flex="1" gap="10" align="stretch">
      <Box maxW="full" overflowX="auto">
        <MultiStepHeaderBen availableModules={beneficiaryStatus.body.availableModules} currentModule={currentModule} />
      </Box>
      <Stack flex="1" gap="7.5rem" align="stretch">
        <Flex
          maxW="27.625rem"
          mx="auto"
          p="3.5"
          bgColor="primary.50"
          rounded="0.75rem"
          boxShadow="banner"
          gap={{ base: '1', xs: '2' }}
          flexDir={{ base: 'column', xs: 'row' }}
        >
          <Text variant="Body2Semibold" color="text">
            {currentModule}:
          </Text>
          <Text variant="Body2Regular" color="text">
            {moduleDescription}
          </Text>
        </Flex>
        <Stack gap="10" maxW="21rem" mx="auto">
          <Stack gap="1" align="center">
            <Text variant={{ base: 'Body2Semibold', xs: 'Body1Semibold' }} textAlign="center">
              Hello {user.firstName} {user.lastName}! 👋🏽
            </Text>
            <Flex align="center" gap="1">
              <Text variant={{ base: 'Body2Semibold', xs: 'Body1Semibold' }} color="text">
                {beneficiaryStatus.body.status === FormStatus.DISAPPROVED
                  ? 'You were rejected from this program.'
                  : 'Your information has been recorded.'}
              </Text>
              {beneficiaryStatus.body.status === FormStatus.DISAPPROVED ? (
                <Icon as={MdCancel} boxSize="20px" color="red" />
              ) : (
                <Icon as={MdCheckCircle} boxSize="20px" color="primary.600" />
              )}
            </Flex>
          </Stack>
          <Button
            as={Link}
            variant="cancel"
            leftIcon={<Icon as={MdLogout} boxSize="4" color="red" />}
            w="full"
            bgColor="#FFD6D6"
            href={`/beneficiary/${programId}`}
          >
            <Text as="span" variant="Body2Bold">
              Log out
            </Text>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
