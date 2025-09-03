'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
// import { useGetStates } from '@/hooks/useGetStates';
import { useGetVerificationStatus } from '@/hooks/useGetVerificationStatus';
import { useProcessVerification } from '@/hooks/useProcessVerification';
import { useToggleVerification } from '@/hooks/useToggleAutomaticVerification';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { FormStatus } from '@/utils';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
// import { parsePhoneNumber } from 'libphonenumber-js/min';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdCheckCircle, MdDownload, MdSearch } from 'react-icons/md';
import BeneficiaryDetailsModal from './beneficiary-details-modal';
// import { Dropdown } from './dropdown';
import { BeneficiaryFilterMenu, BeneficiaryFilters } from './beneficiary-filter-menu';

const moduleName = 'Verification';

const VerificationTable = () => {
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
            Verified
          </Text>
        </Tab>
        <Tab _selected={{ borderColor: 'secondary.500', color: 'text' }} color="grey.400">
          <Text as="span" variant={activeTabIndex === 2 ? 'Body2Bold' : 'Body2Semibold'}>
            Failed
          </Text>
        </Tab>
      </TabList>
      <TabPanels h="100%">
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.PENDING} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.APPROVED} />
        </TabPanel>
        <TabPanel px="0" py="1.25rem" h="100%">
          <BeneficiaryPanel status={FormStatus.DISAPPROVED} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VerificationTable;

type BeneficiaryPanelProps = {
  status?: FormStatus;
};

const columnHelper = createColumnHelper<Beneficiary>();

const BeneficiaryPanel = ({ status }: BeneficiaryPanelProps) => {
  const pathname = usePathname();
  const hideDownload = pathname?.includes('clients');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const { mutate: processVerification, isPending: isProcessingVerification } = useProcessVerification();

  const [filters, setFilters] = useState<BeneficiaryFilters>({});
  const storageKey = useMemo(() => `beneficiary-filters:${programID}`, [programID]);

  // boot with last APPLIED filters, if any
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(`${storageKey}:applied`);
      if (raw) setFilters(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const handleProcessVerification = useCallback(() => {
    processVerification({
      filters: { gender: filters.gender, state: filters.state, lga: filters.lga, status: status },
      programId: programID.toString(),
    });
  }, [processVerification, programID, filters, status]);

  const { data: modules } = useGetModules();

  const moduleId = useMemo(() => modules?.body?.find((module) => module.name === moduleName)?.id ?? 0, [modules]);

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page,
      pageSize: pageSize,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      programId: programID.toString(),
      moduleId,
      enabled: !!programID && !!moduleId,
      gender: filters.gender,
      state: filters.state,
      lga: filters.lga,
      startDate: filters.startDate,
      endDate: filters.endDate,
      status,
    });

  const totalPages = data?.body.totalPages ?? 0;
  const totalCount = data?.body.total ?? 0;

  const tableData = useMemo(() => (data ? data.body.data : []), [data]);

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('firstname', {
          header: 'First Name',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('lastname', {
          header: 'Last Name',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('otherNames', {
          header: 'Other Names',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('gender', {
          header: 'Gender',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('age', {
          header: 'Age',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('tradeType', {
          header: 'Trade Type',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.accessor('state', {
          header: 'State',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
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
                Verified
              </Text>
            ) : info.row.original.status === FormStatus.DISAPPROVED ? (
              <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
                Rejected
              </Text>
            ) : (
              <Text as="span" display="block" color="text" textAlign="center" variant="Body3Semibold">
                Pending
              </Text>
            ),
        }),
      ] as ColumnDef<Beneficiary>[],
    []
  );

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  const toggleVerificationMutation = useToggleVerification();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked;
    toggleVerificationMutation.mutate({ programId: programID as string, status: newStatus });
  };

  const { data: verificationStatus, isLoading: isVerificationLoading } = useGetVerificationStatus(programID.toString());

  return (
    <Flex direction="column" gap="1.5rem" h="full">
      <Stack gap="4">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="6">
            <BeneficiaryFilterMenu
              value={filters}
              onApply={(next) => {
                setFilters(next);
                setPage(1);
              }}
              storageKey={storageKey}
            />
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none" color="primary.600">
                <MdSearch />
              </InputLeftElement>
              <Input
                placeholder="Search"
                variant="primary"
                pl="2.5rem"
                onChange={(e) => {
                  // Reset filters when search query changes
                  resetFilters();
                  setQuery(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
          <Flex gap="16px">
            {!hideDownload && (
              <>
                <Flex alignItems="center" gap="8px">
                  <Text
                    as="label"
                    whiteSpace="nowrap"
                    htmlFor="automatic-verification"
                    variant="Body2Semibold"
                    color="grey.500"
                  >
                    Automatic verification:
                  </Text>
                  {!!verificationStatus ? (
                    <Switch
                      id="automatic-verification"
                      onChange={handleToggle}
                      defaultChecked={verificationStatus.body}
                      isDisabled={toggleVerificationMutation.isPending || isVerificationLoading}
                    />
                  ) : (
                    <Spinner size="xs" color="grey.400" />
                  )}
                </Flex>

                <Button leftIcon={<MdDownload size="0.875rem" />} variant="primary" size="medium">
                  Download Report
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Flex align="center" justify="end">
          {status === FormStatus.PENDING && !hideDownload && (
            <Button
              variant="accept"
              size="medium"
              leftIcon={<MdCheckCircle />}
              onClick={() => handleProcessVerification()}
              isLoading={isProcessingVerification}
            >
              Start Verification
            </Button>
          )}
        </Flex>
      </Stack>
      <ReusableTable
        data={tableData}
        columns={columns}
        onClick={openBeneficiaryModal}
        selectable
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
        // display={totalPages > 1 ? 'flex' : 'none'}
        pageSize={pageSize}
        handlePageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        totalCount={totalCount}
      />
      {beneficiary && (
        <BeneficiaryDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          beneficiary={beneficiary}
          moduleName="Verification"
        />
      )}
    </Flex>
  );
};
