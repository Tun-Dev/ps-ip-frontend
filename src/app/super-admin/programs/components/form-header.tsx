'use client';

import { Flex, Icon, Input, Stack } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useProgramForm } from '@/providers/form-provider';
import { Dropdown } from '@/shared/chakra/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { ProgramImage } from './program-image';

export function FormHeader() {
  const {
    register,
    control,
    formState: { errors },
  } = useProgramForm();
  const { data: programTypes } = useGetProgramTypes();

  const options = useMemo(
    () => programTypes?.body.map((type) => ({ label: type.type, value: type.id })) ?? [],
    [programTypes]
  );

  return (
    <Stack spacing="3">
      <Flex align="center" gap="3">
        <ProgramImage hasError={!!errors.logo} />
        <Input
          placeholder="Program Name"
          border="1px dashed"
          borderColor={!!errors.name ? 'red' : 'grey.300'}
          {...register('name')}
        />
        <Controller
          control={control}
          name="programTypeId"
          defaultValue={0}
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="programTypeId"
              variant="whiteDropdown"
              placeholder="Program Type"
              chakraStyles={{
                control: (styles) => ({
                  ...styles,
                  outline: '1px dashed',
                  outlineColor: !!errors.programTypeId ? 'red' : 'grey.300',
                  h: '10',
                  fontSize: '16px',
                  _placeholder: { color: 'grey.500' },
                }),
              }}
              name={name}
              options={options}
              value={options?.find((option) => option.value === value)}
              onChange={(value) => value && onChange(value.value)}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          )}
        />
        <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />
      </Flex>
      <Flex align="center" gap="8px">
        <Input
          placeholder="Description"
          border="1px dashed"
          borderColor={!!errors.description ? 'red' : 'grey.300'}
          {...register('description')}
        />
        <Icon as={MdEdit} aria-label="Edit" color="primary.500" boxSize="3" />
      </Flex>
      <Flex align="center" gap="8px" w="fit-content">
        <Input
          placeholder="Target"
          type="number"
          border="1px dashed"
          borderColor={!!errors.target ? 'red' : 'grey.300'}
          {...register('target')}
        />
        <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />
      </Flex>
    </Stack>
  );
}
