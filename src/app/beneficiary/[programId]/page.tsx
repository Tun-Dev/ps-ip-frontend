'use client';

import { Box, Button, Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';

const BeneficiaryDashboard = () => {
  const router = useRouter();
  const { programId } = useParams();

  const { data: programForm, isLoading, error } = useGetProgramForm(programId.toString());

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (error) {
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );
  }

  return (
    <Flex flexDir="column" h="full" borderRadius="12px" overflow="hidden">
      <Flex h="272px" bg="url(/images/benHeader1.png)" p="12px 24px" pos="relative" alignItems="flex-end">
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
            {programForm?.body.programName}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" alignItems="center" gap="16px" padding="24px" mt="47px">
        <Text maxW="289px" textAlign="center" variant="Body1Semibold" color="green.500">
          Are you using this portal for the first time?
        </Text>
        <Button variant="primary" h="48px" w="320px" onClick={() => router.push(`/beneficiary/${programId}/details`)}>
          Take Application
        </Button>
        <Text>or</Text>
        <Text maxW="289px" textAlign="center" variant="Body1Semibold" color="green.500">
          Are you a returning candidate?
        </Text>
        <Button variant="secondary" h="48px" w="320px" onClick={() => router.push(`/beneficiary/${programId}/verify`)}>
          View your Progress
        </Button>
      </Flex>
    </Flex>
  );
};

export default BeneficiaryDashboard;
