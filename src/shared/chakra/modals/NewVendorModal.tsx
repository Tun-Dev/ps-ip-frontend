import { useCreateVendor } from '@/hooks/useCreateVendor';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
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
import { PhoneNumberInput } from '../components/phone-number-input';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  programId: z.string().min(1, 'Program is required'),
  service: z.string().min(1, 'Services is required'),
  product: z.string().optional(),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  contactEmail: z.string().min(1, 'Contact Email is required').email('Invalid email'),
  contactPhone: z
    .string({ invalid_type_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, 'Invalid phone number'),
});

type FormValues = z.infer<typeof Schema>;

const NewVendorModal = ({ isOpen, onClose }: ModalProps) => {
  const [showProductField, setShowProductField] = useState(false);

  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const { mutate, isPending } = useCreateVendor();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormValues) => {
    const vendorData = {
      name: data.name,
      programId: data.programId,
      service: data.service,
      product: data.product,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      user: { email: data.email, firstname: data.firstname, lastname: data.lastname },
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
          <Text variant="Body1Semibold">Add New Vendor</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Vendor Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" {...register('name')} />
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
            </FormControl>
            <FormControl isInvalid={!!errors.service}>
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
              <FormControl isInvalid={!!errors.product}>
                <FormLabel htmlFor="product">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Type of Product
                  </Text>
                </FormLabel>
                <Input id="product" variant="primary" placeholder="Machinery" {...register('product')} />
                <FormErrorMessage>{errors.product && errors.product.message}</FormErrorMessage>
              </FormControl>
            )}
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
            <FormControl isInvalid={!!errors.firstname}>
              <FormLabel htmlFor="firstname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  First Name
                </Text>
              </FormLabel>
              <Input id="firstname" variant="primary" {...register('firstname')} />
              <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastname}>
              <FormLabel htmlFor="lastname">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Last Name
                </Text>
              </FormLabel>
              <Input id="lastname" variant="primary" {...register('lastname')} />
              <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactEmail}>
              <FormLabel htmlFor="contactEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Email
                </Text>
              </FormLabel>
              <Input id="contactEmail" type="contactEmail" variant="primary" {...register('contactEmail')} />
              <FormErrorMessage>{errors.contactEmail && errors.contactEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.contactPhone}>
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
            Add New Vendor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { NewVendorModal };
