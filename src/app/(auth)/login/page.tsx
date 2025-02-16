'use client';

import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetUser } from '@/hooks/useGetUser';
import { useLogin } from '@/hooks/useLogin';
import { PasswordInput } from '@/shared/chakra/components/password-input';

const Schema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof Schema>;

const SignInPage = () => {
  const { mutate, isPending, isSuccess } = useLogin();

  const { isLoading } = useGetUser(isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;
  console.log('🚀 ~ SignInPage ~ errors:', errors);

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <Flex as="form" flexDir="column" w="480px" gap="24px" onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="8px">
        <Text variant="Header2Bold">Sign in</Text>
        <Text variant="Body1Regular" color="grey.500">
          Welcome back. Please input your detail.
        </Text>
      </Flex>

      <Flex flexDir="column" gap="16px">
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              Email
            </Text>
          </FormLabel>
          <Input
            id="email"
            type="email"
            variant="primary"
            placeholder="Input email"
            autoComplete="email"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              Password
            </Text>
          </FormLabel>
          <PasswordInput
            id="password"
            placeholder="Input password"
            autoComplete="current-password"
            {...register('password')}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Button
        type="submit"
        variant="primary"
        w="full"
        h="48px"
        mt="12px"
        isDisabled={hasErrors}
        isLoading={isPending || isLoading}
      >
        Sign in
      </Button>
    </Flex>
  );
};

export default SignInPage;
