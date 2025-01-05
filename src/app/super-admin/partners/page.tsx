'use client';

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MdAddCircle, MdDownload, MdMoreHoriz, MdSearch, MdVolunteerActivism } from 'react-icons/md';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { useGetPartners } from '@/hooks/useGetPartners';
import { useDeletePartner } from '@/hooks/useDeletePartner';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Partner } from '@/types';
import { useGetPrograms } from '@/hooks/useGetPrograms';
import { AddNewPartnerModal, DeleteModal } from '@/shared/chakra/modals';
import { ReusableTable } from '@/shared/chakra/organisms';

const PartnerTab = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [program, setProgram] = useState<number | undefined>(undefined);
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));
  const {
    data: partners,
    isLoading,
    isError,
    isRefetchError,
    isRefetching,
    refetch,
  } = useGetPartners({ page: 1, pageSize: 10, query: search, programId: program });
  const totalPages = partners?.body.total ?? 0;
  const [selectedPartner, setSelectedPartner] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: deleteModalOnClose } = useDisclosure();
  const { mutate: delPartner, isPending } = useDeletePartner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDeletePartner = () => {
    delPartner(selectedPartner, {
      onSuccess: () => {
        toast({ title: 'Partner deleted successfully', status: 'success' });
        deleteModalOnClose();
      },
    });
  };

  const columns: ColumnDef<Partner>[] = useMemo(
    () => [
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Partner
          </Text>
        ),
        accessorKey: 'name',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Program
          </Text>
        ),
        accessorKey: 'program',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500">
            Amount Disbursed
          </Text>
        ),
        accessorKey: 'amount',
        enableSorting: false,
      },
      {
        header: () => (
          <Text variant="Body3Semibold" color="gray.500" textAlign="center">
            Actions
          </Text>
        ),
        accessorKey: 'deactivate',
        enableSorting: false,
        cell: (info) => (
          <Flex>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button margin="0 auto" bg="transparent" size="small" minW={0} h="auto" p="0">
                  <MdMoreHoriz size="1.25rem" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="fit-content">
                <PopoverArrow />
                <PopoverBody>
                  <Flex flexDir="column">
                    <Button
                      w="100%"
                      bg="transparent"
                      size="small"
                      isLoading={isPending}
                      onClick={() => {
                        setSelectedPartner(info.row.original.id.toString());
                        onDeleteOpen();
                      }}
                    >
                      Delete Partner
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        ),
      },
    ],
    [isPending, onDeleteOpen]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      <AddNewPartnerModal isOpen={isOpen} onClose={onClose} />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={deleteModalOnClose}
        action={handleDeletePartner}
        isLoading={isPending}
        text="Are you sure you want to delete this partner. Proceeding will erase this partner data."
      />
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button variant="primary" gap="8px" onClick={onOpen}>
            <MdAddCircle />
            <Text> Add New Partner</Text>
          </Button>
        </Flex>
        <Box w="256px" cursor="pointer">
          <OverviewCard title="Total Partner" number={partners?.body.total || 0} icon={MdVolunteerActivism} active />
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="8px" alignItems="center">
          <Text variant="Body2Semibold" color="gray.500" whiteSpace="nowrap">
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
        data={partners?.body.data || []}
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

export default PartnerTab;
