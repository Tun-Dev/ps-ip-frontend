'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { getBanks } from 'nigeria-banks-list';
import { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { MdInfo, MdOutlineAddCircle } from 'react-icons/md';

import { useGetStates } from '@/hooks/useGetStates';
import { useGetVerificationStatus } from '@/hooks/useGetVerificationStatus';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useVerifyData } from '@/hooks/useVerifyData';
import { Dropdown } from '@/shared/chakra/components';
import { PhoneNumberInput } from '@/shared/chakra/components/phone-number-input';
import { QuestionDetails } from '@/types';
import { fileSchema, getImageUrl, IdType } from '@/utils';
import { useParams } from 'next/navigation';
import Webcam from 'react-webcam';
import { isMobile } from 'react-device-detect';

type FormInputProps = {
  question: QuestionDetails;
  form: UseFormReturn;
  stateQuestionId?: string;
  previousStateQuestionId?: string;
  number?: number;
  inputOnly?: boolean;
};

const FormInput = ({
  question,
  form,
  number = 0,
  stateQuestionId,
  previousStateQuestionId,
  inputOnly,
}: FormInputProps) => {
  const InputComponent = getFormInput(question.type);

  if (question.type === 'GPS') return <GPSInput question={question} form={form} />;

  const isStateQuestion =
    question.type === 'DROPDOWN' &&
    (question.question.toLowerCase() === 'state' ||
      question.question.toLowerCase() === 'state of origin' ||
      question.question.toLowerCase() === 'previous state');

  const isLgaQuestion =
    question.type === 'DROPDOWN' &&
    (question.question.toLowerCase() === 'lga' || question.question.toLowerCase() === 'previous lga');

  if (inputOnly)
    return isStateQuestion ? (
      <StateInput question={question} form={form} />
    ) : isLgaQuestion ? (
      <LGAInput
        question={question}
        form={form}
        stateQuestionId={question.question.toLowerCase() === 'previous lga' ? previousStateQuestionId : stateQuestionId}
      />
    ) : (
      <InputComponent question={question} form={form} />
    );

  return (
    <Box p="4" border="1px solid" borderColor="grey.200" borderRadius="md">
      <FormControl
        isInvalid={!!form.formState.errors[question.id] || !!form.formState.errors[`confirm-${question.id}`]}
        isRequired={question.mandatory}
      >
        <FormLabel htmlFor={question.id} mb={getSpacing(question.type)}>
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
        {isStateQuestion ? (
          <StateInput question={question} form={form} />
        ) : isLgaQuestion ? (
          <LGAInput
            question={question}
            form={form}
            stateQuestionId={
              question.question.toLowerCase() === 'previous lga' ? previousStateQuestionId : stateQuestionId
            }
          />
        ) : (
          <InputComponent question={question} form={form} />
        )}
        <FormErrorMessage
          px={question.type === 'IMAGE_UPLOAD' || question.type === 'FILE_UPLOAD' ? { xs: '1.875rem' } : undefined}
        >
          {form.formState.errors[question.id]?.message?.toString() ||
            form.formState.errors[`confirm-${question.id}`]?.message?.toString()}
        </FormErrorMessage>
        {question.type === 'KYC' && <FormHelperText>Ensure you enter valid information</FormHelperText>}
      </FormControl>
    </Box>
  );
};

const KYCFields = [
  'bvn',
  'recipient bvn',
  'guarantor bvn',
  'bvn of a board member',
  'nin',
  'cac registration number',
  'voters card',
  'recipient account number',
];

const TextInput = ({ question, form }: FormInputProps) => {
  const isKYCField = useMemo(() => KYCFields.includes(question.question.toLowerCase()), [question]);

  if (isKYCField) return <KYCInput question={question} form={form} />;

  const inputType = getInputType(question.type);
  const isDateType = inputType === 'date';
  const today = new Date().toISOString().split('T')[0];
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const maxDate = eighteenYearsAgo.toISOString().split('T')[0];

  return (
    <Input
      {...form.register(question.id)}
      id={question.id}
      type={inputType}
      isRequired={question.mandatory}
      isReadOnly={question.question === 'User code'}
      max={isDateType ? (question.question.toLowerCase() === 'date of birth' ? maxDate : today) : undefined}
    />
  );
};

const EmailInput = ({ question, form }: FormInputProps) => {
  return (
    <Stack spacing="4">
      <Input
        {...form.register(question.id)}
        id={question.id}
        type="email"
        placeholder="Email"
        isRequired={question.mandatory}
      />
      <Input
        {...form.register(`confirm-${question.id}`)}
        type="email"
        placeholder="Confirm email"
        isRequired={question.mandatory}
      />
    </Stack>
  );
};

const KYCInput = ({ question, form }: FormInputProps) => {
  const toast = useToast();
  const { programId } = useParams();
  const [fullname, setFullname] = useState<string>();

  const { mutate, isPending } = useVerifyData();
  const { data: verificationStatus } = useGetVerificationStatus(programId.toString());

  const banks = useMemo(() => getBanks().map((bank) => ({ label: bank.name, value: bank.code })), []);
  const currentBank = useCallback((value) => banks.find((bank) => bank.value === value?.value), [banks]);

  const type = useMemo(() => {
    switch (question.question.toLowerCase()) {
      case 'bvn':
      case 'recipient bvn':
      case 'guarantor bvn':
      case 'bvn of a board member':
        return IdType.BVN;
      case 'nin':
        return IdType.NIN;
      case 'cac registration number':
        return IdType.CAC;
      case 'voters card':
        return IdType.VOTER_ID;
      case 'recipient account number':
        return IdType.BANK_ACCOUNT;
      default:
        return null;
    }
  }, [question]);

  const handleClick = () => {
    const data = form.getValues(question.id);
    const bankCode = form.getValues('bankCode');
    if (!data || !type) return;
    if (type === IdType.BANK_ACCOUNT && !bankCode)
      return toast({ title: 'Error', description: 'Please select a bank', status: 'error' });
    mutate(
      { id: data, programId: programId.toString(), type, bankCode },
      { onSuccess: (response) => setFullname(response.body.fullName) }
    );
  };

  return (
    <Stack spacing="4">
      {type === IdType.BANK_ACCOUNT && (
        <Controller
          control={form.control}
          name="bankCode"
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              variant="whiteDropdown"
              name={name}
              options={banks}
              value={currentBank(value)}
              onChange={(value) => value && onChange(value.value)}
              onBlur={onBlur}
              isDisabled={disabled}
              isRequired={question.mandatory}
            />
          )}
        />
      )}
      <InputGroup>
        <Input
          {...form.register(question.id)}
          id={question.id}
          type={getInputType(question.type)}
          isRequired={question.mandatory}
        />
        {verificationStatus?.body && type && (
          <InputRightElement width="4rem">
            <Button
              variant="primary"
              size="xs"
              h="1.75rem"
              onClick={handleClick}
              isLoading={isPending}
              isDisabled={!!fullname}
            >
              {!!fullname ? 'Verified' : 'Verify'}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {fullname && <Text variant="Body2Semibold">{fullname}</Text>}
    </Stack>
  );
};

const TextareaInput = ({ question, form }: FormInputProps) => {
  return <Textarea {...form.register(question.id)} id={question.id} isRequired={question.mandatory} />;
};

const RadioInput = ({ question, form }: FormInputProps) => {
  return (
    <Controller
      name={question.id}
      control={form.control}
      render={({ field }) => (
        <RadioGroup {...field} id={question.id} onChange={field.onChange} value={field.value || ''}>
          <HStack rowGap="2" columnGap="8" flexWrap="wrap">
            {question.options.map((option) => (
              <Radio key={option.id} value={option.value}>
                <Text as="span" variant="Body2Semibold">
                  {option.label}
                </Text>
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      )}
    />
  );
};

const DropdownInput = ({ question, form }: FormInputProps) => {
  const selectedTradeType = form.watch('tradeType');
  const selectedDisabilityType = form.watch('disabilityType');
  const isTradeType = question.question.toLowerCase() === 'trade type';
  const isTradeSubtype = question.question.toLowerCase() === 'trade subtype';
  const isDisabilityType = question.question.toLowerCase() === 'disability type';
  const isDisabilitySubtype = question.question.toLowerCase() === 'disability subtype';

  const options = useMemo(() => {
    if (isTradeSubtype && selectedTradeType)
      return question.options
        .filter((option) => selectedTradeType === option.parentValue)
        .map((option) => ({ label: option.label, value: option.value, parentValue: option.parentValue }));

    if (isDisabilitySubtype && selectedDisabilityType)
      return question.options
        .filter((option) => selectedDisabilityType === option.parentValue)
        .map((option) => ({ label: option.label, value: option.value, parentValue: option.parentValue }));

    return question.options.map((option) => ({
      label: option.label,
      value: option.value,
      parentValue: option.parentValue,
    }));
  }, [isTradeSubtype, selectedTradeType, question.options, isDisabilitySubtype, selectedDisabilityType]);

  const currentOption = useCallback(
    (value: string | undefined) => (value !== undefined ? options.find((option) => option.value === value) : undefined),
    [options]
  );

  useEffect(() => {
    // Reset trade subtype value when state changes
    if (isTradeSubtype && selectedTradeType) form.resetField(question.id);
  }, [form, question.id, isTradeSubtype, selectedTradeType]);

  useEffect(() => {
    // Reset disability subtype value when state changes
    if (isDisabilitySubtype && selectedDisabilityType) form.resetField(question.id);
  }, [form, question.id, isDisabilitySubtype, selectedDisabilityType]);

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
          value={currentOption(value) ?? ''}
          onChange={(value) => {
            if (!value || typeof value === 'string') return;
            if (isTradeType && value.parentValue) form.setValue('tradeType', value.parentValue);
            if (isDisabilityType && value.parentValue) form.setValue('disabilityType', value.parentValue);
            onChange(value.value);
          }}
          onBlur={onBlur}
          isDisabled={disabled}
          isRequired={question.mandatory}
        />
      )}
    />
  );
};

// const ImageInput = ({ question, form }: FormInputProps) => {
//   const toast = useToast();
//   const [preview, setPreview] = useState(() =>
//     form.getValues(question.id) ? getImageUrl(form.getValues(question.id)) : ''
//   );
//   const inputRef = useRef<HTMLInputElement>(null);

//   const { mutate: uploadFile, isPending } = useUploadFile();

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const file = e.target.files[0];
//     const { success, error } = fileSchema.safeParse(file);

//     if (!success) return toast({ title: 'Error', description: error.flatten().formErrors[0], status: 'error' });

//     if (preview) URL.revokeObjectURL(preview);
//     setPreview(URL.createObjectURL(file));
//     e.target.value = '';

//     uploadFile(
//       { files: [file], type: 'beneficiaryDocs' },
//       {
//         onSuccess: (data) => {
//           form.setValue(question.id, data.body[0].fileName);
//           form.clearErrors(question.id);
//         },
//       }
//     );
//   };

//   return (
//     <Flex gap={{ base: '4', xs: '8' }} px={{ xs: '1.875rem' }} align="center">
//       <Flex
//         id={question.id}
//         as="button"
//         type="button"
//         boxSize="6rem"
//         borderRadius="50%"
//         border="1px dashed"
//         borderColor="grey.300"
//         align="center"
//         justify="center"
//         pos="relative"
//         outlineColor="transparent"
//         overflow="hidden"
//         _focusVisible={{ boxShadow: 'outline' }}
//         onClick={() => inputRef.current?.click()}
//         flexShrink="0"
//       >
//         <input type="file" hidden accept="image/*" onChange={handleFile} ref={inputRef} disabled={isPending} />
//         {preview && (
//           <Image src={preview} alt={question.question} objectFit="cover" pos="absolute" inset="0" boxSize="full" />
//         )}
//         {preview ? null : <Icon as={MdOutlineAddCircle} boxSize="8" color="secondary.500" />}
//         {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
//       </Flex>
//       <Flex gap="2">
//         <Icon as={MdInfo} boxSize="5" color="grey.400" />
//         <Text variant="Body2Regular" color="grey.400" maxW="12.625rem">
//           Uploaded picture size should not exceed 500kb
//         </Text>
//       </Flex>
//     </Flex>
//   );
// };

const ImageInput = ({ question, form }: FormInputProps) => {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const [preview, setPreview] = useState(() =>
    form.getValues(question.id) ? getImageUrl(form.getValues(question.id)) : ''
  );
  const [webcamMode, setWebcamMode] = useState(false);

  const { mutate: uploadFile, isPending } = useUploadFile();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    validateAndUpload(file);
    e.target.value = '';
  };

  const validateAndUpload = (file: File) => {
    const { success, error } = fileSchema.safeParse(file);
    if (!success) {
      toast({ title: 'Error', description: error.flatten().formErrors[0], status: 'error' });
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));

    uploadFile(
      { files: [file], type: 'beneficiaryDocs' },
      {
        onSuccess: (data) => {
          form.setValue(question.id, data.body[0].fileName);
          form.clearErrors(question.id);
        },
      }
    );
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'webcam.jpg', { type: 'image/jpeg' });
        validateAndUpload(file);
        setWebcamMode(false);
      });
  };

  // <-- new helper
  const handleTakePhoto = () => {
    if (isMobile) {
      inputRef.current?.click();
    } else {
      setWebcamMode(true);
    }
  };

  return (
    <Flex gap={{ base: '4', xs: '8' }} px={{ xs: '1.875rem' }} align="center">
      <Flex flexDir="column" align="center">
        {!webcamMode ? (
          <Menu>
            <MenuButton
              as={Flex}
              id={question.id}
              boxSize="6rem"
              borderRadius="50%"
              border="1px dashed"
              borderColor="grey.300"
              // align="center"
              // justify="center"
              alignItems="center"
              justifyContent="center"
              pos="relative"
              outlineColor="transparent"
              overflow="hidden"
              cursor="pointer"
              _focusVisible={{ boxShadow: 'outline' }}
              flexShrink="0"
              sx={{ span: { display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
            >
              <input type="file" hidden accept="image/*" onChange={handleFile} ref={inputRef} disabled={isPending} />
              {preview ? (
                <Image
                  src={preview}
                  alt={question.question}
                  objectFit="cover"
                  pos="absolute"
                  inset="0"
                  boxSize="full"
                />
              ) : (
                <Icon as={MdOutlineAddCircle} boxSize="8" color="secondary.500" />
              )}
              {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
            </MenuButton>
            <MenuList textAlign="center">
              <MenuItem onClick={() => inputRef.current?.click()}>Upload Photo</MenuItem>
              <MenuItem onClick={handleTakePhoto}>Take Photo</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex direction="column" align="center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: { ideal: 'user' }, // More compatible than just 'user'
                width: { ideal: 640 },
                height: { ideal: 480 },
              }}
              playsInline
              style={{ width: '6rem', height: '6rem', borderRadius: '50%' }}
            />
            <Flex mt="2" gap="2">
              <Button size="xs" onClick={capturePhoto}>
                Capture
              </Button>
              <Button size="xs" onClick={() => setWebcamMode(false)} variant="ghost">
                Cancel
              </Button>
            </Flex>
          </Flex>
        )}
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

const FileInput = ({ question, form }: FormInputProps) => {
  const toast = useToast();
  const { mutate: uploadFile, isPending } = useUploadFile();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const { success, error } = fileSchema.safeParse(file);

    if (!success) return toast({ title: 'Error', description: error.flatten().formErrors[0], status: 'error' });

    uploadFile(
      { files: [file], type: 'beneficiaryDocs' },
      {
        onSuccess: (data) => {
          form.setValue(question.id, data.body[0].fileName);
          form.setValue(`${question.id}-file`, file.name);
          form.clearErrors(question.id);
        },
      }
    );
  };

  const uploadedFileName = form.getValues(`${question.id}-file`);

  return (
    <Box pos="relative">
      <Input
        id={question.id}
        variant="primary"
        h="auto"
        py="2"
        type="file"
        isRequired={question.mandatory && !uploadedFileName}
        onChange={handleFile}
        disabled={isPending}
      />
      {uploadedFileName && (
        <Text variant="Body2Regular" mt="2">
          File attached: {uploadedFileName}
        </Text>
      )}
      {isPending && <Spinner size="sm" opacity="0.4" pos="absolute" right="4" insetBlock="0" my="auto" />}
    </Box>
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
        form.clearErrors(question.id);
      },
      () =>
        toast({
          status: 'error',
          title: 'Error',
          description: 'Please allow location access to proceed',
          isClosable: false,
          duration: null,
        })
    );

    if (form.formState.errors[question.id])
      toast({
        status: 'error',
        title: 'Error',
        description: 'Please allow location access to proceed',
        isClosable: false,
        duration: null,
      });
  }, [toast, form, question]);

  return <Input type="hidden" {...form.register(question.id)} />;
};

const StateInput = ({ question, form }: FormInputProps) => {
  const { data: states } = useGetStates();

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return states.body.map((state) => ({ label: state.name, value: state.id }));
  }, [states]);

  const currentState = useCallback(
    (value: number | undefined) =>
      value !== undefined ? stateOptions.find((option) => option.value === value) : undefined,
    [stateOptions]
  );

  return (
    <Controller
      control={form.control}
      name={question.id}
      render={({ field: { name, onBlur, onChange, value, disabled } }) => (
        <Dropdown
          variant="whiteDropdown"
          id={question.id}
          name={name}
          options={stateOptions}
          value={currentState(value)}
          onChange={(value) => value && onChange(value.value)}
          onBlur={onBlur}
          isDisabled={disabled}
          isRequired={question.mandatory}
        />
      )}
    />
  );
};

const LGAInput = ({ question, form, stateQuestionId }: FormInputProps) => {
  const { data: states } = useGetStates();

  const selectedStateId = form.watch(stateQuestionId ?? '');

  const LGAOptions = useMemo(() => {
    if (!states || !selectedStateId) return [];
    const currentState = states.body.find((state) => state.id === Number(selectedStateId));
    if (!currentState) return [];
    return currentState.LGAs.map((lga) => ({ label: lga.name, value: lga.id }));
  }, [selectedStateId, states]);

  const currentLGA = useCallback(
    (value: number | undefined) =>
      value !== undefined ? LGAOptions.find((option) => option.value === value) : undefined,
    [LGAOptions]
  );

  useEffect(() => {
    // Reset LGA value when state changes
    form.resetField(question.id);
  }, [selectedStateId, form, question.id]);

  return (
    <Controller
      control={form.control}
      name={question.id}
      render={({ field: { name, onBlur, onChange, value, disabled } }) => (
        <Dropdown
          variant="whiteDropdown"
          id={question.id}
          name={name}
          options={LGAOptions}
          value={currentLGA(value) ?? ''}
          onChange={(value) => value && typeof value !== 'string' && onChange(value.value)}
          onBlur={onBlur}
          isDisabled={disabled || (!!stateQuestionId && !selectedStateId)}
          isRequired={question.mandatory}
          placeholder={!!stateQuestionId && !selectedStateId ? 'Please select a state first' : 'Select LGA'}
        />
      )}
    />
  );
};

const getFormInput = (type: string) => {
  switch (type) {
    case 'LONG_TEXT':
      return TextareaInput;
    case 'DROPDOWN':
      return DropdownInput;
    case 'IMAGE_UPLOAD':
      return ImageInput;
    case 'FILE_UPLOAD':
      return FileInput;
    case 'CHECKBOX':
    case 'MULTIPLE_CHOICE':
      return RadioInput;
    case 'PHONE_NUMBER':
      return PhoneInput;
    case 'KYC':
      return KYCInput;
    case 'EMAIL':
      return EmailInput;
    default:
      return TextInput;
  }
};

const getInputType = (type: string): HTMLInputTypeAttribute => {
  switch (type) {
    case 'DATE':
      return 'date';
    case 'IMAGE_UPLOAD':
    case 'FILE_UPLOAD':
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
    case 'IMAGE_UPLOAD':
      return '1.5rem';
    case 'CHECKBOX':
    case 'MULTIPLE_CHOICE':
      return '1rem';
    default:
      return '0.75rem';
  }
};

export default FormInput;
