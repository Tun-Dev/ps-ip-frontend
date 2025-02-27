'use client';

import { useGetStates } from '@/hooks/useGetStates';
import { useSignUpAgent } from '@/hooks/useSignUpAgent';
import { useUploadFile } from '@/hooks/useUploadFile';
import { Dropdown } from '@/shared/chakra/components';
import { AgentSignUpPayload } from '@/types';
import {
  Button,
  Checkbox,
  Circle,
  Divider,
  Flex,
  FormErrorMessage,
  Grid,
  Image,
  Input,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { z } from 'zod';

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    otherName: z.string().optional(),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    gender: z.string().min(1, 'Gender is required'),
    email: z.string().email('Invalid email address'),
    aggregatorCode: z.string().min(1, 'Aggregator code is required'),
    phoneNumber: z.string().min(10, 'Invalid phone number'),
    bvnPhoneNumber: z.string().min(10, 'Invalid phone number'),
    bvn: z.string().min(11, 'BVN must be 11 digits'),
    streetName: z.string().min(1, 'Street name is required'),
    city: z.string().min(1, 'City is required'),
    numberOfDependents: z.string().min(1, 'Number of dependents is required'),
    houseNumber: z.string().min(1, 'House number is required'),
    highestEducation: z.string().min(1, 'Education level is required'),
    photoID: z.number().min(1, 'Photo is required'),
    photo: z.string().min(1, 'Photo is required'),
    nin: z.string().min(1, 'NIN is required'),
    stateOfOrigin: z.number(),
    LGAOfResidence: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

const Step1 = ({ action }: { action: () => void }) => {
  return (
    <>
      <Flex
        boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
        w="570px"
        h="264px"
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
        <Button variant="primary" w="180px" onClick={() => action()}>
          Continue
        </Button>
      </Flex>
    </>
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
  } = useForm<FormData>({
    defaultValues: { ...data },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [terms, setTerms] = useState(false);

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

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const preview = getValues('photo');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('photo', URL.createObjectURL(file));

    uploadFile({ files: [file], type: 'programLogo' }, { onSuccess: (data) => setValue('photoID', data.body[0].id) });
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
    signUp(signUpData);
    action(data);
  };

  return (
    <>
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
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input first name" {...register('firstName')} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input last name" {...register('lastName')} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input other name" {...register('otherName')} />
          <FormErrorMessage>{errors.otherName && errors.otherName.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input type="date" placeholder="Click to select dob" {...register('dob')} />
          <FormErrorMessage>{errors.dob && errors.dob.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input email" type="email" {...register('email')} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </Flex>
        <Grid templateColumns="1fr 1fr" gap="16px" w="100%">
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input type="password" placeholder="Input password" {...register('password')} />
            <FormErrorMessage>{errors.houseNumber && errors.houseNumber.message}</FormErrorMessage>
          </Flex>
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
            <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
          </Flex>
        </Grid>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Gender
          </Text>
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
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            State of Origin
          </Text>
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
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Local Government of Area
          </Text>
          <Controller
            control={control}
            name="LGAOfResidence"
            render={({ field: { name, onBlur, onChange, value, disabled } }) => (
              <Dropdown
                id="LGAOfResidence"
                variant="whiteDropdown"
                placeholder="Select Local Goverment Area"
                name={name}
                options={stateOptions}
                value={currentState(value)}
                onChange={(selected) => selected && onChange(selected.value)}
                onBlur={onBlur}
                isDisabled={disabled}
              />
            )}
          />
          <FormErrorMessage>{errors.LGAOfResidence && errors.LGAOfResidence.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input bvn phone number" {...register('bvnPhoneNumber')} />
          <FormErrorMessage>{errors.bvnPhoneNumber && errors.bvnPhoneNumber.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input contact phone number" {...register('phoneNumber')} />
          <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input national identification number" {...register('nin')} />
          <FormErrorMessage>{errors.nin && errors.nin.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input street name" {...register('streetName')} />
          <FormErrorMessage>{errors.streetName && errors.streetName.message}</FormErrorMessage>
        </Flex>
        <Grid templateColumns="1fr 1fr" gap="16px" w="100%">
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input placeholder="Input house number" {...register('houseNumber')} />
            <FormErrorMessage>{errors.houseNumber && errors.houseNumber.message}</FormErrorMessage>
          </Flex>
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input placeholder="Input city or town" {...register('city')} />

            <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
          </Flex>
        </Grid>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input number of dependants" {...register('numberOfDependents')} />
          <FormErrorMessage>{errors.numberOfDependents && errors.numberOfDependents.message}</FormErrorMessage>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Highest level of school
          </Text>
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
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input your BVN" {...register('bvn')} />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Upload Selfie Picture
          </Text>
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
          >
            <input
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
              <Image src={preview} alt="" w="100%" h="100%" pos="absolute" top="0" left="0" objectFit="cover" />
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
        <Flex w="100%" gap="8px">
          <Checkbox size={'lg'} isChecked={terms} onChange={() => setTerms((prev) => !prev)} />
          <Text variant="Body1Regular">
            By checking the box below, I agree to the following{' '}
            <Link color="primary.500" textDecoration="underline" textDecorationColor="primary.500">
              Terms and conditions
            </Link>
          </Text>
        </Flex>
        <Button type="submit" variant="primary" w="100%" isLoading={isSigningUp}>
          Continue
        </Button>
      </Flex>
    </>
  );
};

const Step2 = ({ action, data }: { action: (data: Partial<FormData>) => void; data: Partial<FormData> }) => {
  const { handleSubmit, register } = useForm<Partial<FormData>>({
    defaultValues: { aggregatorCode: data.aggregatorCode },
  });

  const onSubmit = (data: Partial<FormData>) => {
    action(data);
  };

  return (
    <>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
        w="548px"
        h="280px"
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
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Code" {...register('aggregatorCode')} />
        </Flex>
        <Button variant="primary" w="200px" type="submit">
          ENTER
        </Button>
      </Flex>
    </>
  );
};

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
      <>
        {activeStep === 1 && <Step1 action={handleNextStep} />}
        {activeStep === 2 && <Step2 action={handleNextStep} data={formData} />}
        {activeStep === 3 && <Step3 action={handleNextStep} data={formData} />}
      </>
    </Flex>
  );
};

export default SignupPage;
