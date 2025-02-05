'use client';

import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetStates } from '@/hooks/useGetStates';
import { useSignUpAgent } from '@/hooks/useSignUpAgent';
import { Dropdown } from '@/shared/chakra/components';
import { useCallback, useMemo } from 'react';

const Schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  stateOfOrigin: z.coerce.number(),
  LGAOfResidence: z.coerce.number(),
});

type FormValues = z.infer<typeof Schema>;

const SignUpPage = () => {
  const { mutate: signUp, isPending } = useSignUpAgent();
  const { data: states } = useGetStates();

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return states.body.map((state) => ({ label: state.name, value: state.id }));
  }, [states]);

  const currentState = useCallback(
    (value: number) => stateOptions.find((option) => option.value === value),
    [stateOptions]
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    signUp(data);
  };

  return (
    <Flex as="form" flexDir="column" w="480px" gap="24px" onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="8px">
        <Text variant="Header2Bold">Sign up</Text>
        <Text variant="Body1Regular" color="grey.500">
          Please input your details.
        </Text>
      </Flex>

      <Flex flexDir="column" gap="16px">
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              First Name
            </Text>
          </FormLabel>
          <Input
            id="firstName"
            variant="primary"
            placeholder="Input first name"
            autoComplete="firstName"
            {...register('firstName')}
          />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              Last Name
            </Text>
          </FormLabel>
          <Input
            id="lastName"
            variant="primary"
            placeholder="Input last name"
            autoComplete="lastName"
            {...register('lastName')}
          />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
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
        <FormControl isInvalid={!!errors.stateOfOrigin}>
          <FormLabel htmlFor="stateOfOrigin">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              State of Origin
            </Text>
          </FormLabel>
          <Controller
            control={control}
            name="stateOfOrigin"
            render={({ field: { name, onBlur, onChange, value, disabled } }) => (
              <Dropdown
                id="stateOfOrigin"
                variant="whiteDropdown"
                placeholder="Select state of origin"
                name={name}
                options={stateOptions}
                value={currentState(value)}
                onChange={(selected) => selected && onChange(selected.value)}
                onBlur={onBlur}
                isDisabled={disabled}
              />
            )}
          />
          <FormErrorMessage>{errors.stateOfOrigin && errors.stateOfOrigin.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.LGAOfResidence}>
          <FormLabel htmlFor="LGAOfResidence">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              State of Residence
            </Text>
          </FormLabel>
          <Controller
            control={control}
            name="LGAOfResidence"
            render={({ field: { name, onBlur, onChange, value, disabled } }) => (
              <Dropdown
                id="LGAOfResidence"
                variant="whiteDropdown"
                placeholder="Select state of residence"
                name={name}
                options={stateOptions}
                value={currentState(value)}
                onChange={(selected) => selected && onChange(selected.value)}
                onBlur={onBlur}
                isDisabled={disabled}
              />
            )}
          />
          <FormErrorMessage>{errors.LGAOfResidence && errors.LGAOfResidence.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Button type="submit" variant="primary" w="full" h="48px" mt="12px" isDisabled={hasErrors} isLoading={isPending}>
        Sign up
      </Button>
    </Flex>
  );
};

export default SignUpPage;
