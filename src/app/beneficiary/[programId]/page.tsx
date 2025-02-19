'use client';

import { Grid, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';
import BeneficiaryPage from '../components/beneficiary-page';
import ViewProgress from '../components/view-progress';

const BeneficiaryDashboard = () => {
  const { programId } = useParams();

  const { data, isPending, error, isError } = useGetProgramForm(`${programId}`);

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

  if (data.body.form) return <BeneficiaryPage />;

  return <ViewProgress />;
};

export default BeneficiaryDashboard;
