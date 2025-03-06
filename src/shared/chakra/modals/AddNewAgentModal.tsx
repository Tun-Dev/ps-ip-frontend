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
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Fragment, useCallback, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateAgent } from '@/hooks/useCreateAgent';
import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetStates } from '@/hooks/useGetStates';
import { AgentProgramDetails } from '@/types';
import { Dropdown } from '../components';
import { PhoneNumberInput } from '../components/phone-number-input';

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
  programDetails: z.array(
    z.object({
      programId: z.string().min(1, 'Program is required'),
      objective: z.coerce.number().min(1),
      lgaId: z.coerce.number().min(1, 'LGA is required'),
    })
  ),
});

type FormValues = z.infer<typeof Schema>;

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const AddNewAgentModal = ({ isOpen, onClose }: ModalProps) => {
  const toast = useToast();
  const { mutate, isPending } = useCreateAgent(onSuccess);
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
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const { fields, append, remove } = useFieldArray({ name: 'programDetails', control });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const aggregatorId = getAggregatorId(data.programDetails);

    if (!aggregatorId) return toast({ status: 'error', title: 'Aggregator not found' });

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

  const getAggregatorId = (programDetails: AgentProgramDetails[]) => {
    if (!currentUser || !currentUser.body.aggregator) return null;

    const aggregatorPrograms = currentUser.body.aggregator.aggregatorPrograms;

    if (aggregatorPrograms.length < 1) return null;

    if (programDetails.length < 1) return aggregatorPrograms[0].id;

    const aggregatorProgram = aggregatorPrograms.find((program) => program.programId === programDetails[0].programId);

    if (aggregatorProgram) return aggregatorProgram.id;

    return null;
  };

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
              <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
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
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <FormControl isInvalid={!!errors.programDetails?.[index]?.programId}>
                  <Flex align="center" justify="space-between">
                    <FormLabel htmlFor={`programId-${field.id}`}>
                      <Text as="span" variant="Body2Semibold" color="grey.500">
                        {index === 0 ? 'Assign' : 'Additional'} Program
                      </Text>
                    </FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      fontWeight="500"
                      fontSize="0.8125rem"
                      color="red"
                      onClick={() => remove(index)}
                    >
                      Remove Program
                    </Button>
                  </Flex>
                  <Controller
                    control={control}
                    name={`programDetails.${index}.programId`}
                    render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                      <Dropdown
                        id={`programId-${field.id}`}
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
                    {errors.programDetails?.[index]?.programId && errors.programDetails?.[index]?.programId.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.programDetails?.[index]?.lgaId}>
                  <FormLabel htmlFor={`lgaId-${field.id}`}>
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Local Government Area to Enumerate
                    </Text>
                  </FormLabel>
                  <Controller
                    control={control}
                    name={`programDetails.${index}.lgaId`}
                    render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                      <Dropdown
                        id={`lgaId-${field.id}`}
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
                  <FormErrorMessage>
                    {errors.programDetails?.[index]?.lgaId && errors.programDetails?.[index]?.lgaId.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.programDetails?.[index]?.objective}>
                  <FormLabel htmlFor={`objective-${field.id}`}>
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Set Objective
                    </Text>
                  </FormLabel>
                  <Input
                    id={`objective-${field.id}`}
                    variant="primary"
                    type="number"
                    placeholder="300"
                    {...register(`programDetails.${index}.objective`)}
                  />
                  <FormErrorMessage>
                    {errors.programDetails?.[index]?.objective && errors.programDetails?.[index]?.objective.message}
                  </FormErrorMessage>
                </FormControl>
              </Fragment>
            ))}
            <Button
              type="button"
              variant="link"
              fontWeight="500"
              fontSize="0.8125rem"
              color="grey.500"
              display="inline-block"
              ml="auto"
              onClick={() => append({ programId: '', objective: 0, lgaId: 0 })}
            >
              {fields.length < 1 ? 'Assign Program' : 'Add Additional Program'}
            </Button>
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
