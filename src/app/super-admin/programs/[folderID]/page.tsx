'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdArrowRightAlt, MdLink } from 'react-icons/md';

import { useDeleteProgramFromGroup } from '@/hooks/useDeleteProgramFromGroup';
import { useGetGroupById } from '@/hooks/useGetGroupById';
import { DeleteModal } from '@/shared';
import { GeepComponent, ModuleProgressCard } from '@/shared/chakra/components';
import { Program, ProgramModules } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useToggleNotification } from '@/hooks/useToggleNotification';
import { DuplicateProgramModal } from '@/shared/chakra/modals/DuplicateProgramModal';

const ProgramsPage = () => {
  const [selectedId, setSelectedId] = useState('');
  const { folderID } = useParams();

  const { response, isLoading } = useGetGroupById(folderID.toString());

  const programCount = response?.body.programs.length ?? 0;
  const programList = response?.body.programs ?? [];

  const selectedProgram = programList.find((program) => program.id === selectedId);

  return (
    <Stack pos="relative" overflow="hidden" p="6" spacing="0" justify="space-between" w="full">
      {isLoading ? (
        <LoadingSkeleton />
      ) : programCount < 1 ? (
        <EmptyState />
      ) : (
        <SimpleGrid columns={4} spacingY="6" spacingX="5">
          {programList.map((item, index) => (
            <GeepComponent
              key={index}
              name={item.name}
              logo={item.logo}
              count={Number(item.programModules.length)}
              waveDirection={Number(item.id) % 2 === 0 ? 'bottom' : 'top'}
              isActive={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            />
          ))}
        </SimpleGrid>
      )}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramDrawer program={selectedProgram} onClose={() => setSelectedId('')} isLoading={isLoading} />
        )}
      </AnimatePresence>
    </Stack>
  );
};

const EmptyState = () => (
  <Grid placeContent="center" textAlign="center" gap="2" color="grey.500" w="full" h="full">
    <Flex width="193px" height="182px" borderRadius="12px" bg="primary.200" p="16px 24px">
      <Image src="/icons/Blank.svg" alt="" />
    </Flex>
    <Text variant="Body2Semibold">No Products Available.</Text>
    <Text variant="Body2Semibold">Please create a new product.</Text>
  </Grid>
);

const LoadingSkeleton = () => (
  <SimpleGrid columns={4} spacingY="6" spacingX="5">
    {Array.from({ length: 8 }, (_, index) => (
      <Stack
        key={index}
        pt="2"
        px="3"
        pb="5"
        border="1px solid"
        borderColor="grey.100"
        rounded="2xl"
        boxShadow="card"
        spacing="3"
      >
        <SkeletonText h="20px" noOfLines={1} maxW="5rem" />
        <Box>
          <SkeletonCircle boxSize="6rem" mx="auto" mb="2" />
          <SkeletonText h="40px" noOfLines={2} />
        </Box>
      </Stack>
    ))}
  </SimpleGrid>
);

const ProgramDrawer = ({ program, onClose }: { program: Program; onClose: () => void; isLoading: boolean }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose: deleteModalOnClose } = useDisclosure();
  const { isOpen: isOpenDuplicate, onOpen: onOpenDuplicate, onClose: duplicateModalOnClose } = useDisclosure();
  const router = useRouter();
  const { onCopy } = useClipboard(`${window.origin}/beneficiary/${program?.id}`);
  const { folderID } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleProgramFromGroup, isPending } = useDeleteProgramFromGroup();

  const handleEdit = (itemId: string) => {
    router.push(`/super-admin/programs/${folderID}/edit/${itemId}`);
  };

  const handleDelete = () => {
    deleProgramFromGroup([program.id], {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['group', folderID] });
        toast({ title: 'Program deleted successfully', status: 'success' });
        onClose();
      },
    });
  };

  const toggleNotificationMutation = useToggleNotification();

  const handleToggle = (event: boolean | undefined) => {
    const status = event ? true : false;

    const toastId = toast({
      title: 'Updating notification...',
      status: 'loading',
      duration: null,
      isClosable: false,
      position: 'top-right',
    });

    toggleNotificationMutation.mutate(
      { programId: program.id, status: !status },
      {
        onSuccess: () => {
          toast.update(toastId, {
            title: 'Notification updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: () => {
          toast.update(toastId, {
            title: 'Failed to update notification',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const transition: Transition = { duration: 0.5, ease: 'easeInOut' };

  const modules = reorderDescending(program.programModules);

  const moduleUrl = findFirstActiveObject(modules);

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={deleteModalOnClose}
        action={handleDelete}
        isLoading={isPending}
        text="Are you sure you want to delete this program. Proceeding will erase all programs data."
      />
      <DuplicateProgramModal isOpen={isOpenDuplicate} onClose={duplicateModalOnClose} program={program} />
      <Stack
        spacing="0"
        as={motion.div}
        pos="fixed"
        ml="auto"
        mr="24px"
        inset="0"
        w="calc(100% - 280px)" // Sidebar width
        zIndex={10}
        initial={{ transform: 'translateY(100%)' }}
        exit={{ transform: 'translateY(100%)', transition }}
        animate={{ transform: program ? 'translateY(0%)' : 'translateY(100%)', transition }}
      >
        <Box flex="1" onClick={onClose} />
        <Flex
          p="16px"
          boxShadow="0px -2px 4px -1px #0330000A, 0px -4px 6px -1px #0330000A"
          flexDir="column"
          gap="20px"
          bgColor="white"
        >
          <Flex gap="16px">
            <Flex gap="16px" alignItems="center" w="72%">
              <Avatar name={program.name} src={program.logo} bg="primary.100" boxSize="99px" color="grey.500" />

              <Flex
                flexDir="column"
                p="12px"
                border="1px solid"
                borderColor="grey.200"
                borderRadius="8px"
                gap="4px"
                w="full"
                h="full"
              >
                <Text variant="Body2Semibold" color="primary.500">
                  {program.name}
                </Text>
                <Text variant="Body2Regular" color="text">
                  {program.description}
                </Text>
              </Flex>
            </Flex>
            <Flex w="28%" flexDir="column" gap="16px" justifyContent="center">
              <Button
                variant="primary"
                h="48px"
                w="full"
                onClick={() =>
                  router.push(`/super-admin/programs/${folderID}/${program.id}/${moduleUrl?.name.toLowerCase()}`)
                }
              >
                View More
                <MdArrowRightAlt style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
              </Button>
              <Button
                variant="secondary"
                h="32px"
                w="full"
                fontSize="13px"
                onClick={() => {
                  onCopy();
                  toast({ title: 'Link copied to clipboard', status: 'success' });
                }}
              >
                <MdLink style={{ width: '14px', height: '14px', marginRight: '8px' }} />
                Copy Link
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button bg="white" color="#D5AB57" h="48px" w="full" fontSize="13px">
                    ... More Actions
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Flex flexDirection="column">
                      <Button bg="white" h="32px" w="full" fontSize="13px" onClick={() => handleEdit(program.id)}>
                        Edit Product
                      </Button>
                      <Button bg="white" h="32px" w="full" fontSize="13px" onClick={onOpenDuplicate}>
                        Duplicate Product
                      </Button>
                      <Button bg="white" h="32px" w="full" fontSize="13px" onClick={onOpen}>
                        Delete Product
                      </Button>
                      <Button
                        bg="white"
                        h="32px"
                        w="full"
                        fontSize="13px"
                        onClick={() => handleToggle(program.canSendSms)}
                      >
                        {program.canSendSms ? 'Disable SMS Notifications' : 'Enable SMS Notifications'}
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
          <Flex flexWrap="wrap" gap="16px">
            {modules.map((item, index) => (
              <ModuleProgressCard
                key={index}
                name={item.name}
                number={item.order}
                onClick={() =>
                  router.push(`/super-admin/programs/${folderID}/${program.id}/${item.name.toLowerCase()}`)
                }
              />
            ))}
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};

export default ProgramsPage;

function reorderDescending(items: ProgramModules[]): ProgramModules[] {
  return items.sort((a, b) => a.order - b.order);
}

function findFirstActiveObject(items: ProgramModules[]) {
  return items.find((item) => item.isActive && !item.isCompleted);
}
