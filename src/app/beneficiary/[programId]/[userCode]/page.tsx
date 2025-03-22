'use client';

import { useParams } from 'next/navigation';

import { useGetBeneficiaryForm } from '@/hooks/useGetBeneficiaryForm';
import { formatErrorMessage } from '@/utils';
import { Grid, Spinner, Stack, Text } from '@chakra-ui/react';
import ModuleForm from '../../components/module-form';
import ModuleStatus from '../../components/module-status';

export default function BeneficiaryUserPage() {
  const { programId, userCode } = useParams();
  const { data, isPending, isError, error } = useGetBeneficiaryForm(`${programId}`, `${userCode}`);

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

  return (
    <Stack py="6" px={{ base: '4', xs: '10' }} gap="4" flex="1">
      {data.body.form ? (
        <>
          <Text variant="Body1Semibold">
            Hello {data.body.user.firstName} {data.body.user.lastName}! 👋🏽
          </Text>
          <ModuleForm beneficiaryForm={data.body.form.body} moduleName={data.body?.moduleName} />
        </>
      ) : (
        <ModuleStatus user={data.body.user} />
      )}
    </Stack>
  );
}
