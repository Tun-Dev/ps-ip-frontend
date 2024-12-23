import {
  Button,
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
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
import { Aggregator } from '@/types';
import { useEffect, useMemo } from 'react';
import { useReassignAggregator } from '@/hooks/useReassignAggregator';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<Aggregator>;
};

const EditAggregatorModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const toast = useToast();
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });

  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const { mutate, isPending } = useReassignAggregator();

  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
    // maxAgents: z.coerce.number().min(1),
    programId: z.coerce.number().min(1, 'Program is required'),
  });

  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(
    () => ({
      name: initialValues?.name || '',
      //   maxAgents: Number(initialValues?.maxAgents) || 0,
      programId: Number(initialValues?.programId) || 0,
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

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const payload = {
      id: initialValues?.id,
      maxAgents: initialValues?.maxAgents,
      contactEmail: initialValues?.contactEmail,
      contactPhone: initialValues?.contactPhone,
      ...data,
    };
    mutate(payload, {
      onSuccess: () => {
        toast({ title: 'Reassigned successfully', status: 'success' });
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        minH="35rem"
        maxH="calc(100vh - 10rem)"
        borderRadius="12px"
      >
        <ModalHeader>
          <Text variant="Body1Semibold">Reassign Aggregator</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Aggregator Name
                </Text>
              </FormLabel>
              <Input id="name" variant="primary" placeholder="NURTW" readOnly {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={!!errors.maxAgents}>
              <FormLabel htmlFor="maxAgents">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Set Maximum Agents
                </Text>
              </FormLabel>
              <Input id="maxAgents" variant="primary" type="number" placeholder="300" {...register('maxAgents')} />
              <FormErrorMessage>{errors.maxAgents && errors.maxAgents.message}</FormErrorMessage>
            </FormControl> */}
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
                    value={options?.find((option) => parseInt(option.value) === value)}
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
          <Button
            type="submit"
            variant="primary"
            width="402px"
            height="48px"
            isDisabled={hasErrors}
            isLoading={isPending}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { EditAggregatorModal };
