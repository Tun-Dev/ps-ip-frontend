'use client';

import { useDeleteGroup } from '@/hooks/useDeleteGroup';
import { useGetGroup } from '@/hooks/useGetGroup';
import { DeleteModal, FolderCard } from '@/shared';
import CreateFileModal from '@/shared/chakra/modals/CreateFileModal';
import { EditFileModal } from '@/shared/chakra/modals/EditFileModal';
import { GroupEditPayload } from '@/types';
import {
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  SimpleGrid,
  SkeletonText,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdAddCircle, MdFolder } from 'react-icons/md';
import ProgramsBreadcrumbs from './programs-breadcrumbs';

const ProgramsFolderPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { data: groups, isPending } = useGetGroup({ page: 1, pageSize: 10 });

  const [selectedGroup, setSelectedGroup] = useState<GroupEditPayload>();

  const { mutate: deleteGroup, isPending: isDeletePending } = useDeleteGroup();

  const handleDelete = (id: string) => {
    deleteGroup(id, {
      onSuccess: () => {
        toast({ title: 'File deleted successfully', status: 'success' });
        onCloseDelete();
      },
    });
  };

  const data = groups?.body.data ?? [];
  return (
    <>
      <Stack pos="relative" overflow="hidden" p="6" spacing="0" w="full" h="100%">
        <Flex
          h="72px"
          py="24px"
          borderBottom="1px solid"
          borderBottomColor="grey.200"
          justifyContent="space-between"
          alignItems="center"
        >
          <ProgramsBreadcrumbs />

          <Button variant="primary" gap="8px" onClick={() => onOpen()}>
            <MdAddCircle />
            <Text>Create New Folder</Text>
          </Button>
        </Flex>
        {isPending ? (
          <LoadingSkeleton />
        ) : data.length < 1 ? (
          <EmptyState />
        ) : (
          <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5" mt="20px">
            {data?.map((item, index) => (
              <FolderCard
                key={index}
                name={item.name}
                onClick={() => router.push(`/super-admin/programs/${item.id}`)}
                onDelete={() => {
                  setSelectedGroup({ name: item.name, id: item.id });
                  onOpenDelete();
                }}
                count={item.programCount ?? 0}
                onAdd={() => router.push(`/super-admin/programs/${item.id}/create`)}
                onEdit={() => {
                  setSelectedGroup({ name: item.name, id: item.id });
                  onOpenEdit();
                }}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
      <CreateFileModal onClose={onClose} isOpen={isOpen} />
      <EditFileModal onClose={onCloseEdit} isOpen={isOpenEdit} initialValues={selectedGroup} />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        action={() => !!selectedGroup?.id && handleDelete(selectedGroup.id)}
        isLoading={isDeletePending}
        text="Are you sure you want to delete this folder. Proceeding will erase the folder and all programs within it."
      />
    </>
  );
};

const LoadingSkeleton = () => (
  <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5" mt="20px">
    {Array.from({ length: 8 }, (_, index) => (
      <Flex key={index} p="16px" borderRadius="16px" bg="primary.100" flexDir="column" gap="12px">
        <Flex width="60px" height="56px" bg="primary.200" borderRadius="8px" align="center" justify="center">
          <Icon as={MdFolder} color="primary.500" boxSize="48px" />
        </Flex>
        <Flex flexDir="column" gap="6px">
          <SkeletonText h="20px" noOfLines={2} />
        </Flex>
      </Flex>
    ))}
  </SimpleGrid>
);

const EmptyState = () => (
  <Grid placeContent="center" textAlign="center" gap="2" color="grey.500" w="full" h="full">
    <Flex width="193px" height="182px" borderRadius="12px" bg="primary.200" p="16px 24px">
      <Image src="/icons/Blank.svg" alt="" />
    </Flex>
    <Text variant="Body2Semibold">No Folders Available.</Text>
    <Text variant="Body2Semibold">Please create a folder.</Text>
  </Grid>
);

export default ProgramsFolderPage;
