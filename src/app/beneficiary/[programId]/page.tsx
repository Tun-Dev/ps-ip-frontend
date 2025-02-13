'use client';

import { Grid, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import BeneficiaryPage from '../components/beneficiary-page';
import ViewProgress from '../components/view-progress';

const BeneficiaryDashboard = () => {
  const { programId } = useParams();

  const { data, isPending, error, isError } = useGetProgramForm(programId.toString());

  if (isPending)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (isError)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  if (data.body.form) return <BeneficiaryPage />;

  return <ViewProgress />;
};

export default BeneficiaryDashboard;
