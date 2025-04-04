'use client';

import { Grid, Spinner, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import { isAxiosError } from 'axios';
import ModuleForm from '../../components/module-form';

const BeneficiaryApplication = () => {
  const { programId } = useParams();
  const { isPending, error } = useGetProgramForm(`${programId}`);

  if (isPending)
    return (
      <Grid flex="1" placeItems="center">
        <Spinner />
      </Grid>
    );

  const statusCode = isAxiosError(error) ? error.response?.data.statusCode : null;

  if (error && statusCode !== 404)
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  return (
    <Stack py="6" px={{ base: '4', xs: '10' }} flex="1">
      <ModuleForm />
    </Stack>
  );
};

export default BeneficiaryApplication;
