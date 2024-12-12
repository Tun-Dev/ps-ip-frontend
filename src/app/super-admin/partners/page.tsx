'use client';

import { useMemo } from 'react';
import {
  Flex,
  Text,
  Box,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Select,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useToast,
} from '@chakra-ui/react';
import { ReusableTable, AddNewPartnerModal } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';
import { MdSearch, MdVolunteerActivism, MdDownload, MdAddCircle, MdMoreHoriz } from 'react-icons/md';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { useGetPartners } from '@/hooks/useGetPartners';
import { useDeletePartner } from '@/hooks/useDeletePartner';

const PartnerTab = () => {
  const toast = useToast();
  const { data: partners, isLoading } = useGetPartners({ page: 1, pageSize: 10 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: delPartner, isPending } = useDeletePartner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDeletePartner = (id: string) => {
    delPartner(id, {
      onSuccess: () => {
        toast({ title: 'Partner deleted successfully', status: 'success' });
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = useMemo(
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
                        console.log(info.row.original);
                        handleDeletePartner(info.row.original.id);
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
    [handleDeletePartner, isPending]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <AddNewPartnerModal isOpen={isOpen} onClose={onClose} />
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
          <OverviewCard title="Total Partner" number={partners?.body.total || 0} icon={MdVolunteerActivism} />
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="8px" alignItems="center">
          <Text variant="Body2Semibold" color="gray.500" whiteSpace="nowrap">
            Sort by
          </Text>
          <Select
            placeholder="Select..."
            size="small"
            defaultValue={'program'}
            w="94px"
            fontSize="13px"
            fontWeight="600"
          >
            <option key={'program'} value={'program'}>
              Program
            </option>
          </Select>

          <InputGroup w="212px" size="sm">
            <InputLeftElement>
              <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
            </InputLeftElement>
            <Input variant="primary" placeholder="Search" />
          </InputGroup>
        </Flex>

        <Flex gap="8px" alignItems="center">
          <Button leftIcon={<MdDownload />} variant="secondary" w="193px" borderRadius="10px" size="medium">
            Download Report
          </Button>
        </Flex>
      </Flex>

      <Box padding="0px 1rem 1rem" boxShadow="card" borderRadius="12px">
        <ReusableTable selectable data={partners?.body.data || []} columns={columns} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};

export default PartnerTab;
