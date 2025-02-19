import { Text, useCheckbox } from '@chakra-ui/react';

export function CustomCheckbox(props) {
  const { getCheckboxProps, getInputProps, htmlProps } = useCheckbox(props);
  return (
    <label {...htmlProps}>
      <input {...getInputProps()} />
      <Text
        {...getCheckboxProps()}
        as="div"
        variant="Body1Semibold"
        cursor="pointer"
        border="1px solid"
        borderColor="grey.200"
        borderRadius="full"
        color="grey.500"
        p="0.375rem 0.6875rem"
        _checked={{ bgColor: 'secondary.100', color: 'text', borderColor: 'secondary.500' }}
        _focusVisible={{ boxShadow: 'outline' }}
      >
        {props.label}
      </Text>
    </label>
  );
}
