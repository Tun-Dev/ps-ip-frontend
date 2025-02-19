'use client';

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { MdInfo, MdOutlineAddCircle } from 'react-icons/md';

import { useUploadFile } from '@/hooks/useUploadFile';
import { Dropdown } from '@/shared/chakra/components';
import { PhoneNumberInput } from '@/shared/chakra/components/phone-number-input';
import { QuestionDetails } from '@/types';

type FormInputProps = {
  question: QuestionDetails;
  form: UseFormReturn;
  number?: number;
};

const FormInput = ({ question, form, number = 0 }: FormInputProps) => {
  const InputComponent = getFormInput(question.type);

  if (question.type === 'GPS') return <GPSInput question={question} form={form} />;

  return (
    <Box p="4" border="1px solid" borderColor="grey.200" borderRadius="1rem">
      <FormControl isInvalid={!!form.formState.errors[question.id]} isRequired={question.mandatory}>
        <FormLabel
          htmlFor={question.id}
          display="flex"
          gap="4"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={getSpacing(question.type)}
          requiredIndicator={
            <Text as="span" variant="Body3Semibold" color="grey.500" display="inline-flex" gap="0.375rem">
              Compulsory Question
              <Text as="span" variant="Body2Semibold" color="red">
                *
              </Text>
            </Text>
          }
        >
          <Text as="span" variant="Body2Semibold" color="text" display="inline-flex" gap="2.5" alignItems="center">
            <Text
              as="span"
              variant="Body2Semibold"
              bgColor="primary.500"
              minW="1.25rem"
              color="white"
              rounded="full"
              lineHeight="none"
              display="grid"
              placeItems="center"
              aspectRatio="1"
            >
              {number}
            </Text>
            {question.question}
          </Text>
        </FormLabel>
        <InputComponent question={question} form={form} />
        <FormErrorMessage px={question.type === 'UPLOAD' ? { xs: '1.875rem' } : undefined}>
          {form.formState.errors[question.id]?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

const TextInput = ({ question, form }: FormInputProps) => {
  return (
    <Input
      {...form.register(question.id)}
      id={question.id}
      type={getInputType(question.type)}
      isRequired={question.mandatory}
    />
  );
};

const TextareaInput = ({ question, form }: FormInputProps) => {
  return <Textarea {...form.register(question.id)} id={question.id} isRequired={question.mandatory} />;
};

const RadioInput = ({ question, form }: FormInputProps) => {
  return (
    <RadioGroup id={question.id}>
      <HStack gap="8">
        {question.options.map((option) => (
          <Radio {...form.register(question.id)} key={option.id} value={option.value} isRequired={question.mandatory}>
            <Text as="span" variant="Body2Semibold">
              {option.label}
            </Text>
          </Radio>
        ))}
      </HStack>
    </RadioGroup>
  );
};

const DropdownInput = ({ question, form }: FormInputProps) => {
  const options = question.options.map((option) => ({ label: option.label, value: option.value }));

  return (
    <Controller
      control={form.control}
      name={question.id}
      render={({ field: { name, onBlur, onChange, value, disabled } }) => (
        <Dropdown
          variant="whiteDropdown"
          id={question.id}
          name={name}
          options={options}
          value={options.find((option) => option.value === value)}
          onChange={(value) => value && onChange(value.value)}
          onBlur={onBlur}
          isDisabled={disabled}
          isRequired={question.mandatory}
        />
      )}
    />
  );
};

const ImageInput = ({ question, form }: FormInputProps) => {
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    e.target.value = '';

    uploadFile(
      { files: [file], type: 'beneficiaryDocs' },
      {
        onSuccess: (data) => form.setValue(question.id, data.body[0].fileName),
      }
    );
  };

  return (
    <Flex gap={{ base: '4', xs: '8' }} px={{ xs: '1.875rem' }} align="center">
      <Flex
        id={question.id}
        as="button"
        type="button"
        boxSize="6rem"
        borderRadius="50%"
        border="1px dashed"
        borderColor="grey.300"
        align="center"
        justify="center"
        pos="relative"
        outlineColor="transparent"
        overflow="hidden"
        _focusVisible={{ boxShadow: 'outline' }}
        onClick={() => inputRef.current?.click()}
        flexShrink="0"
      >
        <input type="file" hidden accept="image/*" onChange={handleFile} ref={inputRef} disabled={isPending} />
        {preview && (
          <Image src={preview} alt={question.question} objectFit="cover" pos="absolute" inset="0" boxSize="full" />
        )}
        {preview ? null : <Icon as={MdOutlineAddCircle} boxSize="8" color="secondary.500" />}
        {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
      </Flex>
      <Flex gap="2">
        <Icon as={MdInfo} boxSize="5" color="grey.400" />
        <Text variant="Body2Regular" color="grey.400" maxW="12.625rem">
          Uploaded picture size should not exceed 500kb
        </Text>
      </Flex>
    </Flex>
  );
};

const PhoneInput = ({ question, form }: FormInputProps) => {
  return (
    <PhoneNumberInput id={question.id} name={question.id} control={form.control} isRequired={question.mandatory} />
  );
};

const GPSInput = ({ question, form }: FormInputProps) => {
  const toast = useToast();

  useEffect(() => {
    if (!navigator) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue(question.id, `${position.coords.latitude},${position.coords.longitude}`);
      },
      () => toast({ status: 'error', title: 'Error', description: 'Please allow location access to proceed' })
    );
  }, [toast, form, question]);

  return <Input type="hidden" {...form.register(question.id)} />;
};

const getFormInput = (type: string) => {
  switch (type) {
    case 'LONG_TEXT':
      return TextareaInput;
    case 'DROPDOWN':
      return DropdownInput;
    case 'UPLOAD':
      return ImageInput;
    case 'CHECKBOX':
    case 'MULTIPLE_CHOICE':
      return RadioInput;
    case 'PHONE_NUMBER':
      return PhoneInput;
    default:
      return TextInput;
  }
};

const getInputType = (type: string): HTMLInputTypeAttribute => {
  switch (type) {
    case 'DATE':
      return 'date';
    case 'UPLOAD':
      return 'file';
    case 'EMAIL':
      return 'email';
    case 'PHONE_NUMBER':
      return 'tel';
    case 'NUMBER':
    case 'KYC':
      return 'number';
    default:
      return 'text';
  }
};

const getSpacing = (type: string) => {
  switch (type) {
    case 'UPLOAD':
      return '1.5rem';
    case 'CHECKBOX':
    case 'MULTIPLE_CHOICE':
      return '1rem';
    default:
      return '0.75rem';
  }
};

export default FormInput;
