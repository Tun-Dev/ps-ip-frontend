'use client';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetVettingOfficersAnalytics } from '@/hooks/useGetVettingOfficersAnalytics';
import { useGetVettingOfficersBeneficiaries } from '@/hooks/useGetVettingOfficersBeneficiaries';
import { useUserStore } from '@/providers/user-store-provider';
import { VettingModalProvider } from '@/providers/vetting-modal-provider';
import { ReusableTable } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { VettingModal } from '@/shared/chakra/components/vetting-modal';
import { Beneficiary } from '@/types';
import { formatDateForInput, FormStatus } from '@/utils';
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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { MdCancel, MdCheckCircle, MdDownload, MdMoreHoriz, MdOutlineChecklistRtl, MdSearch } from 'react-icons/md';

const VettingOfficersVettingPage = () => {
  const { programID } = useParams();
  const { data, isPending, isError } = useGetVettingOfficersAnalytics(programID.toString());
  return (
    <Flex flexDir="column" gap="1.5rem" boxSize="full">
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Awaiting Vetting"
          number={isPending || isError ? '...' : data.body.pendingApproval}
          icon={MdOutlineChecklistRtl}
        />
        <OverviewCard
          title="Total Successful Vetting"
          number={isPending || isError ? '...' : data.body.successfulVetting}
          icon={MdOutlineChecklistRtl}
          iconColor="green"
        />
        <OverviewCard
          title="Total Failed Vetting"
          number={isPending || isError ? '...' : data.body.failedVetting}
          icon={MdOutlineChecklistRtl}
          iconColor="red"
        />
      </SimpleGrid>
      <BeneficiaryTab />
    </Flex>
  );
};

const moduleName = 'Vetting';

const BeneficiaryTab = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Tabs onChange={(index) => setActiveTabIndex(index)} size="sm" variant="unstyled" isLazy h="full">
      <TabList>
        <Tab _selected={{ borderColor: 'secondary.500', color: 'text' }} color="grey.400">
          <Text as="span" variant={activeTabIndex === 0 ? 'Body2Bold' : 'Body2Semibold'}>
            Pending
          </Text>
        </Tab>
        <Tab _selected={{ borderColor: 'secondary.500', color: 'text' }} color="grey.400">
          <Text as="span" variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>
            Recommended
          </Text>
        </Tab>
        <Tab _selected={{ borderColor: 'secondary.500', color: 'text' }} color="grey.400">
          <Text as="span" variant={activeTabIndex === 2 ? 'Body2Bold' : 'Body2Semibold'}>
            Rejected
          </Text>
        </Tab>
        <Tab _selected={{ borderColor: 'secondary.500', color: 'text' }} color="grey.400">
          <Text as="span" variant={activeTabIndex === 3 ? 'Body2Bold' : 'Body2Semibold'}>
            Approved
          </Text>
        </Tab>
      </TabList>
      <TabPanels h="100%">
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.PENDING} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.RECOMMENDED} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.DISAPPROVED} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.APPROVED} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

type BeneficiaryPanelProps = {
  status?: FormStatus;
};

const columnHelper = createColumnHelper<Beneficiary>();

const BeneficiaryPanel = ({ status }: BeneficiaryPanelProps) => {
  const toast = useToast();
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUserStore((state) => state.user);
  const isVettingOfficer = user?.roles.includes('Vetting Officer') ?? false;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: modules } = useGetModules();
  const vettingModuleId = useMemo(() => modules?.body.find((module) => module.name === moduleName)?.id ?? 0, [modules]);
  const { mutate: approveBeneficiary } = useApproveBeneficiary();

  const { data, isLoading, isPlaceholderData, refetch, isError, isRefetching, isRefetchError } =
    useGetVettingOfficersBeneficiaries({
      page,
      pageSize: 10,
      programId: programID.toString(),
      moduleId: vettingModuleId,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      status,
    });

  const tableData = useMemo(() => data?.body.data ?? [], [data]);
  const totalPages = data?.body.totalPages ?? 1;

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  const onApprove = useCallback(
    ({ status, ids }: { status: FormStatus; ids: string[] }) => {
      const payload = {
        status: status,
        beneficiaryId: ids,
        moduleId: vettingModuleId,
        programId: programID.toString(),
      };

      approveBeneficiary(payload, {
        onSuccess: () => {
          toast({ title: `${status} successfully`, status: 'success' });
        },
      });
    },
    [approveBeneficiary, programID, vettingModuleId, toast]
  );

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('firstname', {
          header: 'First Name',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('lastname', {
          header: 'Last Name',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('otherNames', {
          header: 'Other Names',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('email', {
          header: 'Email',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('phoneNumber', {
          header: 'Phone Number',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ? '0' + parsePhoneNumber(info.getValue()).nationalNumber : 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('gender', {
          header: 'Gender',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.accessor('dob', {
          header: 'Date of Birth',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ? formatDateForInput(info.getValue()) : 'N/A'}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.accessor('isFlagged', {
          header: 'Flagged',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() || 'N/A'}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.accessor('vetScore', {
          header: 'Vetting Score',
          cell: (info) => (
            <Text as="span" variant="Body1Bold" color="primary.500">
              {info.getValue() === null ? 'N/A' : `${info.getValue()}%`}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.display({
          id: 'actions',
          header: () => (
            <Text variant="Body3Semibold" color="grey.500" textAlign="center">
              Actions/Status
            </Text>
          ),
          cell: (info) =>
            info.row.original.status === FormStatus.APPROVED ? (
              <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
                Approved
              </Text>
            ) : info.row.original.status === FormStatus.DISAPPROVED ? (
              <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
                Denied
              </Text>
            ) : isVettingOfficer ? (
              <Text
                as="span"
                display="block"
                color="text"
                textAlign="center"
                variant="Body3Semibold"
                textTransform="capitalize"
              >
                {info.row.original.status.toString().toLowerCase()}
              </Text>
            ) : (
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
                      onApprove({ status: FormStatus.APPROVED, ids: [info.row.original.id] });
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Approve
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onApprove({ status: FormStatus.DISAPPROVED, ids: [info.row.original.id] });
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Deny
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ),
        }),
      ] as ColumnDef<Beneficiary>[],
    [onApprove, isVettingOfficer]
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
        data={tableData}
        columns={columns as ColumnDef<Beneficiary>[]}
        isLoading={isLoading || isRefetching}
        isError={isError || isRefetchError}
        onRefresh={refetch}
        onClick={openBeneficiaryModal}
        onSelectionChange={(selectedRows) => {
          setSelectedIds(selectedRows.map((row) => row.id.toString()));
        }}
        selectedChildren={
          <>
            <Button
              variant="accept"
              size="medium"
              leftIcon={<MdCheckCircle />}
              onClick={() => onApprove({ status: FormStatus.APPROVED, ids: selectedIds })}
            >
              Approve selected
            </Button>
            <Button
              variant="cancel"
              size="medium"
              leftIcon={<MdCancel />}
              onClick={() => onApprove({ status: FormStatus.DISAPPROVED, ids: selectedIds })}
            >
              Deny selected
            </Button>
          </>
        }
        selectable
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
      {beneficiary && (
        <VettingModalProvider beneficiary={beneficiary}>
          <VettingModal isOpen={isOpen} onClose={onClose} />
        </VettingModalProvider>
      )}
    </Flex>
  );
};

export default VettingOfficersVettingPage;
