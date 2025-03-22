'use client';

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCheckBeneficiaryForm } from '@/hooks/useCheckBeneficiaryForm';
import { LocationPermissionModal } from '@/shared/chakra/modals/location-permission-modal';

const Schema = z.object({ code: z.string().min(1, 'User ID is required') });
type FormValues = z.infer<typeof Schema>;

const BeneficiaryPage = () => {
  const router = useRouter();
  const { programId } = useParams();

  const form = useForm<FormValues>({ resolver: zodResolver(Schema) });
  const { mutate, isPending } = useCheckBeneficiaryForm();

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onSubmit = ({ code: userCode }: FormValues) => {
    mutate(
      { programId: programId.toString(), userCode },
      {
        onSuccess: ({ body }) => router.push(`/beneficiary/${programId}/${body.user.userCode}`),
      }
    );
  };

  return (
    <Stack align="center" justify="center" gap="8" p="6" flex="1">
      <LocationPermissionModal />
      <Stack gap="6">
        <Text textAlign="center" variant="Body1Semibold" color="primary.500">
          Are you using this portal for the first time?
        </Text>
        <Button as={Link} variant="primary" h="12" w="full" maxW="20rem" href={`/beneficiary/${programId}/details`}>
          Take Application
        </Button>
      </Stack>
      <Text>or</Text>
      <Stack as="form" gap="4" w="full" maxW="26.875rem" mx="auto" onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap="2">
          <Text textAlign="center" variant="Body1Semibold" color="primary.500">
            Are you a returning candidate?
          </Text>
          <Text textAlign="center" variant="Body1Regular" color="grey.500">
            Welcome back. Please input your User ID.
          </Text>
        </Stack>
        <Stack gap="12">
          <FormControl isInvalid={!!form.formState.errors.code}>
            <FormLabel htmlFor="code">
              <Text as="span" variant="Body2Semibold">
                User Code
              </Text>
            </FormLabel>
            <Input id="code" {...form.register('code')} isRequired />
            <FormErrorMessage>{form.formState.errors.code?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" variant="secondary" h="12" w="full" isDisabled={hasErrors} isLoading={isPending}>
            View your Progress
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BeneficiaryPage;
