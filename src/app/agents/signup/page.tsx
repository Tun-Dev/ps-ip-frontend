'use client';

import { useGetStates } from '@/hooks/useGetStates';
import { useSignUpAgent } from '@/hooks/useSignUpAgent';
import { useUploadFile } from '@/hooks/useUploadFile';
import { Dropdown } from '@/shared/chakra/components';
import { PasswordInput } from '@/shared/chakra/components/password-input';
import { PhoneNumberInput } from '@/shared/chakra/components/phone-number-input';
import { AgentSignUpPayload } from '@/types';
import { Link } from '@chakra-ui/next-js';
import {
  Button,
  Checkbox,
  Circle,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { z } from 'zod';

const SignupPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const handleNextStep = (data?: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Flex my={'100px'} flexDir="column" alignItems="center" gap="32px">
      <Text w="334px" textAlign="center" fontWeight="600" fontSize="24px" lineHeight="33.6px">
        Welcome to the Agent Registration Portal
      </Text>
      <Flex w="210.9px" justifyContent="space-between" position="relative">
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 1 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(1)}
            color="white"
          >
            1
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 1 ? 'text' : 'grey.500'}>
            Step 1
          </Text>
        </Flex>
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 2 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(2)}
            color="white"
          >
            2
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 2 ? 'text' : 'grey.500'}>
            Step 2
          </Text>
        </Flex>
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 3 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(3)}
            color="white"
          >
            3
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 3 ? 'text' : 'grey.500'}>
            Step 3
          </Text>
        </Flex>
        <Divider position="absolute" w="210.9px" top="17.1px" zIndex="1" color="grey.500" />
      </Flex>
      {activeStep === 1 && <Step1 action={handleNextStep} />}
      {activeStep === 2 && <Step2 action={handleNextStep} data={formData} />}
      {activeStep === 3 && <Step3 action={handleNextStep} data={formData} />}
    </Flex>
  );
};

const Step1 = ({ action }: { action: () => void }) => {
  const toast = useToast();

  const requestPermission = () => {
    if (!navigator) return;

    navigator.geolocation.getCurrentPosition(
      () => action(),
      () =>
        toast({
          status: 'error',
          title: 'Error',
          description: 'Please allow location access to proceed',
          isClosable: false,
          duration: null,
        })
    );
  };

  return (
    <Flex
      boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
      maxW="570px"
      minH="264px"
      borderRadius="24px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p="40px"
      gap="24px"
    >
      <Text lineHeight="32px" fontSize="24px" fontWeight="700">
        NOTE:
      </Text>
      <Text variant="Body1Regular">
        You would need to grant access to your location before you can re-register as an agent. Your browser will ask
        you for this access. Click “allow” when you are asked.
      </Text>
      <Button variant="primary" w="180px" onClick={requestPermission}>
        Continue
      </Button>
    </Flex>
  );
};

const Step2 = ({ action, data }: { action: (data: Partial<FormData>) => void; data: Partial<FormData> }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Partial<FormData>>({
    defaultValues: { aggregatorCode: data.aggregatorCode },
    resolver: zodResolver(schema.pick({ aggregatorCode: true })),
  });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: Partial<FormData>) => {
    action(data);
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
      maxW="548px"
      minH="280px"
      borderRadius="24px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p="40px"
      gap="24px"
    >
      <Text variant="Body1Regular" color="grey.500" w="100%">
        Enter the code given to you by your agent network company*
      </Text>
      <FormControl isRequired isInvalid={!!errors.aggregatorCode}>
        <FormLabel htmlFor="aggregatorCode">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Aggregator Code
          </Text>
        </FormLabel>
        <Input placeholder="Code" id="aggregatorCode" {...register('aggregatorCode')} />
        <FormErrorMessage>{errors.aggregatorCode && errors.aggregatorCode.message}</FormErrorMessage>
      </FormControl>
      <Button variant="primary" w="200px" type="submit" isDisabled={hasErrors}>
        ENTER
      </Button>
    </Flex>
  );
};

const Step3 = ({ action, data }: { action: (data: Partial<FormData>) => void; data: Partial<FormData> }) => {
  const { mutate: signUp, isPending: isSigningUp } = useSignUpAgent();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
    resetField,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: { ...data },
    resolver: zodResolver(schemaWithRefinement),
  });

  // Watch for changes to the stateOfOrigin field
  const selectedStateId = watch('stateOfOrigin');

  const hasErrors = Object.keys(errors).length > 0;

  const genderOptions = useMemo(
    () => [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
    []
  );

  const levelsOfEducationOptions = useMemo(
    () => [
      { label: 'BACHELORS', value: 'Bachelors' },
      { label: 'HND', value: 'HND' },
    ],
    []
  );

  const currentLevelOfEducation = useCallback(
    (value: string | undefined) =>
      value ? levelsOfEducationOptions.find((option) => option.value === value) : undefined,
    [levelsOfEducationOptions]
  );

  const currentGender = useCallback(
    (value: string | undefined) => (value ? genderOptions.find((option) => option.value === value) : undefined),
    [genderOptions]
  );
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

  // Filter LGAs based on selected state
  const filteredLGAOptions = useMemo(() => {
    if (!states || selectedStateId === undefined) return [];
    const selectedState = states.body.find((state) => state.id === selectedStateId);
    if (!selectedState) return [];
    return selectedState.LGAs.map((lga) => ({ label: lga.name, value: lga.id }));
  }, [states, selectedStateId]);

  const currentLGA = useCallback(
    (value: number) => {
      if (!value) return undefined;
      return filteredLGAOptions.find((option) => option.value === value);
    },
    [filteredLGAOptions]
  );

  // Reset LGA selection when state changes
  useEffect(() => {
    if (selectedStateId) resetField('LGAOfResidence');
  }, [resetField, selectedStateId]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const preview = getValues('photo');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('photo', URL.createObjectURL(file));

    uploadFile(
      { files: [file], type: 'programLogo' },
      {
        onSuccess: (data) => {
          setValue('photoID', data.body[0].id);
          clearErrors('photoID');
        },
      }
    );
  };

  const onSubmit = (data: FormData) => {
    const address = `${data.houseNumber} ${data.streetName}, ${data.city}`;
    const signUpData: AgentSignUpPayload = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName || '',
      dob: data.dob,
      gender: data.gender,
      email: data.email,
      aggregatorCode: data.aggregatorCode,
      phoneNumber: data.phoneNumber,
      bvnPhoneNumber: data.bvnPhoneNumber,
      bvn: data.bvn,
      numberOfDependents: Number(data.numberOfDependents),
      address: address,
      highestEducation: data.highestEducation,
      photo: Number(data.photoID),
      nin: data.nin,
      stateOfOrigin: Number(data.stateOfOrigin),
      LGAOfResidence: Number(data.LGAOfResidence),
    };
    signUp(signUpData, {
      onSuccess: () => {
        reset();
      },
    });
    action(data);
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
      w="708px"
      borderRadius="24px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p="40px"
      gap="24px"
    >
      <FormControl isRequired isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            First Name (Must match data on BVN)
          </Text>
        </FormLabel>
        <Input placeholder="Input first name" id="firstName" {...register('firstName')} />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.lastName}>
        <FormLabel htmlFor="lastName">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Last Name (Must match data on BVN)
          </Text>
        </FormLabel>
        <Input placeholder="Input last name" id="lastName" {...register('lastName')} />
        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.otherName}>
        <FormLabel htmlFor="otherName">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Other Name
          </Text>
        </FormLabel>
        <Input placeholder="Input other name" id="otherName" {...register('otherName')} />
        <FormErrorMessage>{errors.otherName && errors.otherName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.dob}>
        <FormLabel htmlFor="dob">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Date of Birth
          </Text>
        </FormLabel>
        <Input type="date" placeholder="Click to select dob" id="dob" {...register('dob')} />
        <FormErrorMessage>{errors.dob && errors.dob.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Email
          </Text>
        </FormLabel>
        <Input placeholder="Input email" type="email" id="email" {...register('email')} />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <Grid templateColumns="1fr 1fr" gap="16px" w="100%">
        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              Password
            </Text>
          </FormLabel>
          <PasswordInput placeholder="Input password" id="password" {...register('password')} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              Confirm Password
            </Text>
          </FormLabel>
          <PasswordInput placeholder="Confirm password" id="confirmPassword" {...register('confirmPassword')} />
          <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
        </FormControl>
      </Grid>
      <FormControl isRequired isInvalid={!!errors.gender}>
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
      <FormControl isRequired isInvalid={!!errors.stateOfOrigin}>
        <FormLabel htmlFor="stateOfOrigin">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            State of Residence
          </Text>
        </FormLabel>
        <Controller
          control={control}
          name="stateOfOrigin"
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="stateOfOrigin"
              variant="whiteDropdown"
              placeholder="Select state of origin"
              name={name}
              options={stateOptions}
              value={currentState(value)}
              onChange={(selected) => selected && onChange(selected.value)}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          )}
        />
        <FormErrorMessage>{errors.stateOfOrigin && errors.stateOfOrigin.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.LGAOfResidence}>
        <FormLabel htmlFor="LGAOfResidence">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Local Government of Area of Residence
          </Text>
        </FormLabel>
        <Controller
          control={control}
          name="LGAOfResidence"
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="LGAOfResidence"
              variant="whiteDropdown"
              placeholder={selectedStateId ? 'Select Local Government Area' : 'Please select a state first'}
              name={name}
              options={filteredLGAOptions}
              value={currentLGA(value) ?? ''}
              onChange={(selected) => selected && typeof selected !== 'string' && onChange(selected.value)}
              onBlur={onBlur}
              isDisabled={disabled || !selectedStateId}
            />
          )}
        />
        <FormErrorMessage>{errors.LGAOfResidence && errors.LGAOfResidence.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.bvnPhoneNumber}>
        <FormLabel htmlFor="bvnPhoneNumber">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            BVN Phone Number
          </Text>
        </FormLabel>
        <PhoneNumberInput
          id="bvnPhoneNumber"
          name="bvnPhoneNumber"
          placeholder="Input bvn phone number"
          control={control}
        />
        <FormErrorMessage>{errors.bvnPhoneNumber && errors.bvnPhoneNumber.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.phoneNumber}>
        <FormLabel htmlFor="phoneNumber">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Contact Phone Number
          </Text>
        </FormLabel>
        <PhoneNumberInput
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Input contact phone number"
          control={control}
        />
        <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.nin}>
        <FormLabel htmlFor="nin">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            NIN
          </Text>
        </FormLabel>
        <Input placeholder="Input national identification number" id="nin" inputMode="numeric" {...register('nin')} />
        <FormErrorMessage>{errors.nin && errors.nin.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.streetName}>
        <FormLabel htmlFor="streetName">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Street Name
          </Text>
        </FormLabel>
        <Input placeholder="Input street name" id="streetName" {...register('streetName')} />
        <FormErrorMessage>{errors.streetName && errors.streetName.message}</FormErrorMessage>
      </FormControl>
      <Grid templateColumns="1fr 1fr" gap="16px" w="100%">
        <FormControl isRequired isInvalid={!!errors.houseNumber}>
          <FormLabel htmlFor="houseNumber">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              House Number
            </Text>
          </FormLabel>
          <Input placeholder="Input house number" id="houseNumber" {...register('houseNumber')} />
          <FormErrorMessage>{errors.houseNumber && errors.houseNumber.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.city}>
          <FormLabel htmlFor="city">
            <Text as="span" variant="Body2Semibold" color="grey.500">
              City
            </Text>
          </FormLabel>
          <Input placeholder="Input city or town" id="city" {...register('city')} />
          <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
        </FormControl>
      </Grid>
      <FormControl isRequired isInvalid={!!errors.numberOfDependents}>
        <FormLabel htmlFor="numberOfDependents">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Number of Dependants
          </Text>
        </FormLabel>
        <Input placeholder="Input number of dependants" id="numberOfDependents" {...register('numberOfDependents')} />
        <FormErrorMessage>{errors.numberOfDependents && errors.numberOfDependents.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.highestEducation}>
        <FormLabel htmlFor="highestEducation">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Highest level of school
          </Text>
        </FormLabel>
        <Controller
          control={control}
          name="highestEducation"
          render={({ field: { name, onBlur, onChange, value, disabled } }) => (
            <Dropdown
              id="highestEducation"
              variant="whiteDropdown"
              placeholder="Select level of education"
              name={name}
              options={levelsOfEducationOptions}
              value={currentLevelOfEducation(value)}
              onChange={(selected) => selected && onChange(selected.value)}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          )}
        />
        <FormErrorMessage>{errors.highestEducation && errors.highestEducation.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.bvn}>
        <FormLabel htmlFor="bvn">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            BVN
          </Text>
        </FormLabel>
        <Input placeholder="Input your BVN" id="bvn" inputMode="numeric" {...register('bvn')} />
        <FormErrorMessage>{errors.bvn && errors.bvn.message}</FormErrorMessage>
      </FormControl>
      <Flex flexDir="column" w="100%">
        <FormLabel htmlFor="photoID">
          <Text as="span" variant="Body2Semibold" color="grey.500">
            Upload Selfie Picture
          </Text>
        </FormLabel>
        <Flex
          alignItems="center"
          gap="20px"
          border="1px dashed"
          h="144px"
          w="100%"
          borderRadius="8px"
          justifyContent="center"
          borderColor={!!errors.photoID ? 'red !important' : 'grey.300 !important'}
          overflow="hidden"
          pos="relative"
          as="button"
          type="button"
          outlineColor="transparent"
          _focusVisible={{ boxShadow: 'outline' }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            id="photoID"
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFile}
            ref={inputRef}
            disabled={isPending}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
          {preview && (
            <Image src={preview} alt="" w="100%" h="100%" pos="absolute" top="0" left="0" objectFit="contain" />
          )}
          {isPending ? (
            <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />
          ) : (
            <Flex flexDir="column" gap="8px" alignItems="center" zIndex="2">
              <MdOutlineCloudDownload />
              <Text>Drag or click to upload</Text>
              <Text>.png, .jpg</Text>
            </Flex>
          )}
        </Flex>
        <FormErrorMessage>{errors.photoID && errors.photoID.message}</FormErrorMessage>
      </Flex>
      <FormControl isRequired isInvalid={!!errors.terms}>
        <Checkbox size="lg" {...register('terms')}>
          <Text variant="Body1Regular">
            By checking the box below, I agree to the following{' '}
            <Link
              href="https://www.boi.ng/privacy-policy/"
              target="_blank"
              color="primary.500"
              textDecoration="underline"
              textDecorationColor="primary.500"
              onClick={(e) => e.stopPropagation()}
            >
              Terms and conditions
            </Link>
          </Text>
        </Checkbox>
        <FormErrorMessage>{errors.terms && errors.terms.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" variant="primary" w="100%" isLoading={isSigningUp} isDisabled={hasErrors}>
        Continue
      </Button>
    </Flex>
  );
};

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  otherName: z.string().optional(),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email('Invalid email address'),
  aggregatorCode: z.string().min(1, 'Code is required'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  bvnPhoneNumber: z.string().min(10, 'Invalid phone number'),
  bvn: z.string().min(11, 'BVN must be 11 digits').min(11, 'BVN must be 11 digits').max(11, 'BVN must be 11 digits'),
  streetName: z.string().min(1, 'Street name is required'),
  city: z.string().min(1, 'City is required'),
  numberOfDependents: z.string().min(1, 'Number of dependents is required'),
  houseNumber: z.string().min(1, 'House number is required'),
  highestEducation: z.string().min(1, 'Education level is required'),
  photoID: z.number().min(1, 'Photo is required'),
  photo: z.string().min(1, 'Photo is required'),
  nin: z.string().min(1, 'NIN is required').min(11, 'NIN must be 11 digits').max(11, 'NIN must be 11 digits'),
  stateOfOrigin: z.number(),
  LGAOfResidence: z.number(),
  terms: z.coerce.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
});

const schemaWithRefinement = schema.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schemaWithRefinement>;

export default SignupPage;
