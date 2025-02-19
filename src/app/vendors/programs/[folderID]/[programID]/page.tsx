'use client';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetVendorAnalytics } from '@/hooks/useGetVendorAnalytics';
import { useGetVendorBeneficiaries } from '@/hooks/useGetVendorBeneficiaries';
import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { formatCurrency, getImageUrl } from '@/utils';
import { Image } from '@chakra-ui/next-js';
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
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import {
  MdAccountBalanceWallet,
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

  const { data: pendingBeneficiaries } = useGetVendorBeneficiaries({
    page: 1,
    pageSize: 10,
    programId: programID.toString(),
    status: 'Pending',
  });
  const { data: disbursedBeneficiaries } = useGetVendorBeneficiaries({
    page: 1,
    pageSize: 10,
    programId: programID.toString(),
    status: 'Approved',
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
          <VendorPanel status="Pending" />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <VendorPanel status="Approved" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type VendorPanelProps = {
  status: 'Pending' | 'Approved';
};

const VendorPanel = ({ status }: VendorPanelProps) => {
  const toast = useToast();
  const { programID } = useParams();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const { mutate: approveBeneficiary } = useApproveBeneficiary();

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } =
    useGetVendorBeneficiaries({
      page,
      pageSize: 10,
      programId: programID.toString(),
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
    ({ status, id }: { status: string; id: number }) => {
      const payload = {
        status: status.toUpperCase(),
        beneficiaryId: [id],
        moduleId: 1,
        programId: programID.toString(),
      };

      approveBeneficiary(payload, {
        onSuccess: () => {
          toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
        },
      });
    },
    [approveBeneficiary, programID, toast]
  );

  const columns = useMemo(() => {
    if (!tableData || tableData.length === 0) return [];
    const keys = Object.keys(tableData[0]);

    const formColumns: ColumnDef<Beneficiary>[] = keys
      .filter((key) => key !== 'id' && key !== 'moduleName' && key !== 'status')
      .map((key) => ({
        header: () => (
          <Text variant="Body3Semibold" textAlign="left">
            {key}
          </Text>
        ),
        accessorKey: key,
        cell: (info) => {
          const value = info.getValue() as string | number | undefined;

          if (key === 'Picture' && typeof value === 'string')
            return (
              <Box pos="relative" boxSize="5" rounded="full" overflow="hidden">
                <Image
                  src={getImageUrl(value)}
                  alt="Beneficiary Image"
                  sizes="1.25rem"
                  sx={{ objectFit: 'cover' }}
                  fill
                />
              </Box>
            );

          return (
            <Text as="span" textAlign="left" display="block" variant="Body2Regular">
              {info.getValue() !== null && value !== undefined ? value.toString() : 'N/A'}
            </Text>
          );
        },
        enableSorting: false, // You can enable this if sorting is required
      }));

    const otherColumns: ColumnDef<Beneficiary>[] = [
      {
        header: () => (
          <Text variant="Body3Semibold" color="grey.500" textAlign="center">
            Status
          </Text>
        ),
        accessorKey: 'Status',
        enableSorting: false,
        cell: (info) =>
          info.row.original.status === 'Pending' ? (
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
                    onApprove({ status: 'Approved', id: info.row.original.id });
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
      },
    ];

    return [...formColumns, ...otherColumns];
  }, [onApprove, tableData]);

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
        isDisabled={isLoading || isPlaceholderData}
        display={totalPages > 1 ? 'flex' : 'none'}
      />
    </Flex>
  );
};

export default VendorsDisbursementDashboard;
