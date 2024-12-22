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
  Stack,
  Text,
  Divider,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateAggregator } from '@/hooks/useCreateAggregator';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    maxAgents: z.coerce.number().min(1),
    programId: z.coerce.number().min(1, 'Program is required'),
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    contactEmail: z.string().min(1, 'Corporate Email is required'),
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    contactPhone: z
      .string()
      .nonempty('Phone number is required')
      // Accept only 10 digits, not starting with 0
      .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits and cannot start with 0'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof Schema>;

const AggregatorModal = ({ isOpen, onClose }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });

  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const { mutate, isPending } = useCreateAggregator(onClose);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      ...data,
      phoneNumber: `+234${data.contactPhone}`,
    };

    mutate(formattedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        minH="35rem"
        maxH="calc(100vh - 10rem)"
        borderRadius="12px"
      >
        <ModalHeader>
          <Text variant="Body1Semibold">Add New Aggregator</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <Stack spacing="5">
            <Text variant="Body1Semibold">Corporate Details</Text>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Aggregator Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.maxAgents}>
              <FormLabel htmlFor="maxAgents">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Set Maximum Agents
                </Text>
              </FormLabel>
              <Input id="maxAgents" variant="primary" type="number" placeholder="300" {...register('maxAgents')} />
              <FormErrorMessage>{errors.maxAgents && errors.maxAgents.message}</FormErrorMessage>
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
                defaultValue={0}
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id="programId"
                    variant="whiteDropdown"
                    placeholder="Select program"
                    name={name}
                    options={options}
                    value={options?.find((option) => parseInt(option.value) === value)}
                    onChange={(value) => value && onChange(value.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="corporateEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Corporate Email
                </Text>
              </FormLabel>
              <Input id="corporateEmail" type="email" variant="primary" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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

            <Divider orientation="horizontal" />

            <Text variant="Body1Semibold">Contact Information</Text>
            <FormControl isInvalid={!!errors.firstname}>
              <FormLabel htmlFor="firstname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  First Name
                </Text>
              </FormLabel>
              <Input id="firstname" variant="primary" {...register('firstname')} />
              <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastname}>
              <FormLabel htmlFor="lastname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastname" variant="primary" {...register('lastname')} />
              <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactEmail}>
              <FormLabel htmlFor="contactEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="email" type="email" variant="primary" {...register('contactEmail')} />
              <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactPhone}>
              <FormLabel htmlFor="contactPhone">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Phone number
                </Text>
              </FormLabel>
              <InputGroup>
                <InputLeftAddon>+234</InputLeftAddon>
                <Input id="contactPhone" type="tel" variant="primary" {...register('contactPhone')} />
              </InputGroup>
              <FormErrorMessage>{errors.contactPhone && errors.contactPhone.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            variant="primary"
            width="402px"
            height="48px"
            isDisabled={hasErrors}
            isLoading={isPending}
          >
            Add New Aggregator
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AggregatorModal };
