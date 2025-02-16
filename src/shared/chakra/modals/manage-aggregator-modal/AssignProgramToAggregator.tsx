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

import { useAddAggregatorToProgram } from '@/hooks/useAddAggregatorToProgram';
import { useGetAggregatorsByID } from '@/hooks/useGetAggregatorByID';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
import type { Aggregator } from '@/types';

type ModalProps = {
  aggregator: Aggregator;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

const Schema = z.object({
  maxAgents: z.coerce.number().min(1),
  programId: z.string().min(1, 'Program is required'),
});

type FormValues = z.infer<typeof Schema>;

export const AssignProgramToAggregator = ({ aggregator, setScreen }: ModalProps) => {
  const { data: aggregatorDetails } = useGetAggregatorsByID(aggregator.id);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const { mutate, isPending: isAdding } = useAddAggregatorToProgram();

  const filteredProgramsOptions = useMemo(() => {
    if (!aggregatorDetails || !programs) return [];

    const programNamesToRemove = aggregatorDetails.body.map((item) => item.programName);

    return programs.body.data
      .filter((program) => !programNamesToRemove.includes(program.name))
      .map((program) => ({ label: program.name, value: program.id }));
  }, [aggregatorDetails, programs]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const payload = {
      id: aggregator.id,
      programId: data.programId,
      maxAgents: data.maxAgents,
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
          Assign Aggregator to New Program
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Aggregator Name
              </Text>
            </FormLabel>
            <Input id="name" variant="primary" defaultValue={aggregator.name} isReadOnly />
          </FormControl>
          <FormControl isInvalid={!!errors.maxAgents}>
            <FormLabel htmlFor="maxAgents">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Set Maximum Agents
              </Text>
            </FormLabel>
            <Input id="maxAgents" variant="primary" type="number" placeholder="300" {...register('maxAgents')} />
            <FormErrorMessage>{errors.maxAgents && errors.maxAgents.message}</FormErrorMessage>
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
