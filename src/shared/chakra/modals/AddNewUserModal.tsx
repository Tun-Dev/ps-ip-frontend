'use client';

// import { useGetPrograms } from '@/hooks/useGetPrograms';
import { useCreateVettingOfficers } from '@/hooks/useCreateVettingOfficers';
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
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.string().min(1, 'Gender is required'),
});

type FormValues = z.infer<typeof Schema>;

const AddNewUserModal = ({ isOpen, onClose }: ModalProps) => {
  // const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  // const programOptions = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const { mutate, isPending } = useCreateVettingOfficers(() => {
    onClose();
    reset();
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormValues) => {
    mutate(data);
    // reset();
  };

  const genderOptions = useMemo(
    () => [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
    []
  );

  const currentGender = useCallback(
    (value: string | undefined) => (value ? genderOptions.find((option) => option.value === value) : undefined),
    [genderOptions]
  );

  const roleOptions = useMemo(
    () => [
      { label: 'Vetting Officer', value: 'Vetting Officer' },
      // { label: 'Super Admin', value: 'Super Admin' },
    ],
    []
  );

  const currentRole = useCallback(
    (value: string | undefined) => (value ? roleOptions.find((option) => option.value === value) : undefined),
    [roleOptions]
  );
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
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastname" variant="primary" {...register('lastname')} />
              <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
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
            <FormControl isInvalid={!!errors.gender} isRequired>
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
                    value={currentGender(value)}
                    onChange={(selected) => selected && onChange(selected.value)}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
            </FormControl>
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
                    id="role"
                    variant="whiteDropdown"
                    placeholder="Role"
                    name={name}
                    options={roleOptions}
                    value={currentRole(value)}
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
            Add New User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddNewUserModal };
