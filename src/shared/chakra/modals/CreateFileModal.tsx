import { useCreateGroup } from '@/hooks/useCreateGroup';
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
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateFileModal = ({ isOpen, onClose }: ModalProps) => {
  const toast = useToast();
  const { mutate: createGroup, isPending } = useCreateGroup();
  const Schema = z.object({
    name: z.string().min(1, 'Name is required'),
  });

  type FormValues = z.infer<typeof Schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
    };

    createGroup(payload, {
      onSuccess: () => {
        toast({ title: 'Group Created successfully', status: 'success' });
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          maxW="42.375rem"
          minH="calc(100% - 8rem)"
          borderRadius="12px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader>
            <Text variant="Body1Semibold">Create New File</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <FormControl isInvalid={!!errors.name} isRequired>
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
            <Button variant="primary" w="25.125rem" h="3rem" mx="auto" type="submit" isLoading={isPending}>
              Create New File
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFileModal;
