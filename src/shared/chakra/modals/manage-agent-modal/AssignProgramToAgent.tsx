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
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddAgentToProgram } from '@/hooks/useAddAgentToProgram';
import { useGetAgentDetails } from '@/hooks/useGetAgentDetails';
import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetStates } from '@/hooks/useGetStates';
import { useUserStore } from '@/providers/user-store-provider';
import { Dropdown } from '@/shared/chakra/components';
import type { Agent, AggregatorProgramDetails } from '@/types';

type ModalProps = {
  agent: Agent;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

const Schema = z.object({
  programId: z.string().min(1, 'Program is required'),
  objective: z.coerce.number().min(1),
  lgaId: z.coerce.number().min(1, 'LGA is required'),
});

type FormValues = z.infer<typeof Schema>;

export const AssignProgramToAgent = ({ agent, setScreen }: ModalProps) => {
  const toast = useToast();
  const user = useUserStore((state) => state.user);

  const { data: agentDetails } = useGetAgentDetails(agent.id);
  const { data: states } = useGetStates(!!agent);
  const { data: currentUser } = useGetCurrentUser();
  const { data: programs } = useGetAllAggregatorPrograms({ aggregatorId: agent.aggregatorId, enabled: !!agent });
  const { mutate, isPending: isAdding } = useAddAgentToProgram();

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return states.body.map((state) => ({
      label: state.name,
      options: state.LGAs.map((lga) => ({ label: lga.name, value: lga.id })),
    }));
  }, [states]);

  const currentLGA = useCallback(
    (value: number) => stateOptions.flatMap((state) => state.options).find((option) => option.value === value),
    [stateOptions]
  );
  const filteredProgramsOptions = useMemo(() => {
    if (!agentDetails || !programs) return [];

    const programNamesToRemove = agentDetails.body.map((item) => item.programId);

    return programs.body
      .filter((program) => !programNamesToRemove.includes(program.id))
      .map((program) => ({ label: program.name, value: program.id }));
  }, [agentDetails, programs]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const getAggregatorId = (aggregatorPrograms: AggregatorProgramDetails[], programId: string) => {
    if (user && user.roles.includes('Aggregator') && currentUser) {
      const aggregatorProgram = currentUser.body.aggregator.aggregatorPrograms.find(
        (program) => program.programId === programId
      );
      if (aggregatorProgram) return aggregatorProgram.id;
    }
    if (!aggregatorPrograms) return null;
    const aggregatorProgram = aggregatorPrograms.find((program) => program.programId === programId);
    if (aggregatorProgram) return aggregatorProgram.aggregatorId;
    return null;
  };

  const onSubmit = (programDetails: FormValues) => {
    const aggregatorId = getAggregatorId(agent.aggregatorDetails, programDetails.programId);

    if (!aggregatorId) return toast({ title: 'Error', description: 'Aggregator not found', status: 'error' });

    mutate([{ agentId: agent.id, aggregatorId, programDetails }], {
      onSuccess: () => {
        setScreen('list');
      },
    });
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Assign Agent to New Program
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Agent Name
              </Text>
            </FormLabel>
            <Input id="name" variant="primary" defaultValue={`${agent.firstName} ${agent.lastName}`} isReadOnly />
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
          <FormControl isInvalid={!!errors.lgaId}>
            <FormLabel htmlFor="lgaId">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Local Government Area to Enumerate
              </Text>
            </FormLabel>
            <Controller
              control={control}
              name="lgaId"
              render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                <Dropdown
                  id="lgaId"
                  variant="whiteDropdown"
                  placeholder="Select LGA"
                  name={name}
                  options={stateOptions}
                  value={currentLGA(value)}
                  onChange={(selected) => selected && onChange(selected.value)}
                  onBlur={onBlur}
                  isDisabled={disabled}
                />
              )}
            />
            <FormErrorMessage>{errors.lgaId && errors.lgaId.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.objective}>
            <FormLabel htmlFor="objective">
              <Text as="span" variant="Body2Semibold" color="grey.500">
                Set Objective
              </Text>
            </FormLabel>
            <Input id="objective" variant="primary" type="number" placeholder="300" {...register('objective')} />
            <FormErrorMessage>{errors.objective && errors.objective.message}</FormErrorMessage>
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
