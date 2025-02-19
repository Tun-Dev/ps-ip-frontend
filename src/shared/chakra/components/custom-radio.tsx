import { Text, useRadio } from '@chakra-ui/react';

export function CustomRadio(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  return (
    <label>
      <input {...getInputProps()} />
      <Text
        {...getRadioProps()}
        as="div"
        variant="Body2Semibold"
        cursor="pointer"
        border="1px solid"
        borderColor="grey.200"
        borderRadius="full"
        color="grey.500"
        px="6"
        py="0.5"
        _checked={{ bgColor: 'secondary.100', color: 'text', borderColor: 'secondary.500' }}
        _focusVisible={{ boxShadow: 'outline' }}
      >
        {props.children}
      </Text>
    </label>
  );
}
