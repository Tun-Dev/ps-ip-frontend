// import page from '@/app/page';
// import { useCreateGroup } from '@/hooks/useCreateGroup';
import { useCreateWhiteList } from '@/hooks/useCreateWhiteList';
import { useFilterVendors } from '@/hooks/useFilterVendors';
import {
  Button,
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
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropdown } from '../components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programType?: string;
  beneficiariesIds?: string[];
  programId: string;
};

const CreateWhiteListBucket = ({ isOpen, onClose, programId, beneficiariesIds, programType }: ModalProps) => {
  const toast = useToast();
  const { mutate: createWhitelist, isPending } = useCreateWhiteList();
  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    vendorId: z.coerce.number().optional(),
    amount: z.coerce.number().optional(),
  });

  type FormValues = z.infer<typeof Schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const { response: data } = useFilterVendors({ program: programId, page: 1, pageSize: 999 });

  console.log(data);

  const vendors = useMemo(() => {
    if (!data) return [];
    return data.body.data.map((vendor) => ({
      label: vendor.name,
      value: vendor.programDetails.find((program) => program.programId === programId)?.vendorId ?? 0,
    }));
  }, [data, programId]);

  console.log(vendors);

  const currentVendor = useCallback((value: number) => vendors.find((vendor) => vendor.value === value), [vendors]);

  const onSubmit = (data: FormValues) => {
    const payload = {
      programId: programId,
      ...(beneficiariesIds && beneficiariesIds.length > 0 ? { beneficiaries: beneficiariesIds } : {}),
      ...data,
    };

    createWhitelist(payload, {
      onSuccess: () => {
        toast({ title: 'Whitelist Created successfully', status: 'success' });
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          reset();
          onClose();
        }}
        scrollBehavior="inside"
        isCentered
      >
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
                  <FormLabel htmlFor="vendorId">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Vendor
                    </Text>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="vendorId"
                    render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                      <Dropdown
                        id="vendorId"
                        variant="whiteDropdown"
                        placeholder="Vendor"
                        name={name}
                        options={vendors}
                        value={value ? currentVendor(value) : undefined}
                        onChange={(selected) => selected && onChange(selected.value)}
                        onBlur={onBlur}
                        isDisabled={disabled}
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.vendorId && errors.vendorId.message}</FormErrorMessage>
                </FormControl>
              )}

              {(programType === 'Grants' || programType === 'Loans') && (
                <FormControl isInvalid={!!errors.amount} isRequired>
                  <FormLabel htmlFor="amount">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Amount
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
                      variant="primary"
                      placeholder="500000"
                      {...register('amount')}
                    />
                  </InputGroup>

                  <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
                </FormControl>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" w="25.125rem" h="3rem" mx="auto" type="submit" isLoading={isPending}>
              Create Wishlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWhiteListBucket;
