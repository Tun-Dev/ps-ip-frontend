import {
  Button,
  Divider,
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
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateAggregator } from '@/hooks/useCreateAggregator';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
import { PhoneNumberInput } from '@/shared/chakra/components/phone-number-input';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  maxAgents: z.coerce.number().min(1),
  programId: z.string().min(1, 'Program is required'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  contactEmail: z.string().min(1, 'Corporate Email is required'),
  email: z.string().min(1, 'Email is required'),
  contactPhone: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
});

type FormValues = z.infer<typeof Schema>;

const AggregatorModal = ({ isOpen, onClose }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });

  const options = useMemo(() => {
    if (!programs) return [];
    return programs.body.data.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const { mutate, isPending } = useCreateAggregator();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = ({ maxAgents, programId, ...data }: FormValues) => {
    const formattedData = {
      ...data,
      programDetails: [{ programId, maxAgents }],
    };
    mutate(formattedData, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Add New Aggregator</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <Text variant="Body1Semibold">Corporate Details</Text>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Aggregator Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.maxAgents} isRequired>
              <FormLabel htmlFor="maxAgents">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Set Maximum Agents
                </Text>
              </FormLabel>
              <Input
                id="maxAgents"
                variant="primary"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="300"
                {...register('maxAgents')}
              />
              <FormErrorMessage>{errors.maxAgents && errors.maxAgents.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.programId} isRequired>
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
                    options={options}
                    value={options?.find((option) => option.value === value)}
                    onChange={(value) => value && onChange(value.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel htmlFor="corporateEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Corporate Email
                </Text>
              </FormLabel>
              <Input id="corporateEmail" type="email" variant="primary" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <Divider orientation="horizontal" />

            <Text variant="Body1Semibold">Contact Information</Text>
            <FormControl isInvalid={!!errors.firstname} isRequired>
              <FormLabel htmlFor="firstname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  First Name
                </Text>
              </FormLabel>
              <Input id="firstname" variant="primary" {...register('firstname')} />
              <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastname} isRequired>
              <FormLabel htmlFor="lastname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastname" variant="primary" {...register('lastname')} />
              <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactEmail} isRequired>
              <FormLabel htmlFor="contactEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="email" type="email" variant="primary" {...register('contactEmail')} />
              <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactPhone} isRequired>
              <FormLabel htmlFor="contactPhone">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Phone number
                </Text>
              </FormLabel>
              <PhoneNumberInput id="contactPhone" name="contactPhone" control={control} />
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
            Add Aggregator
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AggregatorModal };
