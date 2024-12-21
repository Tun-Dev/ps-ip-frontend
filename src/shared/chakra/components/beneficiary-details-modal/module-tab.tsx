import { Box, Button, Grid, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetModules } from '@/hooks/useGetModules';
import type { ModuleDetail } from '@/types';

type Props = {
  module: ModuleDetail;
  beneficiaryId: number;
  status?: string;
};

function ModuleTab({ module, beneficiaryId, status }: Props) {
  const toast = useToast();
  const { programID } = useParams();

  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { data: modules } = useGetModules();

  const onApprove = (status: string) => {
    const moduleId = modules?.body.find((mod) => mod.name === module.moduleName)?.id;

    if (!moduleId) return toast({ title: 'Module not found', status: 'error' });

    const payload = { status, moduleId, programId: Number(programID), beneficiaryId: [beneficiaryId] };

    approveBeneficiary(payload, {
      onSuccess: () => {
        toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
      },
    });
  };

  return (
    <Box>
      <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem" mb="4rem">
        {module?.formAnswers?.map((answer) => (
          <Box key={answer.key}>
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              {answer.key}
            </Text>
            <Text variant="Body1Regular">{answer.value}</Text>
          </Box>
        ))}
      </Grid>
      {status === 'PENDING' && (
        <Grid templateColumns="1fr 1fr" gap="6">
          <Button variant="accept" w="full" size="default" onClick={() => onApprove('APPROVED')}>
            Approve
          </Button>
          <Button variant="cancel" w="full" size="default" onClick={() => onApprove('DISAPPROVED')}>
            Deny
          </Button>
        </Grid>
      )}
    </Box>
  );
}

export default ModuleTab;
