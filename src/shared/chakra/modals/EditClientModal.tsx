// import { useGetPrograms } from '@/hooks/useGetPrograms';
// import { Dropdown } from '@/shared/chakra/components';
import { Client } from '@/types';
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
import { useEditClient } from '@/hooks/useEditClient';

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  programId: z.string().min(1, 'Program is required'),
  amount: z.coerce.number().min(0, 'Amount is required'),
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
  client: Client;
};

export const EditClientModal = ({ isOpen, onClose, client }: ModalProps) => {
  // const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  // const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: client.name,
      amount: client.amount,
      firstName: client.contactFirstName,
      lastName: client.contactLastName,
      email: client.email,
      contactEmail: client.contactEmail,
      contactPhone: client.phoneNumber,
      // programId: client.id
    },
  });

  const { mutate, isPending } = useEditClient();

  const onSubmit = (data: FormValues) => {
    mutate(
      { id: client.id, ...data },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent as="form" width="498px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text variant="Body1Semibold">Edit Client</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={3}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Client Name
                  </Text>
                </FormLabel>
                <Input id="name" variant="primary" placeholder="Client Usman" {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

              {/* <FormControl isInvalid={!!errors.programId}>
                <FormLabel htmlFor="programId">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Assign Program
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
                    Amount Disbursed
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Text>₦</Text>
                  </InputLeftElement>
                  <Input type="number" id="amount" placeholder="50000000" {...register('amount')}></Input>
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
                <PhoneNumberInput id="contactPhone" name="contactPhone" control={control} />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" width="402px" height="48px" isLoading={isPending} type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
