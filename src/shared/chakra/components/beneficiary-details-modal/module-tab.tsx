import { Box, Button, Flex, Grid, Icon, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetModules } from '@/hooks/useGetModules';
import type { FormAnswer, ModuleDetail } from '@/types';
import { formatDateForInput, getImageUrl, snakeToTitleCase } from '@/utils';
import { Image } from '@chakra-ui/next-js';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import { Dispatch, SetStateAction } from 'react';
import { MdCancel, MdCheckCircle, MdImage, MdInsertDriveFile } from 'react-icons/md';

type Props = {
  module: ModuleDetail;
  beneficiaryId: string;
  setMedia: Dispatch<SetStateAction<FormAnswer | null>>;
  status?: string;
  userCode?: string;
};

function ModuleTab({ module, beneficiaryId, status, userCode, setMedia }: Props) {
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
        {userCode && (module.moduleName === 'Application' || module.moduleName === 'Nomination') && (
          <Box>
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              User Code
            </Text>
            <Text variant="Body1Regular">{userCode || 'N/A'}</Text>
          </Box>
        )}
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
                <>
                  <Text variant="Body1Regular">{value}</Text>
                  {answer.status === false && (
                    <>
                      {!answer.verName || answer.verName === null ? (
                        <Text variant="Body3Semibold" color="red">
                          {`Invalid ${answer.title}`}
                        </Text>
                      ) : (
                        <>
                          <Text variant="Body3Semibold" color="red">
                            Name mismatch
                          </Text>
                          <Text variant="Body3Semibold" color="red">{`${answer.title} Name: ${answer.verName}`}</Text>
                          <Text variant="Body3Semibold" color="red">{`Match Score: ${answer.score}`}</Text>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          );
        })}
        {module?.formAnswers?.map((answer) => {
          const value = formatValue(answer.value, answer.key);
          const isFile = answer.question?.type === 'FILE_UPLOAD';
          const isImage = answer.question?.type === 'IMAGE_UPLOAD';
          const isUpload = isFile || isImage;
          return (
            <Box key={answer.key}>
              <Text variant="Body2Semibold" color="grey.500" mb="2">
                {module.moduleName === 'Nomination' ? snakeToTitleCase(answer.key) : answer.key}
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
              ) : isUpload ? (
                <Box
                  rounded="0.375rem"
                  overflow="hidden"
                  as="button"
                  type="button"
                  outlineColor="transparent"
                  _focusVisible={{ boxShadow: 'outline' }}
                  textAlign="left"
                  onClick={() => setMedia(answer)}
                >
                  <Grid py="2" bgColor="grey.100" placeItems="center">
                    <Icon as={isFile ? MdInsertDriveFile : MdImage} boxSize="8" color="grey.300" />
                  </Grid>
                  <Text variant="Body3Semibold" px="2" py="1" bgColor="primary.100" noOfLines={1}>
                    {answer.value.split('/').pop() || answer.value}
                  </Text>
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
  const transformedType = type.toLowerCase();
  if (transformedType === 'date of birth' || transformedType === 'date_of_birth' || transformedType === 'dob')
    return formatDateForInput(value);
  if (transformedType === 'phone number' || transformedType === 'phone')
    return '0' + parsePhoneNumber(value).nationalNumber;
  return value;
};

export default ModuleTab;
