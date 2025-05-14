/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  Box,
  Button,
  ButtonGroup,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  MdAddCircle,
  MdArrowBack,
  MdArrowRightAlt,
  MdCancel,
  MdCheckCircle,
  MdDownload,
  MdMoreHoriz,
  MdSearch,
} from 'react-icons/md';

import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetWhitelistByProgramId } from '@/hooks/useGetWhitelistByProgramId';
import { ReusableTable } from '@/shared';
import { Dropdown } from '@/shared/chakra/components';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { AddExistingWhiteListBucket } from '@/shared/chakra/modals/AddExistingWhiteListBucket';
import CreateWhiteListBucket from '@/shared/chakra/modals/CreateWhiteListBucket';
import EditWhiteListBucket from '@/shared/chakra/modals/EditWhiteListBucket';
import { Beneficiary, WhitelistDetails } from '@/types';
import { FormStatus } from '@/utils';
import { Image } from '@chakra-ui/next-js';
// import { parsePhoneNumber } from 'libphonenumber-js/min';
import { formatDateForInput } from '@/utils';
import { useParams } from 'next/navigation';

const columnHelper = createColumnHelper<Beneficiary>();

const options = [
  { label: 'Aggregator', value: 'Aggregator' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Above 50%', value: 'Above 50%' },
] as const;

type Option = (typeof options)[number];

const WhitelistingPage = () => {
  const [page, setPage] = useState(1);
  const [bucketPage, setBucketPage] = useState(1);
  const [selectedWLPage, setSelectedWLPage] = useState(1);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenExisting, onOpen: onOpenExisting, onClose: onCloseExisting } = useDisclosure();
  const [sort, setSort] = useState<Option | null>(options[0]);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const { response } = useGetProgramById(programID?.toString());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedWhitelistId, setSelectedWhitelistId] = useState<string>('');
  const [selectedWL, setSelectedWL] = useState<WhitelistDetails>();
  const { data: modules } = useGetModules();

  const moduleId = modules?.body?.find((module) => module.name === 'Whitelisting')?.id ?? 0;

  const programType = response?.body?.programType ?? '';

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page: page,
      pageSize: 10,
      programId: programID?.toString(),
      moduleId,
      status: FormStatus.PENDING,
      enabled: !!programID && !!moduleId,
    });

  const {
    data: selectedWhitelistBucket,
    isPlaceholderData: isWhitelistPlaceholderData,
    isLoading: isWhitelistLoading,
    isError: isWhitelistError,
    refetch: whitelistRefetch,
    isRefetching: isWhitelistRefetching,
    isRefetchError: isWhitelistRefetchError,
  } = useGetBeneficiariesById({
    page: selectedWLPage,
    pageSize: 10,
    programId: programID?.toString(),
    moduleId,
    whitelistId: selectedWhitelistId,
    enabled: !!selectedWhitelistId,
  });

  const { data: whitelistBucket } = useGetWhitelistByProgramId(
    { page: bucketPage, pageSize: 10 },
    programID?.toString()
  );

  const totalPages = data?.body.totalPages ?? 0;
  const totalBucketPages = whitelistBucket?.body.totalPages ?? 0;
  const totalSelectedWhitelistBucketPage = selectedWhitelistBucket?.body?.totalPages ?? 0;

  const tableData = useMemo(() => {
    return data ? data.body.data : [];
  }, [data]);

  const whitelistTableData = useMemo(() => {
    return whitelistBucket ? whitelistBucket.body.data : [];
  }, [whitelistBucket]);

  const selectedWhitelistTableData = useMemo(() => {
    return selectedWhitelistBucket ? selectedWhitelistBucket.body.data : [];
  }, [selectedWhitelistBucket]);

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
        selectedWhitelistId
          ? columnHelper.accessor('whitelistDate', {
              header: 'Whitelist Date',
              cell: (info) => (
                <Text as="span" variant="Body2Regular">
                  {info.getValue() ? formatDateForInput(info.getValue()) : 'N/A'}
                </Text>
              ),
              meta: { isCentered: true },
            })
          : undefined,
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
            ) : info.row.original.status === FormStatus.WHITELISTED ? (
              <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
                Whitelisted
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
                      setSelectedIds([info.row.original.id.toLocaleString()]);
                      onOpenCreate();
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Create New Whitelist
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIds([info.row.original.id.toString()]);
                      onOpenExisting();
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Add to Existing Whitelist
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ),
        }),
      ] as ColumnDef<Beneficiary>[],
    []
  );

  const dynamicColumnsWhitelist: ColumnDef<WhitelistDetails>[] = useMemo(() => {
    if (!whitelistTableData || whitelistTableData.length === 0) return [];
    const keys = Object.keys(whitelistTableData[0]);

    console.log(keys);

    const otherColumns = keys
      .filter((key) => key !== 'vendorId' && key !== 'id' && key !== 'status')
      .map((key) => ({
        header: () => {
          if (key === 'beneficiariesNo') {
            return (
              <Text variant="Body3Semibold" textAlign="left">
                No. of Beneficiaries
              </Text>
            );
          }

          return (
            <Text variant="Body3Semibold" textAlign="left">
              {keyRename(key)}
            </Text>
          );
        },
        accessorKey: key,
        cell: (info) => {
          const value = info.getValue() as string | number | undefined;

          if (key === 'Picture' && typeof value === 'string')
            return (
              <Box pos="relative" boxSize="5" rounded="full" overflow="hidden">
                <Image src={value} alt="Beneficiary Image" sizes="1.25rem" sx={{ objectFit: 'cover' }} fill />
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

    const statusColumn: ColumnDef<WhitelistDetails> = {
      header: () => (
        <Text variant="Body3Semibold" textAlign="center">
          Status
        </Text>
      ),
      accessorKey: 'status',
      cell: (info) =>
        info.row.original.status === 'APPROVED' ? (
          <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
            Approved
          </Text>
        ) : info.row.original.status === 'DISAPPROVED' ? (
          <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
            Denied
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
                  setSelectedWL(info.row.original);
                  onOpenEdit();
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Edit
                </Text>
              </MenuItem>
              {/* <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIds([info.row.original.id.toString()]);
                  onOpenExisting();
                  // onApprove({ status: 'Approved', id: info.row.original.id });
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Start Disbursement
                </Text>
              </MenuItem> */}
            </MenuList>
          </Menu>
        ),
      enableSorting: false, // Enable sorting for status
    };

    return [...otherColumns, statusColumn];
  }, [whitelistTableData]);

  console.log(dynamicColumnsWhitelist);

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <Tabs onChange={(index) => setActiveTabIndex(index)} size="sm" variant="unstyled" isLazy flex="1 1 0%">
        <TabList>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>Pending</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex alignItems="center" gap="4px">
              <Text variant={activeTabIndex === 1 ? 'Body2Bold' : 'Body2Semibold'}>Whitelisted</Text>
            </Flex>
          </Tab>
        </TabList>

        <TabPanels h="100%">
          {/* Pending */}
          <TabPanel px="0" h="100%">
            <Flex direction="column" h="full">
              <Flex align="center" justify="space-between" mb="8">
                <Flex align="center" gap="6">
                  <Flex align="center" gap="2" shrink={0}>
                    <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
                      Filter by
                    </Text>
                    <Dropdown variant="primaryDropdown" options={options} value={sort} onChange={setSort} />
                  </Flex>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="primary.600">
                      <MdSearch />
                    </InputLeftElement>
                    <Input placeholder="Search" variant="primary" pl="2.5rem" />
                  </InputGroup>
                </Flex>
                <ButtonGroup size="medium" spacing="4">
                  <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary">
                    Download Report
                  </Button>
                  <Button
                    rightIcon={<MdArrowRightAlt />}
                    variant="primary"
                    size="medium"
                    onClick={() => {
                      setSelectedIds([]);
                      onOpenCreate();
                    }}
                    leftIcon={<MdAddCircle />}
                  >
                    Create Whitelist
                  </Button>
                </ButtonGroup>
              </Flex>
              <>
                <ReusableTable
                  data={tableData}
                  columns={columns}
                  onClick={openBeneficiaryModal}
                  selectable
                  isLoading={isLoading || isRefetching}
                  isError={isError || isRefetchError}
                  onRefresh={refetch}
                  onSelectionChange={(selectedRows) => {
                    setSelectedIds(selectedRows.map((row) => row.id.toString()));
                  }}
                  selectedChildren={
                    <>
                      <Button variant="accept" size="medium" leftIcon={<MdCheckCircle />} onClick={onOpenCreate}>
                        Create Whitelist with Selected
                      </Button>
                      <Button variant="secondary" size="medium" leftIcon={<MdCancel />} onClick={onOpenExisting}>
                        Add Selected to Existing Whitelist
                      </Button>
                    </>
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
              </>
              {beneficiary && (
                <BeneficiaryDetailsModal
                  isOpen={isOpen}
                  onClose={onClose}
                  beneficiary={beneficiary}
                  moduleName="Whitelisting"
                />
              )}
            </Flex>
          </TabPanel>

          {/* Whitelisted */}
          <TabPanel px="0" h="100%">
            <Flex direction="column" h="full">
              <Flex align="center" justify="space-between" mb="8">
                <Flex align="center" gap="6">
                  <Flex align="center" gap="2" shrink={0}>
                    <Text as="label" variant="Body2Semibold" color="grey.500" flexShrink={0}>
                      Filter by
                    </Text>
                    <Dropdown variant="primaryDropdown" options={options} value={sort} onChange={setSort} />
                  </Flex>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="primary.600">
                      <MdSearch />
                    </InputLeftElement>
                    <Input placeholder="Search" variant="primary" pl="2.5rem" />
                  </InputGroup>
                </Flex>
                <ButtonGroup size="medium" spacing="4">
                  <Button leftIcon={<MdDownload size="0.875rem" />} variant="secondary">
                    Download Report
                  </Button>
                  <Button
                    rightIcon={<MdArrowRightAlt />}
                    variant="primary"
                    size="medium"
                    onClick={() => {
                      setSelectedIds([]);
                      onOpenCreate();
                    }}
                    leftIcon={<MdAddCircle />}
                  >
                    Create Whitelist
                  </Button>
                </ButtonGroup>
              </Flex>
              {!selectedWhitelistId ? (
                <>
                  <ReusableTable
                    data={whitelistTableData}
                    columns={dynamicColumnsWhitelist}
                    onClick={(selected) => setSelectedWhitelistId(selected.id)}
                    selectable
                    isLoading={isLoading || isRefetching}
                    isError={isError || isRefetchError}
                    onRefresh={refetch}
                  />
                  <TablePagination
                    handleNextPage={() => setBucketPage((prev) => Math.min(prev + 1, totalBucketPages))}
                    handlePrevPage={() => setBucketPage((prev) => Math.max(prev - 1, 1))}
                    handlePageChange={(pageNumber) => setBucketPage(pageNumber)}
                    isNextDisabled={bucketPage >= totalBucketPages}
                    isPrevDisabled={bucketPage <= 1}
                    currentPage={bucketPage}
                    totalPages={totalBucketPages}
                    isDisabled={isLoading || isPlaceholderData}
                    display={totalBucketPages > 1 ? 'flex' : 'none'}
                  />
                </>
              ) : (
                <>
                  <Flex>
                    <Button
                      variant="unstyled"
                      fontSize="12px"
                      leftIcon={<MdArrowBack />}
                      onClick={() => setSelectedWhitelistId('')}
                    >
                      Back
                    </Button>
                  </Flex>
                  <ReusableTable
                    data={selectedWhitelistTableData}
                    columns={columns}
                    selectable
                    isLoading={isWhitelistLoading || isWhitelistRefetching}
                    isError={isWhitelistError || isWhitelistRefetchError}
                    onRefresh={whitelistRefetch}
                  />
                  <TablePagination
                    handleNextPage={() =>
                      setSelectedWLPage((prev) => Math.min(prev + 1, totalSelectedWhitelistBucketPage))
                    }
                    handlePrevPage={() => setSelectedWLPage((prev) => Math.max(prev - 1, 1))}
                    handlePageChange={(pageNumber) => setSelectedWLPage(pageNumber)}
                    isNextDisabled={selectedWLPage >= totalSelectedWhitelistBucketPage}
                    isPrevDisabled={selectedWLPage <= 1}
                    currentPage={selectedWLPage}
                    totalPages={totalSelectedWhitelistBucketPage}
                    isDisabled={isWhitelistLoading || isWhitelistPlaceholderData}
                    display={totalSelectedWhitelistBucketPage > 1 ? 'flex' : 'none'}
                  />
                </>
              )}

              {/* {beneficiary && <BeneficiaryDetailsModal isOpen={isOpen} onClose={onClose} beneficiary={beneficiary} />} */}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <CreateWhiteListBucket
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        programId={programID.toString()}
        programType={programType}
        beneficiariesIds={selectedIds}
      />
      {selectedWL && (
        <EditWhiteListBucket
          programId={programID.toString()}
          initialValue={selectedWL}
          isOpen={isOpenEdit}
          onClose={() => {
            setSelectedWL(undefined);
            onCloseEdit();
          }}
        />
      )}
      <AddExistingWhiteListBucket
        isOpen={isOpenExisting}
        onClose={onCloseExisting}
        beneficiariesIds={selectedIds}
        programID={programID}
        selectedIds={selectedIds}
      />
    </>
  );
};

export default WhitelistingPage;

const keyRename = (name: string) =>
  ({
    programName: 'Program',
    beneficiariesNo: 'Number of Beneficiaries',
  })[name] ?? name;
