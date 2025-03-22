import { Input, type InputProps } from '@chakra-ui/react';
import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import RPNInput from 'react-phone-number-input/react-hook-form-input';

export function PhoneNumberInput<FormValues extends FieldValues>(
  props: ComponentProps<typeof RPNInput<InputProps, FormValues>>
) {
  return <RPNInput variant="primary" inputComponent={Input} country="NG" international={false} {...props} />;
}
