'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';

const Schema = z.object({ code: z.string().min(1, 'User ID is required') });
type FormValues = z.infer<typeof Schema>;

const ViewProgress = () => {
  const router = useRouter();
  const { programId } = useParams();

  const { data: programForm, isLoading, error } = useGetProgramForm(programId.toString());

  const form = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const searchParams = new URLSearchParams();
    searchParams.set('code', data.code);
    router.push(`/beneficiary/${programId}/fill?${searchParams.toString()}`);
  };

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (error)
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );

  return (
    <Flex flexDir="column" h="full" borderRadius="12px" overflow="hidden">
      <Flex h="272px" bg="url(/images/benHeader1.png)" p="12px 24px" pos="relative" alignItems="flex-end">
        <Box
          bg="linear-gradient(0deg, rgba(7, 125, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)"
          pos="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
        />
        <Flex justifyContent="space-between" alignItems="center" h="fit-content" w="full" zIndex={2}>
          <Text variant="Header1Bold" color="white">
            {programForm?.body.programName}
          </Text>
        </Flex>
      </Flex>
      <Flex
        as="form"
        flexDir="column"
        gap="16px"
        padding="24px"
        mx="auto"
        maxW="430px"
        mt="47px"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Flex flexDir="column" gap="4px">
          <Text variant="Body1Semibold">View Progress</Text>
          <Text>Welcome back. Please input your User Code.</Text>
        </Flex>
        <FormControl isInvalid={!!form.formState.errors.code} maxW="430px">
          <FormLabel htmlFor="code">
            <Text as="span" variant="Body2Semibold">
              User Code
            </Text>
          </FormLabel>
          <Input id="code" {...form.register('code')} isRequired />
          <FormErrorMessage>{form.formState.errors.code?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" variant="primary" h="48px" w="100%" mt={4} isDisabled={hasErrors}>
          View Progress
        </Button>
      </Flex>
    </Flex>
  );
};

export default ViewProgress;
