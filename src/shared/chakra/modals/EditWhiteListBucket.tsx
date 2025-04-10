// import page from '@/app/page';
// import { useFilterVendors } from '@/hooks/useFilterVendors';
import { useEditWhiteList } from '@/hooks/useEditWhitelist';
import { WhitelistDetails } from '@/types';
import {
  Button,
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
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programType?: string;
  programId: string;
  initialValue: WhitelistDetails;
};

const EditWhiteListBucket = ({ isOpen, onClose, programId, programType, initialValue }: ModalProps) => {
  const toast = useToast();
  const { mutate: editWhitelist, isPending } = useEditWhiteList();
  //   const [page, setPage] = useState(1);
  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    vendorId: z.string().nullable().optional(),
    beneficiariesNo: z.coerce.number().min(1, 'Number of Beneficiaries is required'),
    // amount: z.coerce.number().nullable(),
  });

  // console.log(initialValue);

  type FormValues = z.infer<typeof Schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues: initialValue });

  const onSubmit = (data: FormValues) => {
    // console.log('working');
    const { vendorId, ...rest } = data;
    const payload = {
      programId: programId,
      id: initialValue?.id,
      ...rest,
      ...(vendorId ? { vendorId: Number(vendorId) } : {}),
    };

    console.log('payload', payload);

    editWhitelist(payload, {
      onSuccess: () => {
        toast({ title: 'Saved successfully', status: 'success' });
        reset();
        onClose();
      },
    });
  };

  // console.log(programId);

  // const {
  //   response: data,
  //   // isLoading,
  //   // isError,
  //   // isRefetchError,
  //   // isRefetching,
  //   // refetch,
  // } = useFilterVendors({
  //   program: programId,
  //   page: 1,
  //   pageSize: 999,
  // });
  // const vendors = useMemo(() => data?.body.data ?? [], [data]);
  // console.log(vendors);
  //   const totalPages = data?.body.totalPages ?? 0;

  const genderOptions = useMemo(
    () => [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
    []
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          maxW="42.375rem"
          minH="calc(100% - 8rem)"
          borderRadius="12px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader>
            <Text variant="Body1Semibold">Create Whitelist</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="20px">
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel htmlFor="name">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Name
                  </Text>
                </FormLabel>
                <Input id="name" variant="primary" placeholder="GEEP - Whitelist 1" {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              {(programType === 'Equipment' || programType === 'Capacity building') && (
                <FormControl isInvalid={!!errors.vendorId} isRequired>
                  <FormLabel htmlFor="gender">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Vendor
                    </Text>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="vendorId"
                    render={({
                      field: {
                        name,
                        onBlur,
                        onChange,
                        // value,
                        disabled,
                      },
                    }) => (
                      <Dropdown
                        id="vendorId"
                        variant="whiteDropdown"
                        placeholder="Vendor"
                        name={name}
                        options={genderOptions}
                        // value={currentGender(value)}
                        onChange={(selected) => selected && onChange(selected.value)}
                        onBlur={onBlur}
                        isDisabled={disabled}
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.vendorId && errors.vendorId.message}</FormErrorMessage>
                </FormControl>
              )}

              {/* {(programType === 'Grants' || programType === 'Loans') && (
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel htmlFor="amount">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Amount
                    </Text>
                  </FormLabel>
                  <Input
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    id="amount"
                    variant="primary"
                    placeholder="500000"
                    {...register('amount', { valueAsNumber: true })}
                  />
                  <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
                </FormControl>
              )} */}
              <FormControl isInvalid={!!errors.beneficiariesNo} isRequired>
                <FormLabel htmlFor="beneficiariesNo">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Number of Beneficiaries
                  </Text>
                </FormLabel>
                <Input
                  type="number"
                  onWheel={(e) => e.currentTarget.blur()}
                  id="beneficiariesNo"
                  variant="primary"
                  placeholder="1500"
                  {...register('beneficiariesNo', { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.beneficiariesNo && errors.beneficiariesNo.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" w="25.125rem" h="3rem" mx="auto" type="submit" isLoading={isPending}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditWhiteListBucket;
