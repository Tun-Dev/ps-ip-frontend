'use client';

import { useParams } from 'next/navigation';

import { useGetBeneficiaryForm } from '@/hooks/useGetBeneficiaryForm';
import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';
import { formatErrorMessage } from '@/utils';
import { Grid, Spinner, Stack, Text } from '@chakra-ui/react';
import ModuleForm from '../../components/module-form';
import ModuleStatus from '../../components/module-status';

export default function BeneficiaryUserPage() {
  const { programId, userCode } = useParams();
  const { data, isPending, isError, error } = useGetBeneficiaryForm(`${programId}`, `${userCode}`);
  const { data: beneficiaryStatus } = useGetBeneficiaryStatus(userCode.toString());

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
      <Stack flex="1" gap="10" align="stretch">
        {beneficiaryStatus && <Text variant="Header1Bold">{beneficiaryStatus.body.currentModule}</Text>}
        {data.body.form ? (
          <Stack gap="4" flex="1" align="stretch">
            <Text variant="Body1Semibold">
              Hello {data.body.user.firstName} {data.body.user.lastName}! 👋🏽
            </Text>
            <ModuleForm beneficiaryForm={data.body} />
          </Stack>
        ) : (
          <ModuleStatus user={data.body.user} />
        )}
      </Stack>
    </Stack>
  );
}
