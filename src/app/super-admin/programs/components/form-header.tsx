'use client';

import { Flex, Stack, Text } from '@chakra-ui/react';

import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useProgramForm } from '@/providers/form-provider';
// import { Dropdown } from '@/shared/chakra/components';
import { ReactNode, useMemo } from 'react';
// import { Controller } from 'react-hook-form';
import { ProgramImage } from './program-image';

export function FormHeader() {
  const {
    // register,
    // control,
    formState: { errors },
    getValues,
  } = useProgramForm();
  const { data: programTypes } = useGetProgramTypes();

  const options = useMemo(
    () => programTypes?.body.map((type) => ({ label: type.type, value: type.id })) ?? [],
    [programTypes]
  );

  const name = getValues('name');
  const type = options?.find((item) => item.value === getValues('programTypeId'));
  const desc = getValues('description');
  const target = getValues('target');

  return (
    <Stack spacing="3">
      <Flex align="center" gap="3">
        <ProgramImage hasError={!!errors.logo} isReadOnly />
        <Wrapper title="Program Name:">
          <Text>{name}</Text>
        </Wrapper>
        <Wrapper title="Program Type:">
          <Text>{type?.label}</Text>
        </Wrapper>
      </Flex>
      <Wrapper title="Description:">
        <Text>{desc}</Text>
      </Wrapper>
      <Wrapper title="Target:">
        <Text>{target}</Text>
      </Wrapper>
    </Stack>
  );
}

const Wrapper = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <Flex
      border="1px dashed"
      borderColor="#D7D7D7"
      gap="8px"
      alignItems="center"
      p="8px 12px"
      borderRadius="8px"
      w="100%"
    >
      <Text variant="Body3Semibold" color="#7D7D7D">
        {title}
      </Text>
      {children}
    </Flex>
  );
};
