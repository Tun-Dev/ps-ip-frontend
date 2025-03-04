'use client';

import { useGetPrograms } from '@/hooks/useGetPrograms';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z.object({
  name: z.string().min(1, 'name is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.string().min(1, 'Gender is required'),
  programId: z.string().min(1, 'Program is required'),
});

type FormValues = z.infer<typeof Schema>;

const AddNewUserModal = ({ isOpen, onClose }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const programOptions = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
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
      { label: 'Vetting Officer', value: 'Male' },
      { label: 'Super Admin', value: 'Super Admin' },
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
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel htmlFor="firstName">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Name
                </Text>
              </FormLabel>
              <Input id="firstName" variant="primary" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
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
          <Button type="submit" variant="primary" w="full" h="3rem" maxW="25.125rem">
            Add New Agent
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddNewUserModal };
