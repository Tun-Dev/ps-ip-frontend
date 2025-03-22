'use client';

import { useDeleteClient } from '@/hooks/useDeleteClient';
import { useGetClients } from '@/hooks/useGetClients';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { AddNewClientModal, DeleteModal } from '@/shared/chakra/modals';
import { EditClientModal } from '@/shared/chakra/modals/EditClientModal';
import { ManageClientModal } from '@/shared/chakra/modals/manage-client-modal';
import { ReusableTable } from '@/shared/chakra/organisms';
import { Client } from '@/types';
import { formatCurrency } from '@/utils';
import {
  Box,
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
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdAddCircle, MdDownload, MdMoreHoriz, MdSearch, MdVolunteerActivism } from 'react-icons/md';

const ClientTab = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [program, setProgram] = useState<number | undefined>(undefined);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));
  const {
    data: clients,
    isLoading,
    isError,
    isRefetchError,
    isRefetching,
    refetch,
  } = useGetClients({ page: 1, pageSize: 10, query: search, programId: program });
  const totalPages = clients?.body.totalPages ?? 1;
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedClientId, setSelectedClientId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: deleteModalOnClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isMangeOpen, onOpen: onManageOpen, onClose: onManageClose } = useDisclosure();
  const { mutate: deleteClient, isPending } = useDeleteClient();

  const handleDeleteClient = () => {
    deleteClient(selectedClientId, {
      onSuccess: () => {
        toast({ title: 'Client deleted successfully', status: 'success' });
        deleteModalOnClose();
      },
    });
  };

  const columns: ColumnDef<Client>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Client
          </Text>
        ),
        accessorKey: 'name',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Program
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
        cell: (info) => info.row.original.programs,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Disbursable Amount
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
        cell: (info) => formatCurrency(info.row.original.amount),
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
            Actions
          </Text>
        ),
        accessorKey: 'deactivate',
        enableSorting: false,
        cell: (info) => (
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
              isLoading={isPending}
            />
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedClient(info.row.original);
                  onEditOpen();
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Edit Client
                </Text>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedClient(info.row.original);
                  onManageOpen();
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Manage Client
                </Text>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedClientId(info.row.original.id.toString());
                  onDeleteOpen();
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Delete Client
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ),
      },
    ],
    [isPending, onDeleteOpen, onEditOpen, onManageOpen]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      {selectedClient && (
        <>
          <EditClientModal
            isOpen={isEditOpen}
            onClose={() => {
              onEditClose();
              setSelectedClient(null);
            }}
            client={selectedClient}
          />
          <ManageClientModal isOpen={isMangeOpen} onClose={onManageClose} client={selectedClient} />
        </>
      )}
      <AddNewClientModal isOpen={isOpen} onClose={onClose} />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={deleteModalOnClose}
        action={handleDeleteClient}
        isLoading={isPending}
        text="Are you sure you want to delete this client. Proceeding will erase this client data."
      />
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button variant="primary" gap="8px" onClick={onOpen}>
            <MdAddCircle />
            <Text>Add New Client</Text>
          </Button>
        </Flex>
        <Box w="256px" cursor="pointer">
          <OverviewCard title="Total Clients" number={clients?.body.total || 0} icon={MdVolunteerActivism} active />
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="8px" alignItems="center">
          <Text variant="Body2Semibold" color="grey.500" whiteSpace="nowrap">
            Filter by
          </Text>
          <Select
            placeholder="Select..."
            size="small"
            defaultValue={'program'}
            w="94px"
            fontSize="13px"
            fontWeight="600"
            onChange={(e) => setProgram(Number(e.target.value))}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input variant="primary" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </Flex>

        <Flex gap="8px" alignItems="center">
          <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
            Download Report
          </Button>
        </Flex>
      </Flex>

      <ReusableTable
        selectable
        data={clients?.body.data || []}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
      />
      <TablePagination
        handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        handlePageChange={(pageNumber) => setPage(pageNumber)}
        isNextDisabled={page >= totalPages}
        isPrevDisabled={page <= 1}
        currentPage={page}
        totalPages={totalPages}
        isDisabled={isLoading}
        display={totalPages > 1 ? 'flex' : 'none'}
      />
    </Flex>
  );
};

export default ClientTab;
