import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  ModalFooter,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { useCreateGroup } from '@/hooks/useCreateGroup';
import { GroupEditPayload } from '@/types';
import { useEditGroup } from '@/hooks/useEditGroup';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: GroupEditPayload;
};

const EditFileModal = ({ isOpen, onClose, initialValues }: ModalProps) => {
  const toast = useToast();
  const { mutate: editGroup, isPending } = useEditGroup();
  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
  });

  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(
    () => ({
      name: initialValues?.name || '',
    }),
    [initialValues]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  useEffect(() => {
    if (initialValues) {
      reset(defaultValues);
    }
  }, [defaultValues, initialValues, reset]);

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      id: initialValues?.id,
    };

    editGroup(payload, {
      onSuccess: () => {
        toast({ title: 'Saved successfully', status: 'success' });
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" width="498px" height="756px" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text variant="Body1Semibold">Edit File</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    File Name
                  </Text>
                </FormLabel>
                <Input id="name" variant="primary" placeholder="iDICE" {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" width="402px" height="48px" type="submit" isLoading={isPending}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditFileModal };
