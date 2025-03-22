import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useEditAggregator } from '@/hooks/useEditAggregator';
import { PhoneNumberInput } from '@/shared/chakra/components/phone-number-input';
import { Aggregator } from '@/types';

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  contactEmail: z.string().min(1, 'Corporate Email is required'),
  email: z.string().min(1, 'Email is required'),
  contactPhone: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
});

type FormValues = z.infer<typeof Schema>;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues: Aggregator;
};

const EditAggregatorModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const toast = useToast();

  const { mutate, isPending } = useEditAggregator();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues: initialValues });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    mutate(
      { id: initialValues.id, ...data },
      {
        onSuccess: () => {
          toast({ title: 'Changes saved', status: 'success' });
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Edit Aggregator</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <Text variant="Body1Semibold">Corporate Details</Text>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Aggregator Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="corporateEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Corporate Email
                </Text>
              </FormLabel>
              <Input id="corporateEmail" type="email" variant="primary" {...register('email')} />
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
              <Input id="email" type="email" variant="primary" {...register('contactEmail')} />
              <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactPhone}>
              <FormLabel htmlFor="contactPhone">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Phone number
                </Text>
              </FormLabel>
              <PhoneNumberInput id="contactPhone" name="contactPhone" control={control} />
              <FormErrorMessage>{errors.contactPhone && errors.contactPhone.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            variant="primary"
            width="402px"
            height="48px"
            isDisabled={hasErrors}
            isLoading={isPending}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { EditAggregatorModal };
