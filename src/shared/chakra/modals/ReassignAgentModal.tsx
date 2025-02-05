import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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

import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useReassignAgent } from '@/hooks/useReassignAgent';
import { Dropdown } from '@/shared/chakra/components';
import type { AggregatorAgent, ReassignAgentPayload } from '@/types';
import { useEffect, useMemo } from 'react';

const Schema = z.object({ programId: z.string().min(1, 'Program is required') });

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

  const programOptions = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const { mutate, isPending } = useReassignAgent();

  const defaultValues = useMemo(() => ({ programId: agent.programId }), [agent]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  useEffect(() => {
    if (agent) {
      reset(defaultValues);
    }
  }, [defaultValues, agent, reset]);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const aggregatorId = getAggregatorId(data.programId);

    if (!aggregatorId) return toast({ status: 'error', title: 'Aggregator not found' });

    const payload: ReassignAgentPayload = {
      aggregatorId,
      agents: [{ aggregatorId, agentId: agent.id, programDetails: { programId: data.programId } }],
    };

    mutate(payload, {
      onSuccess: () => {
        toast({ title: 'Agent reassigned successfully', status: 'success' });
        onClose();
      },
    });
  };

  const getAggregatorId = (programId: string) => {
    if (!currentUser || !currentUser.body.aggregator) return null;

    const aggregatorPrograms = currentUser.body.aggregator.aggregatorPrograms;

    if (aggregatorPrograms.length < 1) return null;

    const aggregatorProgram = aggregatorPrograms.find((program) => program.programId === programId);

    if (aggregatorProgram) return aggregatorProgram.id;

    return null;
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
                    options={programOptions}
                    value={programOptions?.find((option) => option.value === value)}
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
