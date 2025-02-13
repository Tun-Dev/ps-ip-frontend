import { useUpdateVendorById } from '@/hooks/useEditVendorById';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
import { Vendor } from '@/types';
import { formatDateForInput, SERVICES } from '@/utils';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<Vendor>;
};

const EditVendorModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id.toString() }));

  const [showProductField, setShowProductField] = useState(false);

  const { mutate, isPending } = useUpdateVendorById(initialValues?.id as string, () => {
    onClose();
    reset();
  });

  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    programName: z.string().optional(),
    programId: z.string().min(1, 'Program is required'),
    amount: z.coerce.number().min(0, 'Amount is required'),
    numberOfBeneficiaries: z.coerce.number().min(0, 'Number of Beneficiaries is required'),
    product: z.string().optional(),
    service: z.string().min(1, 'Services is required'),
    scheduledDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Scheduled date must be a valid ISO string',
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'End date must be a valid ISO string',
    }),
    contactEmail: z.string().min(1, 'Contact Email is required'),
    contactPhone: z
      .string()
      .nonempty('Phone number is required')
      // Accept only 10 digits, not starting with 0
      .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits and cannot start with 0'),
  });

  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(
    () => ({
      name: initialValues?.name || '',
      programName: initialValues?.programName || '',
      programId: initialValues?.programId || '',
      amount: initialValues?.amount || 0,
      numberOfBeneficiaries: initialValues?.numberOfBeneficiaries || 0,
      product: initialValues?.product || '',
      service: initialValues?.item || '',
      scheduledDate: initialValues?.scheduledDate || new Date().toISOString(),
      endDate: initialValues?.endDate || new Date().toISOString(),
      id: initialValues?.id || '',
      contactEmail: initialValues?.contactEmail || '',
      contactPhone: initialValues?.contactPhone || '',
    }),
    [initialValues]
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  useEffect(() => {
    if (initialValues) {
      reset(defaultValues);
    }
  }, [defaultValues, initialValues, reset]);

  const onSubmit = (data: FormValues) => {
    const vendorData: Partial<Vendor> = {
      name: data.name,
      item: data.service,
      product: data.product ? data.product : undefined,
      amount: data.amount,
      scheduledDate: data.scheduledDate,
      endDate: data.endDate,
      numberOfBeneficiaries: data.numberOfBeneficiaries,
      programId: data.programId,
      programName: data.programName,
      id: initialValues?.id || '',
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
    };
    mutate(vendorData);
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
                defaultValue={initialValues?.programId}
                render={({ field }) => {
                  return (
                    <Dropdown
                      id="programId"
                      variant="whiteDropdown"
                      placeholder="Select program"
                      options={options}
                      value={options?.find((option) => option.value === field.value)}
                      onChange={(option) => {
                        field.onChange(option ? parseInt(option.value) : 0);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  );
                }}
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
            <FormControl isInvalid={!!errors.numberOfBeneficiaries}>
              <FormLabel htmlFor="numberOfBeneficiaries">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Number of Beneficiaries
                </Text>
              </FormLabel>
              <Input
                type="number"
                id="numberOfBeneficiaries"
                placeholder="0"
                {...register('numberOfBeneficiaries')}
              ></Input>
              <FormErrorMessage>
                {errors.numberOfBeneficiaries && errors.numberOfBeneficiaries.message}
              </FormErrorMessage>
            </FormControl>
            <Grid templateColumns="repeat(2,1fr)" gap={4}>
              <FormControl isInvalid={!!errors.scheduledDate}>
                <FormLabel htmlFor="scheduledDate">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Scheduled Date
                  </Text>
                </FormLabel>
                <Controller
                  name="scheduledDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="scheduledDate"
                      type="date"
                      defaultValue={field.value ? formatDateForInput(field.value) : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date.toISOString());
                      }}
                    />
                  )}
                />
                <FormErrorMessage>{errors.scheduledDate && errors.scheduledDate.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.endDate}>
                <FormLabel htmlFor="endDate">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    End Date
                  </Text>
                </FormLabel>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="endDate"
                      type="date"
                      defaultValue={field.value ? formatDateForInput(field.value) : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date.toISOString());
                      }}
                    />
                  )}
                />
                <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
              </FormControl>
            </Grid>
            <FormControl isInvalid={!!errors.contactEmail}>
              <FormLabel htmlFor="contactEmail">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Contact Email
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
              <InputGroup>
                <InputLeftAddon>+234</InputLeftAddon>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="e.g. 8012345678"
                  variant="primary"
                  {...register('contactPhone')}
                />
              </InputGroup>

              <FormErrorMessage>{errors.contactPhone && errors.contactPhone.message}</FormErrorMessage>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" width="402px" height="48px" type="submit" isLoading={isPending}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { EditVendorModal };
