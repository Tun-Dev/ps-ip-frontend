'use client';

// import { useGetPrograms } from '@/hooks/useGetPrograms';
import { useEditVettingOfficers } from '@/hooks/useEditVettingOfficers';
import { VettingOfficersDetails } from '@/types';
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
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues: VettingOfficersDetails;
};

const Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  role: z.string().min(1, 'Role is required'),
  // gender: z.string().min(1, 'Gender is required'),
});

type FormValues = z.infer<typeof Schema>;

// const genderOptions = [
//   { label: 'Male', value: 'Male' },
//   { label: 'Female', value: 'Female' },
// ];

const roleOptions = [
  { label: 'Vetting Officer', value: 'Vetting Officer' },
  // { label: 'Super Admin', value: 'Super Admin' },
];

const EditUserModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const { mutate, isPending } = useEditVettingOfficers();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues: initialValues });

  const onSubmit = (data: FormValues) => {
    mutate(
      { id: initialValues.id, ...data },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      }
    );
    // mutate(data);
    // reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW="42.375rem" borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Add New User</Text>
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
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastName" variant="primary" {...register('lastName')} />
              <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="email" variant="primary" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={!!errors.gender} isRequired>
              <FormLabel htmlFor="gender">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Gender
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    id="gender"
                    variant="whiteDropdown"
                    placeholder="Gender"
                    name={name}
                    options={genderOptions}
                    value={genderOptions.find((option) => option.value === value)}
                    onChange={(selected) => selected && onChange(selected.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
            </FormControl> */}
            <FormControl isInvalid={!!errors.role} isRequired>
              <FormLabel htmlFor="gender">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Role
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="role"
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    isReadOnly
                    id="role"
                    variant="whiteDropdown"
                    placeholder="Role"
                    name={name}
                    options={roleOptions}
                    value={roleOptions.find((option) => option.value === value)}
                    onChange={(selected) => selected && onChange(selected.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" mt="3rem">
          <Button type="submit" variant="primary" w="full" h="3rem" maxW="25.125rem" isLoading={isPending}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { EditUserModal };
