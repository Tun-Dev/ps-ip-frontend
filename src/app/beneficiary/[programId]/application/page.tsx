'use client';

import { Grid, Spinner, Text } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import ModuleForm from '../../components/module-form';
import ModuleStatus from '../../components/module-status';
import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';

const BeneficiaryApplication = () => {
  const { programId } = useParams();
  console.log(programId);
  const code = useSearchParams().get('code') || '';
  const { isLoading, error, data } = useGetProgramForm(programId.toString());
  const { data: beneficiaryStatus } = useGetBeneficiaryStatus(code);

  console.log(data, beneficiaryStatus);

  console.log(code);

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  const statusCode = isAxiosError(error) ? error.response?.data.statusCode : null;

  if (error && statusCode !== 404)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  if (statusCode === 404 || (code && programId && data?.body.moduleName !== beneficiaryStatus?.body.currentModule))
    return <ModuleStatus />;

  return <ModuleForm />;
};

export default BeneficiaryApplication;
