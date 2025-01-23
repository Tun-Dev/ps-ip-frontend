import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateAgent } from '@/hooks/useCreateAgent';
import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetStates } from '@/hooks/useGetStates';
import { useCallback, useMemo } from 'react';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    email: z.string().min(1, 'Email is required'),
    programId: z.string().min(1, 'Program is required'),
    interval: z.string().min(1, 'Interval is required'),
    objective: z.coerce.number().min(1),
    activationTime: z.string().min(1, 'Activation time is required'),
    lgaId: z.coerce.number().min(1, 'LGA is required'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof Schema>;

const INTERVALS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export const AddNewAgentModal = ({ isOpen, onClose }: ModalProps) => {
  const toast = useToast();
  const { mutate, isPending } = useCreateAgent(onClose);
  const { data: currentUser } = useGetCurrentUser();
  const { data: programs } = useGetAllAggregatorPrograms(isOpen);
  const { data: states } = useGetStates(isOpen);

  const programOptions = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return states.body.map((state) => ({
      label: state.name,
      options: state.LGAs.map((lga) => ({ label: lga.name, value: lga.id })),
    }));
  }, [states]);

  const currentLGA = useCallback(
    (value: number) => stateOptions.flatMap((state) => state.options).find((option) => option.value === value),
    [stateOptions]
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const aggregatorId = getAggregatorId(data.programId);

    if (!aggregatorId) return toast({ status: 'error', title: 'Aggregator not found' });

    mutate({
      aggregatorId,
      agents: [
        {
          programmeId: data.programId,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          programDetails: {
            activationTime: data.activationTime,
            programId: data.programId,
            objective: data.objective,
            lgaId: data.lgaId,
          },
        },
      ],
    });
  };

  const getAggregatorId = (programId: string) => {
    if (!currentUser) return null;
    let aggregatorId = '';
    currentUser.body.aggregator.forEach((aggregator) => {
      const aggregatorProgram = aggregator.aggregatorPrograms.find((program) => program.programId === programId);
      if (aggregatorProgram) aggregatorId = aggregatorProgram.id;
    });
    return aggregatorId;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        maxH="calc(100% - 3rem)"
        maxW="42.375rem"
        borderRadius="12px"
      >
        <ModalHeader>
          <Text variant="Body1Semibold">Add New Agent</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  First Name
                </Text>
              </FormLabel>
              <Input id="firstName" variant="primary" {...register('firstName')} />
              <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="lastName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastName" variant="primary" {...register('lastName')} />
              <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.programId}>
              <FormLabel htmlFor="programId">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Assign Program
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="programId"
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id="programId"
                    variant="whiteDropdown"
                    placeholder="Select program"
                    name={name}
                    options={programOptions}
                    value={programOptions?.find((option) => option.value === value)}
                    onChange={(value) => value && onChange(value.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lgaId}>
              <FormLabel htmlFor="lgaId">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Local Government Area to Enumerate
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="lgaId"
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id="lgaId"
                    variant="whiteDropdown"
                    placeholder="Select LGA"
                    name={name}
                    options={stateOptions}
                    value={currentLGA(value)}
                    onChange={(selected) => selected && onChange(selected.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.lgaId && errors.lgaId.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.objective}>
              <FormLabel htmlFor="objective">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Set Objective
                </Text>
              </FormLabel>
              <Input id="objective" variant="primary" type="number" placeholder="300" {...register('objective')} />
              <FormErrorMessage>{errors.objective && errors.objective.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.activationTime}>
              <FormLabel htmlFor="activationTime">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Schedule Activation
                </Text>
              </FormLabel>
              <SimpleGrid columns={2} alignItems="center" spacing="4">
                <Controller
                  control={control}
                  name="interval"
                  defaultValue="daily"
                  render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                    <Dropdown
                      id="interval"
                      variant="whiteDropdown"
                      placeholder="Select program"
                      name={name}
                      options={INTERVALS}
                      value={INTERVALS?.find((option) => option.value === value)}
                      onChange={(value) => value && onChange(value.value)}
                      onBlur={onBlur}
                      isDisabled={disabled}
                    />
                  )}
                />
                <Input id="activationTime" variant="primary" type="time" {...register('activationTime')} />
              </SimpleGrid>
              <FormErrorMessage>{errors.activationTime && errors.activationTime.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="email" type="email" variant="primary" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.dob}>
              <FormLabel htmlFor="dob">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Date of birth
                </Text>
              </FormLabel>
              <Input id="dob" type="date" variant="primary" {...register('dob')} />
              <FormErrorMessage>{errors.dob && errors.dob.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Password
                </Text>
              </FormLabel>
              <Input id="password" type="password" variant="primary" {...register('password')} />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Confirm Password
                </Text>
              </FormLabel>
              <Input id="confirmPassword" type="password" variant="primary" {...register('confirmPassword')} />
              <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="primary"
            w="full"
            h="3rem"
            maxW="25.125rem"
            isDisabled={hasErrors}
            isLoading={isPending}
          >
            Add New Agent
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
