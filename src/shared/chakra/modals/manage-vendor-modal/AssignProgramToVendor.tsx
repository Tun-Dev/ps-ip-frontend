import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddVendorToProgram } from '@/hooks/useAddVendorToProgram';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { useGetVendorDetails } from '@/hooks/useGetVendorDetails';
import { Dropdown } from '@/shared/chakra/components';
import type { Vendor, VendorProgramPayload } from '@/types';

type ModalProps = {
  vendor: Vendor;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

const Schema = z.object({ programId: z.string().min(1, 'Program is required') });

type FormValues = z.infer<typeof Schema>;

export const AssignProgramToVendor = ({ vendor, setScreen }: ModalProps) => {
  const { data: vendorDetails } = useGetVendorDetails(vendor.id);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const { mutate, isPending: isAdding } = useAddVendorToProgram();

  const filteredProgramsOptions = useMemo(() => {
    if (!vendorDetails || !programs) return [];

    const programNamesToRemove = vendorDetails.body.map((item) => item.programName);

    return programs.body.data
      .filter((program) => !programNamesToRemove.includes(program.name))
      .map((program) => ({ label: program.name, value: program.id }));
  }, [vendorDetails, programs]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const payload: VendorProgramPayload = {
      id: vendor.id,
      programId: data.programId,
    };
    mutate(payload, {
      onSuccess: () => {
        setScreen('list');
      },
    });
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Assign Vendor to New Program
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Vendor Name
              </Text>
            </FormLabel>
            <Input id="name" variant="primary" defaultValue={vendor.name} isReadOnly />
          </FormControl>
          <FormControl isInvalid={!!errors.programId} isRequired>
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
                  options={filteredProgramsOptions}
                  value={filteredProgramsOptions.find((option) => option.value === value)}
                  onChange={(value) => value && onChange(value.value)}
                  onBlur={onBlur}
                  isDisabled={disabled}
                />
              )}
            />
            <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <SimpleGrid w="full" gap="4" columns={2}>
          <Button type="button" variant="secondary" h="3rem" w="full" onClick={() => setScreen('list')}>
            Back
          </Button>
          <Button type="submit" variant="primary" h="3rem" w="full" isDisabled={hasErrors} isLoading={isAdding}>
            Assign Program
          </Button>
        </SimpleGrid>
      </ModalFooter>
    </ModalContent>
  );
};
