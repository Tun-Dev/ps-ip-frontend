import {
  Text,
  Input,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Divider,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Dropdown } from '@/shared/chakra/components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { useCreatePartner } from '@/hooks/useCreatePartner';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewPartnerModal = ({ isOpen, onClose }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const Schema = z
    .object({
      name: z.string().min(1, 'Name is required'),
      programId: z.coerce.number().min(1, 'Program is required'),
      amount: z.coerce.number().min(0, 'Amount is required'),

      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().min(1, 'Corporate Email is required'),
      contactEmail: z.string().min(1, 'Email is required'),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      contactPhone: z
        .string()
        .nonempty('Phone number is required')
        // Accept only 10 digits, not starting with 0
        .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits and cannot start with 0'),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  type FormValues = z.infer<typeof Schema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const { mutate, isPending } = useCreatePartner(() => {
    onClose();
    reset();
  });

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      ...data,
      contactPhone: `+234${data.contactPhone}`,
    };

    mutate(formattedData);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" width="498px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text variant="Body1Semibold">Add New Partner</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={3}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Partner Name
                  </Text>
                </FormLabel>
                <Input id="name" variant="primary" placeholder="Partner Usman" {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.programId}>
                <FormLabel htmlFor="programId">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Assign Program
                  </Text>
                </FormLabel>
                <Controller
                  control={control}
                  name="programId"
                  defaultValue={0}
                  render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                    <Dropdown
                      id="programId"
                      variant="whiteDropdown"
                      placeholder="Select program"
                      name={name}
                      options={options}
                      value={options?.find((option) => parseInt(option.value) === value)}
                      onChange={(value) => value && onChange(value.value)}
                      onBlur={onBlur}
                      isDisabled={disabled}
                    />
                  )}
                />
                <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.amount}>
                <FormLabel htmlFor="amount">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Amount Disbursed
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Text>₦</Text>
                  </InputLeftElement>
                  <Input type="number" id="amount" placeholder="50,000,000" {...register('amount')}></Input>
                </InputGroup>
                <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Corporate Email
                  </Text>
                </FormLabel>
                <Input id="email" type="email" variant="primary" {...register('email')} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Password
                  </Text>
                </FormLabel>
                <Input id="password" type="password" variant="primary" {...register('password')} />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Confirm Password
                  </Text>
                </FormLabel>
                <Input id="confirmPassword" type="password" variant="primary" {...register('confirmPassword')} />
                <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
              </FormControl>

              <Divider orientation="horizontal" />

              <Text variant="Body1Semibold">Contact Information</Text>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    First Name
                  </Text>
                </FormLabel>
                <Input id="firstName" variant="primary" {...register('firstName')} />
                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Last Name
                  </Text>
                </FormLabel>
                <Input id="lastName" variant="primary" {...register('lastName')} />
                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.contactEmail}>
                <FormLabel htmlFor="contactEmail">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Email
                  </Text>
                </FormLabel>
                <Input id="contactEmail" type="email" variant="primary" {...register('contactEmail')} />
                <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.contactPhone}>
                <FormLabel htmlFor="contactPhone">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Phone number
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon>+234</InputLeftAddon>
                  <Input
                    id="contactPhone"
                    type="string"
                    placeholder="e.g. 8012345678"
                    variant="primary"
                    {...register('contactPhone')}
                  />
                </InputGroup>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" width="402px" height="48px" isLoading={isPending} type="submit">
              Add New Partner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddNewPartnerModal };
