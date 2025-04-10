import { useUpdateVendorById } from '@/hooks/useEditVendorById';
import { Vendor } from '@/types';
import { SERVICES } from '@/utils';
import {
  Button,
  Divider,
  Flex,
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
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';
import { PhoneNumberInput } from '../components/phone-number-input';

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  service: z.string().min(1, 'Services is required'),
  product: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  contactEmail: z.string().min(1, 'Contact Email is required').email('Invalid email'),
  contactPhone: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
});

type FormValues = z.infer<typeof Schema>;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues: Vendor;
};

const EditVendorModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const [showProductField, setShowProductField] = useState(false);
  const { mutate, isPending } = useUpdateVendorById(initialValues.id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues: initialValues });

  const onSubmit = (data: FormValues) => {
    const vendorData: Partial<Vendor> = {
      id: initialValues.id,
      ...data,
    };
    mutate(vendorData, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" width="498px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Text variant="Body1Semibold">Edit Vendor</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Vendor Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.service} isRequired>
              <FormLabel htmlFor="service">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Products/Services offered
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="service"
                defaultValue={''}
                render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                  <Dropdown
                    variant="whiteDropdown"
                    placeholder="Select program"
                    name={name}
                    id="service"
                    options={SERVICES}
                    value={SERVICES.find((service) => service.value === value)}
                    onChange={(selected) => {
                      const serviceValue = selected?.value || '';
                      onChange(serviceValue);
                      setShowProductField(serviceValue === 'Physical Item');
                    }}
                    onBlur={onBlur}
                    isDisabled={disabled}
                  />
                )}
              />
              <FormErrorMessage>{errors.service && errors.service.message}</FormErrorMessage>
            </FormControl>
            {showProductField && (
              <FormControl isInvalid={!!errors.product} isRequired>
                <FormLabel htmlFor="product">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Type of Product
                  </Text>
                </FormLabel>
                <Input id="product" variant="primary" placeholder="Machinery" {...register('product')} />
                <FormErrorMessage>{errors.product && errors.product.message}</FormErrorMessage>
              </FormControl>
            )}
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
              <Input id="contactEmail" type="contactEmail" variant="primary" {...register('contactEmail')} />
              <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactPhone} isRequired>
              <FormLabel htmlFor="contactPhone">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Phone Number
                </Text>
              </FormLabel>
              <PhoneNumberInput id="contactPhone" name="contactPhone" control={control} />
              <FormErrorMessage>{errors.contactPhone && errors.contactPhone.message}</FormErrorMessage>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" width="402px" height="48px" type="submit" isLoading={isPending}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { EditVendorModal };
