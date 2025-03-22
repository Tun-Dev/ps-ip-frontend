import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useDeleteVettingOfficers } from '@/hooks/useDeleteVettingOfficers';
import { useGetVettingOfficers } from '@/hooks/useGetVettingOfficers';
import { ReusableTable } from '@/shared';
import { EditUserModal } from '@/shared/chakra/modals/EditUserModal';
import { VettingOfficersDetails } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

const VettingOfficerTab = () => {
  const toast = useToast();
  const { data } = useGetVettingOfficers({ page: 1, pageSize: 999 });
  const { mutate: deleteVettingOfficer } = useDeleteVettingOfficers();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: editModalOnClose } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<VettingOfficersDetails>();

  const onDelete = (id: string) => {
    deleteVettingOfficer(id, {
      onSuccess: () => {
        toast({ title: 'Vetting Officer deleted successfully', status: 'success' });
      },
    });
  };

  const vettingOfficers = useMemo(() => data?.body.data ?? [], [data]);
  // const totalPages = data?.body.totalPages ?? 1;

  const columns: ColumnDef<VettingOfficersDetails>[] = [
    {
      header: 'Agents',
      accessorKey: 'firstName',
      cell: (info) => (
        <Text variant="Body2Semibold">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Text>
      ),
    },
    {
      header: 'Role',
      accessorKey: 'program',
      cell: (info) => <Text variant="Body2Semibold">{info.row.original.role}</Text>,
    },
    // {
    //   header: () => (
    //     <Text variant="Body3Semibold" color="grey.500" textAlign="center">
    //       Gender
    //     </Text>
    //   ),
    //   accessorKey: 'gender',
    //   enableSorting: false,
    //   cell: (info) => (
    //     <Text variant="Body2Regular" textAlign="center">
    //       {info.row.original.gender || 'N/A'}
    //     </Text>
    //   ),
    // },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500">
          Email
        </Text>
      ),
      accessorKey: 'dateAdded',
      enableSorting: false,
      cell: (info) => <Text variant="Body2Regular">{info.row.original.email}</Text>,
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          Actions
        </Text>
      ),
      id: 'actions',
      enableSorting: false,
      cell: (info) => {
        // const { id, status, programId } = info.row.original;
        return (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              aria-label="Actions"
              icon={<Icon as={MdMoreHoriz} boxSize="1.25rem" color="grey.500" />}
              minW="0"
              h="auto"
              mx="auto"
              display="flex"
              p="1"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(info.row.original);
                  onEditOpen();
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Edit
                </Text>
              </MenuItem>
              <MenuItem onClick={() => onDelete(info.row.original.id)}>
                <Text as="span" variant="Body2Regular" w="full">
                  Delete
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    },
  ];

  return (
    <>
      {selectedUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={() => {
            setSelectedUser(undefined);
            editModalOnClose();
          }}
          initialValues={selectedUser}
        />
      )}

      <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
        <Flex justifyContent="space-between">
          <Flex gap="24px" alignItems="center">
            <Flex gap="8px" alignItems="center">
              <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
                Filter by
              </Text>
              <Select size="small" variant="white" w="7rem" fontSize="13px" fontWeight="600" placeholder="Program">
                <option key="Program" value="Program">
                  Program
                </option>
              </Select>
            </Flex>
            <InputGroup w="212px" size="sm">
              <InputLeftElement>
                <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
              </InputLeftElement>
              <Input variant="primary" fontSize="10px" placeholder="Search" />
            </InputGroup>
          </Flex>
          <Button leftIcon={<MdDownload />} variant="primary" size="medium" borderRadius="10px">
            Download Report
          </Button>
        </Flex>
        <>
          <ReusableTable selectable data={vettingOfficers} columns={columns} isLoading={false} />
        </>
      </Flex>
    </>
  );
};

export default VettingOfficerTab;
