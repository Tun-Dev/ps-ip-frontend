'use client';

import { Grid, Spinner, Text } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import BeneficiaryPage from '../components/beneficiary-page';
import ViewProgress from '../components/view-progress';

const MODULES_WITH_FORMS = ['Application', 'Enumeration', 'Vetting', 'Survey'];

const BeneficiaryDashboard = () => {
  const { programId } = useParams();

  const { data: programForm, isLoading, error } = useGetProgramForm(programId.toString());

  const statusCode = isAxiosError(error) ? error.response?.data.statusCode : null;

  const hasForm = MODULES_WITH_FORMS.includes(programForm?.body.moduleName ?? '');

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (error && statusCode !== 404)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  if (hasForm) return <BeneficiaryPage />;

  return <ViewProgress />;
};

export default BeneficiaryDashboard;
