import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useCheckboxGroup,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetAllAggregatorPrograms } from '@/hooks/useGetAllAggregatorPrograms';
import { useScheduleActivation } from '@/hooks/useScheduleActivation';
import type { AggregatorAgent, ScheduleActivationPayload } from '@/types';
import { useMemo } from 'react';
import { Dropdown } from '../components';
import { CustomCheckbox } from '../components/custom-checkbox';

const Schema = z.object({
  programId: z.string({ required_error: 'Program is required' }),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  startDate: z.coerce.date({ required_error: 'Start date is required' }),
  endDate: z.coerce.date({ required_error: 'End date is required' }),
});

type FormValues = z.infer<typeof Schema>;

const DAYS = [
  { label: 'Sun', value: 'Sunday' },
  { label: 'Mon', value: 'Monday' },
  { label: 'Tue', value: 'Tuesday' },
  { label: 'Wed', value: 'Wednesday' },
  { label: 'Thu', value: 'Thursday' },
  { label: 'Fri', value: 'Friday' },
  { label: 'Sat', value: 'Saturday' },
];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  agents: AggregatorAgent[];
};

export const ScheduleActivationModal = ({ isOpen, onClose, agents }: ModalProps) => {
  const toast = useToast();

  const { data: programs } = useGetAllAggregatorPrograms(isOpen);

  const options = useMemo(() => {
    if (!programs) return [];
    return programs.body.map((program) => ({ label: program.name, value: program.id }));
  }, [programs]);

  const { mutate: scheduleActivation, isPending } = useScheduleActivation();

  const { control, register, handleSubmit, formState, reset } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(formState.errors).length > 0;

  const { value: days, setValue: setDays, getCheckboxProps } = useCheckboxGroup();

  const onSubmit = ({ programId, startTime, endTime, startDate, endDate }: FormValues) => {
    if (agents.length < 1) return toast({ title: 'Error', description: 'No agents selected', status: 'error' });

    const agentsToActivate: ScheduleActivationPayload[] = agents.map((agent) => ({
      agent: { agentId: agent.id, programId },
      schedule: { days, startTime, endTime, startDate, endDate },
    }));

    scheduleActivation(agentsToActivate, {
      onSuccess: () => {
        handleClose();
        toast({ title: 'Success', description: 'Activation scheduled successfully', status: 'success' });
      },
    });
  };

  const handleClose = () => {
    reset();
    setDays([]);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          maxW="42.375rem"
          minH="calc(100% - 8rem)"
          borderRadius="12px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader>
            <Text variant="Body1Semibold">Schedule Agents {`(${agents.length})`}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap="4">
              <FormControl isInvalid={!!formState.errors.programId}>
                <FormLabel htmlFor="programId">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Program
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
                <FormErrorMessage>{formState.errors.programId && formState.errors.programId.message}</FormErrorMessage>
              </FormControl>
              <Stack gap="3">
                <Text as="span" variant="Body2Semibold" color="grey.500">
                  Batch Schedule
                </Text>
                <HStack gap="3.5">
                  {DAYS.map((day) => (
                    <CustomCheckbox key={day.value} {...getCheckboxProps({ label: day.label, value: day.value })} />
                  ))}
                </HStack>
              </Stack>
              <SimpleGrid columns={2} gap="4">
                <FormControl isInvalid={!!formState.errors.startDate}>
                  <FormLabel htmlFor="startDate">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Start Date
                    </Text>
                  </FormLabel>
                  <Input id="startDate" type="date" {...register('startDate')} />
                  <FormErrorMessage>
                    {formState.errors.startDate && formState.errors.startDate.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formState.errors.endDate}>
                  <FormLabel htmlFor="endDate">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      End Date
                    </Text>
                  </FormLabel>
                  <Input id="startDate" type="date" {...register('endDate')} />
                  <FormErrorMessage>{formState.errors.endDate && formState.errors.endDate.message}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} gap="4">
                <FormControl isInvalid={!!formState.errors.startTime}>
                  <FormLabel htmlFor="startTime">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      Start Time
                    </Text>
                  </FormLabel>
                  <Input id="startTime" type="time" {...register('startTime')} />
                  <FormErrorMessage>
                    {formState.errors.startTime && formState.errors.startTime.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formState.errors.endTime}>
                  <FormLabel htmlFor="endTime">
                    <Text as="span" variant="Body2Semibold" color="grey.500">
                      End Time
                    </Text>
                  </FormLabel>
                  <Input id="startTime" type="time" {...register('endTime')} />
                  <FormErrorMessage>{formState.errors.endTime && formState.errors.endTime.message}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              w="25.125rem"
              h="3rem"
              mx="auto"
              type="submit"
              isLoading={isPending}
              isDisabled={hasErrors}
            >
              Schedule Agent
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
