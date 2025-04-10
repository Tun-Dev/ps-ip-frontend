import { useCreateClient } from '@/hooks/useCreateClient';
// import { useGetPrograms } from '@/hooks/useGetPrograms';
// import { Dropdown } from '@/shared/chakra/components';
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import {
  // Controller,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { PhoneNumberInput } from '../components/phone-number-input';

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  // programId: z.string().min(1, 'Program is required'),
  amount: z.coerce.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Corporate Email is required'),
  contactEmail: z.string().min(1, 'Email is required'),
  contactPhone: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
});

type FormValues = z.infer<typeof Schema>;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewClientModal = ({ isOpen, onClose }: ModalProps) => {
  // const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  // const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const { mutate, isPending } = useCreateClient(() => {
    onClose();
    reset();
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent as="form" width="498px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text variant="Body1Semibold">Add New Client</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={3}>
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel htmlFor="name">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Client Name
                  </Text>
                </FormLabel>
                <Input id="name" variant="primary" placeholder="Client Usman" {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

              {/* <FormControl isInvalid={!!errors.programId} isRequired>
                <FormLabel htmlFor="programId">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Program
                  </Text>
                </FormLabel>
                <Controller
                  control={control}
                  name="programId"
                  render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                    <Dropdown
                      id="programId"
                      variant="whiteDropdown"
                      placeholder="Select program"
                      name={name}
                      options={options}
                      value={options?.find((option) => option.value === value)}
                      onChange={(value) => value && onChange(value.value)}
                      onBlur={onBlur}
                      isDisabled={disabled}
                    />
                  )}
                />
                <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
              </FormControl> */}
              <FormControl isInvalid={!!errors.amount}>
                <FormLabel htmlFor="amount">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Disbursable Amount
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Text>₦</Text>
                  </InputLeftElement>
                  <Input
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    id="amount"
                    placeholder="50000000"
                    {...register('amount')}
                  ></Input>
                </InputGroup>
                <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel htmlFor="email">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Corporate Email
                  </Text>
                </FormLabel>
                <Input id="email" type="email" variant="primary" {...register('email')} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <Divider orientation="horizontal" />

              <Text variant="Body1Semibold">Contact Information</Text>
              <FormControl isInvalid={!!errors.firstName} isRequired>
                <FormLabel htmlFor="firstName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    First Name
                  </Text>
                </FormLabel>
                <Input id="firstName" variant="primary" {...register('firstName')} />
                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName} isRequired>
                <FormLabel htmlFor="lastName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Last Name
                  </Text>
                </FormLabel>
                <Input id="lastName" variant="primary" {...register('lastName')} />
                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.contactEmail} isRequired>
                <FormLabel htmlFor="contactEmail">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Email
                  </Text>
                </FormLabel>
                <Input id="contactEmail" type="email" variant="primary" {...register('contactEmail')} />
                <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.contactPhone} isRequired>
                <FormLabel htmlFor="contactPhone">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Phone number
                  </Text>
                </FormLabel>
                <PhoneNumberInput id="contactPhone" name="contactPhone" control={control} />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" width="402px" height="48px" isLoading={isPending} type="submit">
              Add New Client
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddNewClientModal };
