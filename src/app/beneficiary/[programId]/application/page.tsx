'use client';

import { Grid, Spinner, Text } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import ModuleForm from '../../components/module-form';
import ModuleStatus from '../../components/module-status';

const BeneficiaryApplication = () => {
  const { programId } = useParams();
  const code = useSearchParams().get('code') || '';
  const { isLoading, error } = useGetProgramForm(programId.toString());

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

  if (statusCode === 404 || code) return <ModuleStatus />;

  return <ModuleForm />;
};

export default BeneficiaryApplication;
