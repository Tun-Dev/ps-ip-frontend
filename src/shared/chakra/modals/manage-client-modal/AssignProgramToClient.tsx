import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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

import { useAddClientToProgram } from '@/hooks/useAddClientToProgram';
import { useGetClientByID } from '@/hooks/useGetClientByID';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { useGetStates } from '@/hooks/useGetStates';
import { Dropdown } from '@/shared/chakra/components';
import type { Client } from '@/types';

type ModalProps = {
  client: Client;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

const Schema = z.object({
  objective: z.coerce.number().min(1),
  programId: z.string().min(1, 'Program is required'),
  stateId: z.coerce.number().min(1),
  amountDisbursed: z.coerce.number(),
});

type FormValues = z.infer<typeof Schema>;

export const AssignProgramToClient = ({ client, setScreen }: ModalProps) => {
  const { data: aggregatorDetails } = useGetClientByID(client.id);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const { mutate, isPending: isAdding } = useAddClientToProgram({ id: client.id });

  const filteredProgramsOptions = useMemo(() => {
    if (!aggregatorDetails || !programs) return [];

    const programNamesToRemove = aggregatorDetails.body.map((item) => item.programName);

    return programs.body.data
      .filter((program) => !programNamesToRemove.includes(program.name))
      .map((program) => ({ label: program.name, value: program.id }));
  }, [aggregatorDetails, programs]);

  const { data: states } = useGetStates();

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return states.body.map((state) => ({ label: state.name, value: state.id }));
  }, [states]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const payload = {
      clientId: client.id,
      ...data,
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
          Assign Client to New Program
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Client Name
              </Text>
            </FormLabel>
            <Input id="name" variant="primary" defaultValue={client.name} isReadOnly />
          </FormControl>
          <FormControl isInvalid={!!errors.amountDisbursed}>
            <FormLabel htmlFor="maxAgents">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Amount Disbursable
              </Text>
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Text>₦</Text>
              </InputLeftElement>
              <Input
                id="amountDisbursed"
                variant="primary"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="300000"
                {...register('amountDisbursed')}
              />
            </InputGroup>
            <FormErrorMessage>{errors.amountDisbursed && errors.amountDisbursed.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.objective} isRequired>
            <FormLabel htmlFor="objective">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                No. of Beneficiaries
              </Text>
            </FormLabel>
            <Input
              id="objective"
              variant="primary"
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="300"
              {...register('objective')}
            />
            <FormErrorMessage>{errors.objective && errors.objective.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.stateId} isRequired>
            <FormLabel htmlFor="stateId">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                State
              </Text>
            </FormLabel>
            <Controller
              control={control}
              name="stateId"
              render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                <Dropdown
                  id="stateId"
                  variant="whiteDropdown"
                  placeholder="Select state"
                  name={name}
                  options={stateOptions}
                  value={stateOptions?.find((option) => option.value === value)}
                  onChange={(value) => value && onChange(value.value)}
                  onBlur={onBlur}
                  isDisabled={disabled}
                />
              )}
            />
            <FormErrorMessage>{errors.stateId && errors.stateId.message}</FormErrorMessage>
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
