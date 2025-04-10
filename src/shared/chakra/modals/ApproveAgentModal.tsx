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
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useApproveAgents } from '@/hooks/useApproveAgents';
import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { Dropdown } from '@/shared/chakra/components';
import type { AggregatorProgramDetails, PendingAgent } from '@/types';
import { useMemo } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  agents: PendingAgent[];
};

const Schema = z.object({ programId: z.string().min(1, 'Program is required') });

type FormValues = z.infer<typeof Schema>;

export const ApproveAgentModal = ({ isOpen, onClose, agents }: ModalProps) => {
  const toast = useToast();
  const { data: programs } = useGetAllAggregatorPrograms({ enabled: isOpen });
  const options = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const { mutate: approveAgent, isPending } = useApproveAgents();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const getAggregatorId = (aggregatorPrograms: AggregatorProgramDetails[], programId: string) => {
    const aggregatorProgram = aggregatorPrograms.find((program) => program.programId === programId);
    if (aggregatorProgram) return aggregatorProgram.aggregatorId;
    return null;
  };

  const onSubmit = (data: FormValues) => {
    const filteredAgents = agents.filter((agent) => {
      const aggregatorId = getAggregatorId(agent.aggregatorDetails, data.programId);
      return !!aggregatorId;
    });

    if (filteredAgents.length === 0)
      return toast({ title: 'Error', description: 'No aggregators found for the selected agents', status: 'error' });

    const agentsToApprove = filteredAgents.map((agent) => {
      const aggregatorId = getAggregatorId(agent.aggregatorDetails, data.programId) ?? '';
      return { agentId: agent.id, aggregatorId };
    });

    approveAgent(agentsToApprove, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent as="form" width="498px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Text variant="Body1Semibold">Approve Agent</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                  options={options}
                  value={options?.find((option) => option.value === value)}
                  onChange={(value) => value && onChange(value.value)}
                  onBlur={onBlur}
                  isDisabled={disabled}
                />
              )}
            />
            <FormErrorMessage>{errors.programId && errors.programId.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" width="402px" height="48px" type="submit" isLoading={isPending}>
            Approve Agent
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
