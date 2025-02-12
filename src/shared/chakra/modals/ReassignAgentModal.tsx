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
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetStates } from '@/hooks/useGetStates';
import { useReassignAgent } from '@/hooks/useReassignAgent';
import { Dropdown } from '@/shared/chakra/components';
import type { AggregatorAgent } from '@/types';
import { Fragment, useCallback, useEffect, useMemo } from 'react';

const Schema = z.object({
  programs: z.array(
    z.object({
      agentId: z.string().min(1, 'Agent is required'),
      aggregatorId: z.string().min(1, 'Aggregator is required'),
      programDetails: z.object({
        programId: z.string().min(1, 'Program is required'),
        objective: z.coerce.number().min(1),
        lgaId: z.coerce.number().min(1, 'LGA is required'),
      }),
    })
  ),
});

type FormValues = z.infer<typeof Schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  agent: AggregatorAgent;
};

export const ReassignAgentModal = ({ isOpen, onClose, agent }: Props) => {
  const toast = useToast();

  const { data: currentUser } = useGetCurrentUser();
  const { data: programs } = useGetAllAggregatorPrograms(isOpen);
  const { data: states } = useGetStates(isOpen);

  const programOptions = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

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

  const { mutate, isPending } = useReassignAgent();

  const lgaId = useMemo(() => {
    return stateOptions.flatMap((state) => state.options).find((option) => option.label === agent.lga)?.value ?? 0;
  }, [agent, stateOptions]);

  const aggregatorId = useMemo(() => {
    if (!currentUser) return '';
    return currentUser.body.aggregator.id;
  }, [currentUser]);

  const defaultValues = useMemo(
    () => ({
      programs: [
        {
          agentId: agent.id,
          aggregatorId,
          programDetails: { programId: agent.programId, lgaId, objective: 0 },
        },
      ],
    }),
    [agent, aggregatorId, lgaId]
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });
  const { fields, append, remove } = useFieldArray({ name: 'programs', control });

  useEffect(() => {
    if (agent) {
      reset(defaultValues);
    }
  }, [defaultValues, agent, reset]);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const aggregatorProgramId = getAggregatorProgramId();

    if (!aggregatorProgramId) return toast({ status: 'error', title: 'Aggregator not found' });

    mutate(
      { aggregatorProgramId, programs: data.programs },
      {
        onSuccess: () => {
          toast({ title: 'Agent reassigned successfully', status: 'success' });
          onClose();
        },
      }
    );
  };

  const getAggregatorProgramId = () => {
    if (!currentUser || !currentUser.body.aggregator) return null;

    const aggregatorPrograms = currentUser.body.aggregator.aggregatorPrograms;

    if (aggregatorPrograms.length < 1) return null;

    return aggregatorPrograms[0].id;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Reassign Agent</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <FormControl isInvalid={!!errors.programs?.[index]?.programDetails?.programId}>
                  <Flex align="center" justify="space-between">
                    <FormLabel htmlFor={`programId-${field.id}`}>
                      <Text as="span" variant="Body2Semibold" color="grey.500">
                        {index === 0 ? 'Assign' : 'Additional'} Program
                      </Text>
                    </FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      fontWeight="500"
                      fontSize="0.8125rem"
                      color="red"
                      onClick={() => remove(index)}
                    >
                      Remove Program
                    </Button>
                  </Flex>
                  <Controller
                    control={control}
                    name={`programs.${index}.programDetails.programId`}
                    render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                      <Dropdown
                        id={`programId-${field.id}`}
                        variant="whiteDropdown"
                        placeholder="Select program"
                        name={name}
                        options={programOptions}
                        value={programOptions?.find((option) => option.value === value)}
                        onChange={(value) => value && onChange(value.value)}
                        onBlur={onBlur}
                        isDisabled={disabled}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.programs?.[index]?.programDetails?.programId &&
                      errors.programs?.[index]?.programDetails?.programId.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.programs?.[index]?.programDetails?.lgaId}>
                  <FormLabel htmlFor={`lgaId-${field.id}`}>
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Local Government Area to Enumerate
                    </Text>
                  </FormLabel>
                  <Controller
                    control={control}
                    name={`programs.${index}.programDetails.lgaId`}
                    render={({ field: { name, onBlur, onChange, value, disabled } }) => (
                      <Dropdown
                        id={`lgaId-${field.id}`}
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
                  <FormErrorMessage>
                    {errors.programs?.[index]?.programDetails?.lgaId &&
                      errors.programs?.[index]?.programDetails?.lgaId.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.programs?.[index]?.programDetails?.objective}>
                  <FormLabel htmlFor={`objective-${field.id}`}>
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Set Objective
                    </Text>
                  </FormLabel>
                  <Input
                    id={`objective-${field.id}`}
                    variant="primary"
                    type="number"
                    placeholder="300"
                    {...register(`programs.${index}.programDetails.objective`)}
                  />
                  <FormErrorMessage>
                    {errors.programs?.[index]?.programDetails?.objective &&
                      errors.programs?.[index]?.programDetails?.objective.message}
                  </FormErrorMessage>
                </FormControl>
              </Fragment>
            ))}
            <Button
              type="button"
              variant="link"
              fontWeight="500"
              fontSize="0.8125rem"
              color="grey.500"
              display="inline-block"
              ml="auto"
              onClick={() =>
                append({
                  agentId: agent.id,
                  aggregatorId: agent.aggregator,
                  programDetails: { programId: '', objective: 0, lgaId: 0 },
                })
              }
            >
              {fields.length < 1 ? 'Assign Program' : 'Add Additional Program'}
            </Button>
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
