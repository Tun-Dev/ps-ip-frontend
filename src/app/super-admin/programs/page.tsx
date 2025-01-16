'use client';

import { FolderCard } from '@/shared';
import { Button, Flex, SimpleGrid, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import ProgramsBreadcrumbs from './programs-breadcrumbs';
import CreateFileModal from '@/shared/chakra/modals/CreateFileModal';
import { useGetGroup } from '@/hooks/useGetGroup';
import { useRouter } from 'next/navigation';
import { useDeleteGroup } from '@/hooks/useDeleteGroup';
import { EditFileModal } from '@/shared/chakra/modals/EditFileModal';
import { useState } from 'react';
import { GroupEditPayload } from '@/types';

const ProgramsFolderPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { data: groups } = useGetGroup({ page: 1, pageSize: 10 });

  const [selectedGroup, setSelectedGroup] = useState<GroupEditPayload>();

  const { mutate: deleteGroup } = useDeleteGroup();

  const handleDelete = (id: string) => {
    console.log(id);
    deleteGroup(id, {
      onSuccess: () => {
        toast({ title: 'File deleted successfully', status: 'success' });
        onClose();
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = groups?.body.data ?? [];
  console.log(groups);
  return (
    <>
      <Stack pos="relative" overflow="hidden" p="6" spacing="0" justify="space-between" w="full">
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
            <Text>Create New File</Text>
          </Button>
        </Flex>
        <SimpleGrid columns={4} spacingY="6" spacingX="5" mt="20px">
          {data?.map((item, index) => (
            <FolderCard
              key={index}
              name={item.name}
              onClick={() => router.push(`/super-admin/programs/${item.id}`)}
              onDelete={() => handleDelete(item.id)}
              count={item.programCount ?? 0}
              onAdd={() => router.push(`/super-admin/programs/${item.id}/create`)}
              onEdit={() => {
                setSelectedGroup({ name: item.name, id: item.id });
                onOpenEdit();
              }}
            />
          ))}
        </SimpleGrid>
      </Stack>
      <CreateFileModal onClose={onClose} isOpen={isOpen} />
      <EditFileModal onClose={onCloseEdit} isOpen={isOpenEdit} initialValues={selectedGroup} />
    </>
  );
};

export default ProgramsFolderPage;
