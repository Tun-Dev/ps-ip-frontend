'use client';

import { Button, Stack, Text } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { LocationPermissionModal } from '@/shared/chakra/modals/location-permission-modal';

const BeneficiaryPage = () => {
  const router = useRouter();
  const { programId } = useParams();

  const { data: programForm } = useGetProgramForm(`${programId}`);

  const handleApplication = () => {
    const route =
      programForm?.body.moduleName === 'Application'
        ? `/beneficiary/${programId}/details`
        : `/beneficiary/${programId}/fill`;
    router.push(route);
  };

  return (
    <Stack align="center" justify="center" gap="4" p="6" flex="1">
      <LocationPermissionModal />
      <Text maxW="289px" textAlign="center" variant="Body1Semibold" color="green.500">
        Are you using this portal for the first time?
      </Text>
      <Button variant="primary" h="48px" w="320px" onClick={handleApplication}>
        Take {programForm?.body.moduleName}
      </Button>
      <Text>or</Text>
      <Text maxW="289px" textAlign="center" variant="Body1Semibold" color="green.500">
        Are you a returning candidate?
      </Text>
      <Button variant="secondary" h="48px" w="320px" onClick={() => router.push(`/beneficiary/${programId}/progress`)}>
        View your Progress
      </Button>
    </Stack>
  );
};

export default BeneficiaryPage;
