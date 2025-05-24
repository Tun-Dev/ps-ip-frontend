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
} from '@chakra-ui/react';
import { MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { ReusableTable } from '@/shared';
import { ColumnDef } from '@tanstack/react-table';

type SuperAdmin = {
  firstName: string;
  lastName: string;
  gender: string;
  dateAdded: string;
};

const SuperAdminTab = () => {
  const columns: ColumnDef<SuperAdmin>[] = [
    {
      header: 'Agents',
      accessorKey: 'firstName',
      cell: (info) => (
        <Text variant="Body2Semibold">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Text>
      ),
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          Gender
        </Text>
      ),
      accessorKey: 'gender',
      enableSorting: false,
      cell: (info) => (
        <Text variant="Body2Regular" textAlign="center">
          {info.row.original.gender || 'N/A'}
        </Text>
      ),
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500">
          Date Added
        </Text>
      ),
      accessorKey: 'dateAdded',
      enableSorting: false,
      cell: (info) => <Text variant="Body2Regular">{info.row.original.dateAdded}</Text>,
    },
    {
      header: () => (
        <Text variant="Body3Semibold" color="grey.500" textAlign="center">
          Actions
        </Text>
      ),
      id: 'actions',
      enableSorting: false,
      cell: () => {
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
              <MenuItem>
                <Text as="span" variant="Body2Regular" w="full">
                  Edit
                </Text>
              </MenuItem>
              <MenuItem>
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
      <ReusableTable selectable data={[]} columns={columns} isLoading={false} />
    </Flex>
  );
};

export default SuperAdminTab;
