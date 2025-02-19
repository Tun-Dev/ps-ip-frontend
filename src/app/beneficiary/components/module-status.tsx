'use client';

import { Image } from '@chakra-ui/next-js';
import { Box, Flex, Grid, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { MdCheckCircle, MdRefresh } from 'react-icons/md';

import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';
import { formatErrorMessage, MODULE_STATUS } from '@/utils';

export default function ModuleStatus() {
  const code = useSearchParams().get('code') || '';
  const { data: beneficiaryStatus, isPending, isError, error } = useGetBeneficiaryStatus(code);

  if (!code)
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          No User ID provided
        </Text>
      </Grid>
    );

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

  if (!beneficiaryStatus)
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          No data available
        </Text>
      </Grid>
    );

  const currentModule = beneficiaryStatus.body.currentModule;

  const moduleStatus = MODULE_STATUS[currentModule] || MODULE_STATUS.default;

  return (
    <Stack p="6" flex="1" gap="2.25rem" align="center" justify={{ xs: 'center' }}>
      <Flex
        maxW="30.3125rem"
        mx="auto"
        p="3.5"
        bgColor="primary.50"
        rounded="0.75rem"
        boxShadow="banner"
        gap={{ base: '1', xs: '2' }}
        flexDir={{ base: 'column', xs: 'row' }}
      >
        <Text variant="Body2Semibold" color="text">
          {beneficiaryStatus.body.currentModule}:
        </Text>
        <Text variant="Body2Regular" color="text">
          {moduleStatus.description}
        </Text>
      </Flex>
      <Stack gap="4" align="center">
        <Flex align="center" gap="1">
          <Text variant={{ base: 'Body2Semibold', xs: 'Body1Semibold' }} color="text">
            {moduleStatus.status}
          </Text>
          <Icon as={MdCheckCircle} boxSize="20px" color="primary.600" />
        </Flex>
        <Stack py="3" px="4" bgColor="primary.50" rounded="0.75rem" w="fit-content" boxShadow="banner" gap="0.75rem">
          <Flex alignItems="center" gap="4px">
            <Text variant="Body2Semibold" color="primary.600">
              {`${currentModule} in Progress`}
            </Text>
            <Icon as={MdRefresh} color="secondary.600" boxSize="16px" />
          </Flex>
          <Box pos="relative" h="7.5rem">
            <Image src={`/icons/${currentModule}.svg`} alt={currentModule} sx={{ objectFit: 'contain' }} fill />
          </Box>
        </Stack>
        <Text variant="Body2Regular" color="grey.500" textAlign="center">
          Estimated completion time - 3 working days
        </Text>
      </Stack>
    </Stack>
  );
}
