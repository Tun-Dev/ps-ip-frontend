import {
  Button,
  Flex,
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
  Stack,
  Text,
  //   useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateAgent } from '@/hooks/useCreateAgent';
import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
// import { useGetCurrentUser } from '@/hooks/useGetCur/rentUser';
// import { useGetStates } from '@/hooks/useGetStates';
// import { AgentProgramDetails } from '@/types';
import { Dropdown } from '../components';
import { PhoneNumberInput } from '../components/phone-number-input';
import { useGetAggregators } from '@/hooks/useGetAggregators';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
  email: z.string().min(1, 'Email is required'),
  gender: z.string().min(1, 'Gender is required'),
  aggregator: z.string().min(1, 'Aggregator is required'),
  programDetails: z.array(
    z.object({
      programId: z.string().min(1, 'Program is required'),
    })
  ),
});

type FormValues = z.infer<typeof Schema>;

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const AddNewAgentModalSuperAdmin = ({ isOpen, onClose }: ModalProps) => {
  //   const toast = useToast();
  const { mutate, isPending } = useCreateAgent(onSuccess);
  //   const { data: currentUser } = useGetCurrentUser();
  const { data: programs } = useGetAllAggregatorPrograms(isOpen);

  //   const { data: states } = useGetStates(isOpen);

  const { data: aggregators } = useGetAggregators({ page: 1, pageSize: 1000 });
  //   console.log(aggregators);

  const aggregatorOptions = useMemo(() => {
    if (!aggregators) return [];
    return aggregators.body.data.map((aggregator) => ({ label: aggregator.name, value: aggregator.id }));
  }, [aggregators]);

  const programOptions = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  //   const { fields } = useFieldArray({ name: 'programDetails', control });
  //   console.log(fields);

  const hasErrors = Object.keys(errors).length > 0;
  console.log(errors);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const aggregatorId = data.aggregator;
    // if (!aggregatorId) return toast({ status: 'error', title: 'Aggregator not found' });
    mutate({
      aggregatorId,
      agents: [
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          programDetails: data.programDetails,
        },
      ],
    });
  };

  //   const getAggregatorId = (programDetails: AgentProgramDetails[]) => {
  //     if (!currentUser || !currentUser.body.aggregator) return null;

  //     const aggregatorPrograms = currentUser.body.aggregator.aggregatorPrograms;

  //     if (aggregatorPrograms.length < 1) return null;

  //     if (programDetails.length < 1) return aggregatorPrograms[0].id;

  //     const aggregatorProgram = aggregatorPrograms.find((program) => program.programId === programDetails[0].programId);

  //     if (aggregatorProgram) return aggregatorProgram.id;

  //     return null;
  //   };

  function onSuccess() {
    onClose();
    reset();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW="42.375rem" borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Add New Agent</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.firstName} isRequired>
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  First Name
                </Text>
              </FormLabel>
              <Input id="firstName" variant="primary" {...register('firstName')} />
              <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} isRequired>
              <FormLabel htmlFor="lastName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastName" variant="primary" {...register('lastName')} />
              <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel htmlFor="email">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="email" type="email" variant="primary" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.gender} isRequired>
              <Flex align="center" justify="space-between">
                <FormLabel htmlFor={`programId-`}>
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Gender
                  </Text>
                </FormLabel>
              </Flex>
              <Controller
                control={control}
                name={`gender`}
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id={`gender`}
                    variant="whiteDropdown"
                    placeholder="Select gender"
                    name={name}
                    options={genderOptions}
                    value={genderOptions?.find((option) => option.value === value)}
                    onChange={(value) => value && onChange(value.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>
                {/* {errors.programDetails?.[index]?.programId && errors.programDetails?.[index]?.programId.message} */}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phoneNumber} isRequired>
              <FormLabel htmlFor="phoneNumber">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Phone number
                </Text>
              </FormLabel>
              <PhoneNumberInput id="phoneNumber" name="phoneNumber" control={control} />
              <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.aggregator} isRequired>
              <Flex align="center" justify="space-between">
                <FormLabel htmlFor={`programId-`}>
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Aggregator
                  </Text>
                </FormLabel>
              </Flex>
              <Controller
                control={control}
                name={`aggregator`}
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id={`aggregator`}
                    variant="whiteDropdown"
                    placeholder="Select Aggregator"
                    name={name}
                    options={aggregatorOptions}
                    value={aggregatorOptions?.find((option) => option.value === value)}
                    onChange={(value) => value && onChange(value.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.aggregator && errors.aggregator.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.programDetails?.[0]?.programId} isRequired>
              <Flex align="center" justify="space-between">
                <FormLabel htmlFor={`programId-`}>
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Program
                  </Text>
                </FormLabel>
              </Flex>
              <Controller
                control={control}
                name={`programDetails.${0}.programId`}
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id={`programId`}
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
              <FormErrorMessage>
                {errors.programDetails?.[0]?.programId && errors.programDetails?.[0]?.programId.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" mt="3rem">
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
