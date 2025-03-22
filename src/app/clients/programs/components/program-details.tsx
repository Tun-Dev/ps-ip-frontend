import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useProgramForm } from '@/providers/form-provider';
import { Dropdown } from '@/shared/chakra/components';
import { BoxProps, Flex, FlexProps, Icon, Input, Text, Textarea } from '@chakra-ui/react';
import { memo, ReactNode, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { BulletPointTextArea } from './bullet-point';
import { ProgramCover } from './program-cover';
import { ProgramImage } from './program-image';

const ProgramDetails = memo((props: BoxProps) => {
  const {
    form: {
      setValue,
      control,
      formState: { errors },
      getValues,
      // register,
    },
  } = useProgramForm();
  const { data: programTypes } = useGetProgramTypes();

  const options = useMemo(
    () => programTypes?.body.map((type) => ({ label: type.type, value: type.id })) ?? [],
    [programTypes]
  );

  return (
    <Flex h="full" w="full" {...props} flexDir="column" gap="24px" py="24px">
      <Wrapper title="Program Logo">
        <ProgramImage hasError={!!errors.logo} />
      </Wrapper>
      <Wrapper title="Cover Photo">
        <ProgramCover hasError={!!errors.coverPhotoID} />
      </Wrapper>

      <Wrapper title="Program Name" maxW="34.625rem" icon>
        <Input
          //   placeholder="Program Name"
          border="1px dashed"
          borderColor={!!errors.name ? 'red' : 'grey.300'}
          onChange={(e) => setValue('name', e.target.value)}
          defaultValue={getValues('name')}
        />
      </Wrapper>

      <Wrapper title="Program Type" maxW="34.625rem" icon>
        <Controller
          control={control}
          name="programTypeId"
          defaultValue={getValues('programTypeId')}
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="programTypeId"
              variant="whiteDropdown"
              //   placeholder="Program Type"
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
              onChange={(selectedOption) => {
                onChange(selectedOption?.value ?? '');
                setValue('programTypeId', selectedOption?.value ?? 0);
              }}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          )}
        />
      </Wrapper>
      <Wrapper title="Description" icon>
        <Textarea
          //   placeholder="Description"
          border="1px dashed"
          borderColor={!!errors.description ? 'red' : 'grey.300'}
          onChange={(e) => setValue('description', e.target.value)}
          defaultValue={getValues('description')}
        />
      </Wrapper>
      <Wrapper title="Target Beneficiaries" maxW="34.625rem" icon>
        <Input
          //   placeholder="Target"
          type="number"
          border="1px dashed"
          borderColor={!!errors.target ? 'red' : 'grey.300'}
          onChange={(e) => setValue('target', Number(e.target.value))}
          defaultValue={getValues('target')}
        />
      </Wrapper>
      <Wrapper title="Eligibility Criteria" icon>
        <BulletPointTextArea />
      </Wrapper>
    </Flex>
  );
});

ProgramDetails.displayName = 'ProgramDetails';

export default ProgramDetails;

const Wrapper = ({
  children,
  title,
  icon,
  ...props
}: { children: ReactNode; title?: string; icon?: boolean } & FlexProps) => {
  return (
    <Flex flexDir="column" gap="8px" {...props}>
      <Flex gap="8px" alignItems="center">
        <Text color="#A4A4A4" variant="Body2Semibold">
          {title}
        </Text>
        {icon && <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />}
      </Flex>
      {children}
    </Flex>
  );
};
