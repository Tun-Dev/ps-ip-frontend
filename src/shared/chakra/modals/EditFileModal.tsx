import { useEditGroup } from '@/hooks/useEditGroup';
import { GroupEditPayload } from '@/types';
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
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          as="form"
          maxW="42.375rem"
          minH="calc(100% - 8rem)"
          borderRadius="12px"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <SimpleGrid width="full" gap="4" columns={2}>
              <Button variant="cancel" w="full" h="3rem" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" w="full" h="3rem" type="submit" isLoading={isPending}>
                Save
              </Button>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditFileModal };
