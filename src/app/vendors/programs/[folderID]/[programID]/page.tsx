'use client';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetVendorAnalytics } from '@/hooks/useGetVendorAnalytics';
import { useGetWhitelist } from '@/hooks/useGetWhitelist';
import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { VendorsOrdersDetails } from '@/types';
import { formatCurrency, FormStatus } from '@/utils';
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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import {
  MdAccountBalanceWallet,
  MdCheckCircle,
  MdDownload,
  MdEmojiEmotions,
  MdLocalShipping,
  MdMoreHoriz,
  MdSearch,
  MdVolunteerActivism,
} from 'react-icons/md';

const VendorsDisbursementDashboard = () => {
  const { programID } = useParams();
  const { data, isPending, isError } = useGetVendorAnalytics(programID.toString());
  return (
    <Flex flexDir="column" gap="1.5rem" boxSize="full">
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Orders Pending"
          number={isPending || isError ? '...' : data.body.ordersPending}
          icon={MdLocalShipping}
        />
        <OverviewCard
          title="Amount Disbursed"
          number={isPending || isError ? '...' : formatCurrency(data.body.amountDisbursed)}
          icon={MdVolunteerActivism}
        />
        <OverviewCard
          title="Amount Disbursable"
          number={isPending || isError ? '...' : formatCurrency(data.body.amountDisburseable)}
          icon={MdAccountBalanceWallet}
        />
        <OverviewCard
          title="Candidates Disbursed"
          number={isPending || isError ? '...' : data.body.candidatesDisbursed}
          icon={MdEmojiEmotions}
        />
      </SimpleGrid>
      <VendorTab />
    </Flex>
  );
};

const VendorTab = () => {
  const { programID } = useParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { data: currentUser } = useGetCurrentUser();

  const { data: pendingBeneficiaries } = useGetWhitelist({
    page: 1,
    pageSize: 10,
    programId: programID.toString(),
    status: FormStatus.WHITELISTED,
    vendorId: currentUser?.body.vendor.id,
  });
  const { data: disbursedBeneficiaries } = useGetWhitelist({
    page: 1,
    pageSize: 10,
    programId: programID.toString(),
    status: FormStatus.DISBURSED,
    vendorId: currentUser?.body.vendor.id,
  });

  const ordersPending = pendingBeneficiaries?.body.total ?? 0;
  const ordersDisbursed = disbursedBeneficiaries?.body.total ?? 0;

  return (
    <Tabs onChange={(index) => setActiveTabIndex(index)} size="sm" variant="unstyled" isLazy flex="1 1 0%">
      <TabList>
        <Tab _selected={{ borderColor: 'primary.500', color: 'primary.500' }} color="grey.400">
          <Flex align="center" gap="4px">
            <Text variant={activeTabIndex === 0 ? 'Body2Bold' : 'Body2Semibold'}>Orders Pending</Text>
            <Box
              p="2px 8px"
              borderRadius="8px"
              bg={activeTabIndex === 0 ? 'primary.100' : 'grey.200'}
              color={activeTabIndex === 0 ? 'primary.500' : 'grey.500'}
            >
              <Text variant="Body3Semibold">{ordersPending.toLocaleString()}</Text>
            </Box>
          </Flex>
        </Tab>
        <Tab _selected={{ borderColor: 'primary.500', color: 'primary.500' }} color="grey.400">
          <Flex align="center" gap="4px">
            <Text variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>Orders Disbursed</Text>
            <Box
              p="2px 8px"
              borderRadius="8px"
              bg={activeTabIndex === 1 ? 'primary.100' : 'grey.200'}
              color={activeTabIndex === 1 ? 'primary.500' : 'grey.500'}
            >
              <Text variant="Body3Semibold">{ordersDisbursed.toLocaleString()}</Text>
            </Box>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels h="100%">
        <TabPanel px="0" py="1.25rem" h="100%">
          <VendorPanel status={FormStatus.WHITELISTED} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <VendorPanel status={FormStatus.DISBURSED} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type VendorPanelProps = {
  status: FormStatus;
};

const columnHelper = createColumnHelper<VendorsOrdersDetails>();

const VendorPanel = ({ status }: VendorPanelProps) => {
  const toast = useToast();
  const { programID } = useParams();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: modules } = useGetModules();
  const disbursementModuleId = modules?.body.find((module) => module.name === 'Disbursement')?.id ?? 0;
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: approveBeneficiary } = useApproveBeneficiary();

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } = useGetWhitelist({
    page,
    pageSize: 10,
    programId: programID.toString(),
    vendorId: currentUser?.body.vendor.id,
    query: debouncedQuery === '' ? undefined : debouncedQuery,
    status,
  });

  const tableData = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

  const onApprove = useCallback(
    ({ status, ids }: { status: FormStatus; ids: string[] }) => {
      const payload = {
        status: status,
        beneficiaryId: ids,
        moduleId: disbursementModuleId,
        programId: programID.toString(),
      };

      approveBeneficiary(payload, {
        onSuccess: () => {
          toast({ title: `${status} successfully`, status: 'success' });
        },
      });
    },
    [approveBeneficiary, programID, disbursementModuleId, toast]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstname', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            First Name
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
      }),
      columnHelper.accessor('lastname', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Last Name
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
      }),
      columnHelper.accessor('otherNames', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Other Names
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
      }),
      columnHelper.accessor('gender', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Gender
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
        meta: { isCentered: true },
      }),
      columnHelper.accessor('itemDisbursed', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Item Disbursed
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
        meta: { isCentered: true },
      }),
      columnHelper.accessor('lga', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            LGA
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
        meta: { isCentered: true },
      }),
      columnHelper.accessor('vendor', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Vendor
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ?? 'N/A'}
          </Text>
        ),
      }),
      columnHelper.accessor('disbursementDate', {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500">
            Disbursement Date
          </Text>
        ),
        cell: (info) => (
          <Text as="span" variant="Body2Regular">
            {info.getValue() ? format(parseISO(info.getValue()), 'MMM. d') : 'N/A'}
          </Text>
        ),
        meta: { isCentered: true },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
            Status
          </Text>
        ),
        enableSorting: false,
        cell: (info) =>
          info.row.original.status === FormStatus.PENDING ? (
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
                    onApprove({ status: FormStatus.DISBURSED, ids: [info.row.original.id] });
                  }}
                >
                  <Text as="span" variant="Body2Regular">
                    Mark as Disbursed
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Text variant="Body3Semibold" color="green" textAlign="center">
              Disbursed
            </Text>
          ),
      }),
    ],
    [onApprove]
  );

  return (
    <Flex flexDir="column" gap="1.5rem" boxSize="full">
      <Flex justifyContent="space-between">
        <InputGroup w="212px" size="sm">
          <InputLeftElement>
            <Icon as={MdSearch} w="12px" h="12px" color="primary.600" />
          </InputLeftElement>
          <Input
            variant="primary"
            fontSize="10px"
            placeholder="Search"
            onChange={(e) => {
              // Reset filters when search query changes
              resetFilters();
              setQuery(e.target.value);
            }}
          />
        </InputGroup>
        <Button leftIcon={<MdDownload />} variant="primary" size="medium" borderRadius="0.375rem">
          Download Report
        </Button>
      </Flex>
      <ReusableTable
        selectable
        data={tableData}
        columns={columns as ColumnDef<VendorsOrdersDetails>[]}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
        onSelectionChange={(selectedRows) => {
          setSelectedIds(selectedRows.map((row) => row.id.toString()));
        }}
        selectedChildren={
          <Button
            variant="accept"
            size="medium"
            leftIcon={<MdCheckCircle />}
            onClick={() => onApprove({ status: FormStatus.DISBURSED, ids: selectedIds })}
          >
            Disburse selected
          </Button>
        }
      />
      <TablePagination
        handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        handlePageChange={(pageNumber) => setPage(pageNumber)}
        isNextDisabled={page >= totalPages}
        isPrevDisabled={page <= 1}
        currentPage={page}
        totalPages={totalPages}
        isDisabled={isLoading || isPlaceholderData}
        display={totalPages > 1 ? 'flex' : 'none'}
      />
    </Flex>
  );
};

export default VendorsDisbursementDashboard;
