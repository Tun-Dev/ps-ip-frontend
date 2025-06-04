'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetStates } from '@/hooks/useGetStates';
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
import { useCallback, useMemo, useState } from 'react';
import { MdCheckCircle, MdDownload, MdSearch } from 'react-icons/md';
import BeneficiaryDetailsModal from './beneficiary-details-modal';
import { Dropdown } from './dropdown';

const moduleName = 'Verification';
type Gender = 'Male' | 'Female' | undefined;

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
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const { mutate: processVerification, isPending: isProcessingVerification } = useProcessVerification();
  const [gender, setGender] = useState<string>();
  const [selectedStateId, setSelectedStateId] = useState<number>();
  const [selectedLGA, setSelectedLGA] = useState<number>();

  const handleProcessVerification = useCallback(() => {
    processVerification({
      filters: { gender, state: selectedStateId, lga: selectedLGA, status: status },
      programId: programID.toString(),
    });
  }, [gender, processVerification, programID, selectedLGA, selectedStateId, status]);

  const { data: modules } = useGetModules();

  const moduleId = useMemo(() => modules?.body?.find((module) => module.name === moduleName)?.id ?? 0, [modules]);

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page,
      pageSize: 10,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      programId: programID.toString(),
      moduleId,
      enabled: !!programID && !!moduleId,
      state: selectedStateId,
      gender: gender as Gender,
      lga: selectedLGA,
      status,
    });

  const totalPages = data?.body.totalPages ?? 0;

  const tableData = useMemo(() => (data ? data.body.data : []), [data]);

  const resetFilters = () => {
    setPage(1);
    setQuery('');
    setGender(undefined);
    setSelectedStateId(undefined);
    setSelectedLGA(undefined);
  };

  const genderOptions = useMemo(
    () => [
      { label: 'All', value: undefined },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
    []
  );

  const currentGender = useCallback(
    (value: string | undefined) => (value ? genderOptions.find((option) => option.value === value) : undefined),
    [genderOptions]
  );

  const { data: states } = useGetStates();

  const stateOptions = useMemo(() => {
    if (!states) return [];
    return [
      { label: 'All', value: undefined },
      ...states.body.map((state) => ({ label: state.name, value: state.id })),
    ];
  }, [states]);

  const currentState = useCallback(
    (value: number | undefined) =>
      value !== undefined ? stateOptions.find((option) => option.value === value) : undefined,
    [stateOptions]
  );

  // Filter LGAs based on selected state
  const filteredLGAOptions = useMemo(() => {
    if (!states || selectedStateId === undefined) return [];
    const selectedState = states.body.find((state) => state.id === selectedStateId);
    if (!selectedState) return [];
    return [
      { label: 'All', value: undefined },
      ...selectedState.LGAs.map((lga) => ({ label: lga.name, value: lga.id })),
    ];
  }, [states, selectedStateId]);

  const currentLGA = useCallback(() => {
    if (selectedLGA === undefined) return undefined;
    return filteredLGAOptions.find((option) => option.value === selectedLGA);
  }, [filteredLGAOptions, selectedLGA]);

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
          <Flex>
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
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="2" minW="50%">
            <Text color="grey.500" variant="Body2Semibold">
              Filter by
            </Text>
            <Flex align="center" gap="4" flex="1">
              <Dropdown
                id="gender"
                variant="whiteDropdown"
                placeholder="Gender"
                name="Gender"
                options={genderOptions}
                value={currentGender(gender) ?? ''}
                onChange={(selected) => {
                  if (!selected || typeof selected === 'string') return;
                  setGender(selected.value);
                }}
                chakraStyles={{ container: (styles) => ({ ...styles, w: '7rem', flexShrink: '0' }) }}
              />
              <Dropdown
                id="state"
                variant="whiteDropdown"
                placeholder="State"
                name="State"
                options={stateOptions}
                value={currentState(selectedStateId) ?? ''}
                onChange={(selected) => {
                  if (!selected || typeof selected === 'string') return;
                  setSelectedLGA(undefined);
                  setSelectedStateId(selected.value);
                }}
                chakraStyles={{ container: (styles) => ({ ...styles, minWidth: 'fit-content', w: 'full' }) }}
              />
              <Dropdown
                id="lga"
                variant="whiteDropdown"
                placeholder="LGA"
                name="LGA"
                options={filteredLGAOptions}
                value={currentLGA() ?? ''}
                onChange={(selected) => {
                  if (!selected || typeof selected === 'string') return;
                  setSelectedLGA(selected.value);
                }}
                chakraStyles={{ container: (styles) => ({ ...styles, minWidth: 'fit-content', w: 'full' }) }}
              />
            </Flex>
          </Flex>
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
        display={totalPages > 1 ? 'flex' : 'none'}
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
