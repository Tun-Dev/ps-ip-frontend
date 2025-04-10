import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useProgramForm } from '@/providers/form-provider';
import { Dropdown } from '@/shared/chakra/components';
import { Flex, FlexProps, Icon, Input, Text, Textarea } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { BulletPointTextArea } from './bullet-point';
import { ProgramCover } from './program-cover';
import { ProgramImage } from './program-image';

const ProgramDetails = memo((props: FlexProps) => {
  const {
    form: { register, control, formState },
  } = useProgramForm();
  const { data: programTypes } = useGetProgramTypes();

  const options = useMemo(
    () => programTypes?.body.map((type) => ({ label: type.type, value: type.id })) ?? [],
    [programTypes]
  );

  const currentProgramType = useCallback(
    (value: number) => options.find((option) => option.value === value),
    [options]
  );

  return (
    <Flex h="full" w="full" flexDir="column" gap="24px" py="24px" {...props}>
      <Wrapper title="Program Logo">
        <ProgramImage hasError={!!formState.errors.logo} />
      </Wrapper>
      <Wrapper title="Cover Photo">
        <ProgramCover hasError={!!formState.errors.coverPhotoID} />
      </Wrapper>
      <Wrapper title="Program Name" maxW="34.625rem" icon>
        <Input border="1px dashed" borderColor={!!formState.errors.name ? 'red' : 'grey.300'} {...register('name')} />
      </Wrapper>
      <Wrapper title="Program Type" maxW="34.625rem" icon>
        <Controller
          control={control}
          name="programTypeId"
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="programTypeId"
              variant="whiteDropdown"
              chakraStyles={{
                control: (styles) => ({
                  ...styles,
                  outline: '1px dashed',
                  outlineColor: !!formState.errors.programTypeId ? 'red' : 'grey.300',
                  h: '10',
                  fontSize: '16px',
                  _placeholder: { color: 'grey.500' },
                }),
              }}
              name={name}
              options={options}
              value={currentProgramType(value) ?? ''}
              onChange={(value) => value && typeof value !== 'string' && onChange(value.value)}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          )}
        />
      </Wrapper>
      <Wrapper title="Description" icon>
        <Textarea
          border="1px dashed"
          borderColor={!!formState.errors.description ? 'red' : 'grey.300'}
          {...register('description')}
        />
      </Wrapper>
      <Wrapper title="Target Beneficiaries" maxW="34.625rem" icon>
        <Input
          type="number"
          onWheel={(e) => e.currentTarget.blur()}
          border="1px dashed"
          borderColor={!!formState.errors.target ? 'red' : 'grey.300'}
          {...register('target')}
        />
      </Wrapper>
      <Wrapper title="Eligibility Criteria" icon>
        <BulletPointTextArea />
      </Wrapper>
    </Flex>
  );
});

ProgramDetails.displayName = 'ProgramDetails';

type WrapperProps = React.PropsWithChildren<{ title: string; icon?: boolean }> & FlexProps;

const Wrapper = memo(({ children, title, icon, ...props }: WrapperProps) => {
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
});

Wrapper.displayName = 'Wrapper';

export default ProgramDetails;
