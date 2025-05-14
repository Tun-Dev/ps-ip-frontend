import { Box, Button, Flex, Grid, Icon, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetModules } from '@/hooks/useGetModules';
import type { ModuleDetail } from '@/types';
import { formatDateForInput, getImageUrl } from '@/utils';
import { Image } from '@chakra-ui/next-js';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

type Props = {
  module: ModuleDetail;
  beneficiaryId: string;
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

    const payload = { status, moduleId, programId: programID.toString(), beneficiaryId: [beneficiaryId] };

    approveBeneficiary(payload, {
      onSuccess: () => {
        toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
      },
    });
  };

  return (
    <Box>
      <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem" mb="4rem">
        {module?.verifications?.map((answer) => {
          const value = formatValue(answer.value, answer.type);
          return (
            <Box key={answer.type}>
              <Flex gap="1" align="center" mb="2">
                <Text variant="Body2Semibold" color="grey.500">
                  {answer.type}
                </Text>
                {answer.status === true ? (
                  <Icon as={MdCheckCircle} color="green" />
                ) : answer.status === false ? (
                  <Icon as={MdCancel} color="red" />
                ) : null}
              </Flex>
              {answer.type === 'Picture' && typeof answer.value === 'string' ? (
                <Box pos="relative" boxSize="6.25rem" rounded="sm" overflow="hidden">
                  <Image
                    src={getImageUrl(answer.value)}
                    alt="Beneficiary Image"
                    sizes="6.25rem"
                    sx={{ objectFit: 'cover' }}
                    fill
                  />
                </Box>
              ) : (
                <Text variant="Body1Regular">{value}</Text>
              )}
            </Box>
          );
        })}
        {module?.formAnswers?.map((answer) => {
          const value = formatValue(answer.value, answer.key);
          return (
            <Box key={answer.key}>
              <Text variant="Body2Semibold" color="grey.500" mb="2">
                {answer.key}
              </Text>
              {answer.key === 'Picture' && typeof answer.value === 'string' && answer.value ? (
                <Box pos="relative" boxSize="6.25rem" rounded="sm" overflow="hidden">
                  <Image
                    src={getImageUrl(answer.value)}
                    alt="Beneficiary Image"
                    sizes="6.25rem"
                    sx={{ objectFit: 'cover' }}
                    fill
                  />
                </Box>
              ) : (
                <Text variant="Body1Regular">{value || 'N/A'}</Text>
              )}
            </Box>
          );
        })}
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

const formatValue = (value: string, type: string) => {
  if (type === 'Date of Birth') return formatDateForInput(value);
  if (type === 'Phone Number') return '0' + parsePhoneNumber(value).nationalNumber;
  return value;
};

export default ModuleTab;
