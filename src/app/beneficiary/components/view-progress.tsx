'use client';

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({ code: z.string().min(1, 'User ID is required') });
type FormValues = z.infer<typeof Schema>;

const ViewProgress = () => {
  const router = useRouter();
  const { programId } = useParams();

  const form = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const searchParams = new URLSearchParams();
    searchParams.set('code', data.code);
    router.push(`/beneficiary/${programId}/fill?${searchParams.toString()}`);
  };

  return (
    <Stack
      as="form"
      flex="1"
      align="center"
      justify="center"
      gap="3rem"
      p="6"
      maxW="26.875rem"
      mx="auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Stack gap="4">
        <Stack gap="2">
          <Text as="h1" variant="Header1Bold">
            View Progress
          </Text>
          <Text variant="Body1Regular" color="grey.500">
            Welcome back. Please input your User Code.
          </Text>
        </Stack>
        <FormControl isInvalid={!!form.formState.errors.code}>
          <FormLabel htmlFor="code">
            <Text as="span" variant="Body2Semibold">
              User Code
            </Text>
          </FormLabel>
          <Input id="code" {...form.register('code')} isRequired />
          <FormErrorMessage>{form.formState.errors.code?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Button type="submit" variant="primary" size="default" w="full" isDisabled={hasErrors}>
        View Progress
      </Button>
    </Stack>
  );
};

export default ViewProgress;
