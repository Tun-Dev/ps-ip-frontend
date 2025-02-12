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
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddAggregatorToProgram } from '@/hooks/useAddAggregatorToProgram';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { Dropdown } from '@/shared/chakra/components';
import { Aggregator } from '@/types';
import { useGetAggregatorsByID } from '@/hooks/useGetAggregatorByID';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  aggregator?: Aggregator;
};

const Schema = z.object({
  //   name: z.string().min(1, 'Name is required'),
  maxAgents: z.coerce.number().min(1),
  programId: z.string().min(1, 'Program is required'),
});

type FormValues = z.infer<typeof Schema>;

const AssignNewProgram = ({ onClose, isOpen, aggregator }: ModalProps) => {
  console.log(aggregator);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });

  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  console.log(options);

  const { mutate, isPending } = useAddAggregatorToProgram(onClose);

  const { response } = useGetAggregatorsByID(`${aggregator?.id}`);

  console.log(response);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      id: `${aggregator?.id}`,
      ...data,
    };
    console.log(formattedData);
    mutate(formattedData);
  };

  // Extract all program names to remove from the programData array
  const programNamesToRemove = response?.body?.map((item) => item.programName);

  // Filter the programsArray to exclude any object whose label is in programNamesToRemove
  const filteredProgramsOptions = options?.filter((program) => !programNamesToRemove?.includes(program.label));

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Assign Aggregator to New Program</Text>
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
              <Input id="name" variant="primary" defaultValue={aggregator?.name} readOnly />
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
                    value={options?.find((option) => option.value === value)}
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
            Assign Program
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignNewProgram;
