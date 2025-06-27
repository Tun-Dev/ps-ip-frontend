'use client';

import {
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { MdCancel, MdCheckCircle, MdMoreHoriz, MdOutlineUploadFile, MdSearch } from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
// import { useGetProgramById } from '@/hooks/useGetProgramById';
import { ReusableTable } from '@/shared';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { FormStatus } from '@/utils';
// import { parsePhoneNumber } from 'libphonenumber-js/min';
import { useParams } from 'next/navigation';
import NominationModal from '../modals/NominationModal';
// import DownloadDisbursementListModal from '../modals/DownloadDisbursementListModal';
import { Dropdown } from './dropdown';
// import UploadDisbursementListModal from '../modals/UploadDisbursementListModal';

const columnHelper = createColumnHelper<Beneficiary>();

type Props = {
  moduleName: string;
  dashboardType?: 'general' | 'client';
};

export const BeneficiaryTable = ({ moduleName }: Props) => {
  const toast = useToast();
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const statusOptions = useMemo(
    () => [
      { label: 'Disbursed', value: 'disbursed' },
      { label: 'Not Disbursed', value: 'not-disbursed' },
    ],
    []
  );

  const { isOpen: isNominationOpen, onOpen: onNominationOpen, onClose: onNominationClose } = useDisclosure();
  // const {
  //   isOpen: isDownloadDisbursementOpen,
  //   onOpen: onDownloadDisbursementOpen,
  //   onClose: onDownloadDisbursementClose,
  // } = useDisclosure();
  // const {
  //   isOpen: isUploadDisbursementOpen,
  //   onOpen: onUploadDisbursementOpen,
  //   onClose: onUploadDisbursementClose,
  // } = useDisclosure();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // const { response: programDetails } = useGetProgramById(programID?.toString());
  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { data: modules } = useGetModules();

  // const { mutate: download, isPending: isDownloading } = useDownloadDisbursementList();

  const moduleId = useMemo(
    () => modules?.body?.find((module) => module.name === moduleName)?.id ?? 0,
    [modules, moduleName]
  );

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page: page,
      pageSize: pageSize,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      programId: programID.toString(),
      moduleId: moduleId,
      enabled: !!programID && !!moduleId,
    });

  const totalPages = data?.body.totalPages ?? 1;
  const totalCount = data?.body.total ?? 0;

  const tableData = useMemo(() => (data ? data.body.data : []), [data]);

  const resetFilters = () => {
    setPage(1);
    setQuery('');
  };

  const onApprove = useCallback(
    ({ status, ids }: { status: FormStatus; ids: string[] }) => {
      const payload = {
        status: status,
        beneficiaryId: ids,
        moduleId: moduleId,
        programId: programID.toString(),
      };

      approveBeneficiary(payload, {
        onSuccess: () => {
          toast({ title: `${status} successfully`, status: 'success' });
        },
      });
    },
    [approveBeneficiary, programID, moduleId, toast]
  );

  // const columns = useMemo(
  //   () =>
  //     [
  //       columnHelper.accessor('firstname', {
  //         header: 'First Name',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ?? 'N/A'}
  //           </Text>
  //         ),
  //       }),
  //       columnHelper.accessor('lastname', {
  //         header: 'Last Name',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ?? 'N/A'}
  //           </Text>
  //         ),
  //       }),
  //       columnHelper.accessor('otherNames', {
  //         header: 'Other Names',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ?? 'N/A'}
  //           </Text>
  //         ),
  //       }),
  //       columnHelper.accessor('email', {
  //         header: 'Email',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ?? 'N/A'}
  //           </Text>
  //         ),
  //       }),
  //       columnHelper.accessor('phoneNumber', {
  //         header: 'Phone Number',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ? '0' + parsePhoneNumber(info.getValue()).nationalNumber : 'N/A'}
  //           </Text>
  //         ),
  //       }),
  //       columnHelper.accessor('gender', {
  //         header: 'Gender',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ?? 'N/A'}
  //           </Text>
  //         ),
  //         meta: { isCentered: true },
  //       }),
  //       columnHelper.accessor('dob', {
  //         header: 'Date of Birth',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() ? formatDateForInput(info.getValue()) : 'N/A'}
  //           </Text>
  //         ),
  //         meta: { isCentered: true },
  //       }),
  //       columnHelper.accessor('isFlagged', {
  //         header: 'Flagged',
  //         cell: (info) => (
  //           <Text as="span" variant="Body2Regular">
  //             {info.getValue() === true ? 'Yes' : info.getValue() === false ? 'No' : 'N/A'}
  //           </Text>
  //         ),
  //         meta: { isCentered: true },
  //       }),
  //       columnHelper.display({
  //         id: 'actions',
  //         header: () => (
  //           <Text variant="Body3Semibold" color="grey.500" textAlign="center">
  //             Actions/Status
  //           </Text>
  //         ),
  //         cell: (info) =>
  //           info.row.original.status === FormStatus.APPROVED ? (
  //             <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
  //               Approved
  //             </Text>
  //           ) : info.row.original.status === FormStatus.DISAPPROVED ? (
  //             <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
  //               Denied
  //             </Text>
  //           ) : info.row.original.status === FormStatus.DISBURSED ? (
  //             <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
  //               Disbursed
  //             </Text>
  //           ) : (
  //             <Menu>
  //               <MenuButton
  //                 as={IconButton}
  //                 variant="ghost"
  //                 aria-label="Actions"
  //                 icon={<Icon as={MdMoreHoriz} boxSize="1.25rem" color="grey.500" />}
  //                 minW="0"
  //                 h="auto"
  //                 mx="auto"
  //                 display="flex"
  //                 p="1"
  //                 onClick={(e) => e.stopPropagation()}
  //               />
  //               <MenuList>
  //                 {moduleName === 'Disbursement' ? (
  //                   <MenuItem
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       onApprove({ status: FormStatus.DISBURSED, ids: [info.row.original.id] });
  //                     }}
  //                   >
  //                     <Text as="span" variant="Body2Regular" w="full">
  //                       Mark as Disbursed
  //                     </Text>
  //                   </MenuItem>
  //                 ) : (
  //                   <>
  //                     <MenuItem
  //                       onClick={(e) => {
  //                         e.stopPropagation();
  //                         onApprove({ status: FormStatus.APPROVED, ids: [info.row.original.id] });
  //                       }}
  //                     >
  //                       <Text as="span" variant="Body2Regular" w="full">
  //                         Approve
  //                       </Text>
  //                     </MenuItem>
  //                     <MenuItem
  //                       onClick={(e) => {
  //                         e.stopPropagation();
  //                         onApprove({ status: FormStatus.DISAPPROVED, ids: [info.row.original.id] });
  //                       }}
  //                     >
  //                       <Text as="span" variant="Body2Regular" w="full">
  //                         Deny
  //                       </Text>
  //                     </MenuItem>
  //                   </>
  //                 )}
  //               </MenuList>
  //             </Menu>
  //           ),
  //       }),
  //     ] as ColumnDef<Beneficiary>[],
  //   [onApprove, moduleName]
  // );

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
                Approved
              </Text>
            ) : info.row.original.status === FormStatus.DISAPPROVED ? (
              <Text as="span" display="block" color="red" textAlign="center" variant="Body3Semibold">
                Denied
              </Text>
            ) : info.row.original.status === FormStatus.DISBURSED ? (
              <Text as="span" display="block" color="green" textAlign="center" variant="Body3Semibold">
                Disbursed
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
                  {moduleName === 'Disbursement' ? (
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove({ status: FormStatus.DISBURSED, ids: [info.row.original.id] });
                      }}
                    >
                      <Text as="span" variant="Body2Regular" w="full">
                        Mark as Disbursed
                      </Text>
                    </MenuItem>
                  ) : (
                    <>
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
                    </>
                  )}
                </MenuList>
              </Menu>
            ),
        }),
      ] as ColumnDef<Beneficiary>[],
    [onApprove, moduleName]
  );

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  const selectedBeneficiaries = tableData.filter((row) => selectedIds.includes(row.id.toString()));
  const anyAlreadyApprovedOrDisbursed = selectedBeneficiaries.some((row) =>
    [FormStatus.APPROVED, FormStatus.DISAPPROVED, FormStatus.DISBURSED].includes(row.status)
  );

  return (
    <>
      <NominationModal isOpen={isNominationOpen} onClose={onNominationClose} programId={programID?.toLocaleString()} />
      {/* <DownloadDisbursementListModal
        isOpen={isDownloadDisbursementOpen}
        onClose={onDownloadDisbursementClose}
        programId={programID?.toLocaleString()}
        programName={programDetails?.body?.name || ''}
      /> */}
      {/* <UploadDisbursementListModal
        isOpen={isUploadDisbursementOpen}
        onClose={onUploadDisbursementClose}
        programId={programID?.toLocaleString()}
        programName={programDetails?.body?.name || ''}
      /> */}
      {!isLoading && !isRefetching && tableData.length < 1 && moduleName === 'Nomination' ? (
        <Flex height="100%" flexDir="column" alignItems="center" gap="16px" pt="80px">
          <Image src="/icons/empty_nom.svg" alt="Empty state" w="100px" />
          <Text variant="Body2Semibold" color="#7D7D7D">
            No Data Available
          </Text>
          <Button
            mt="16px"
            leftIcon={<MdOutlineUploadFile />}
            variant="primary"
            maxW="320px"
            w="100%"
            h="48px"
            onClick={() => onNominationOpen()}
          >
            Upload Nomination List
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" h="full" gap="6">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="6">
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
              {moduleName === 'Disbursement' && (
                <Flex gap="2" alignItems="center" w="400px">
                  <Text>Status</Text>
                  <Dropdown options={statusOptions} />
                </Flex>
              )}
            </Flex>
            <Flex gap="16px">
              {/* <Button
                leftIcon={<MdDownload size="0.875rem" />}
                variant={moduleName === 'Nomination' ? 'secondary' : 'primary'}
                size="medium"
              >
                Download Report
              </Button> */}
              {moduleName === 'Nomination' && (
                <Button
                  leftIcon={<MdOutlineUploadFile />}
                  variant="primary"
                  size="medium"
                  onClick={() => onNominationOpen()}
                >
                  Upload Nomination List
                </Button>
              )}
              {/* {moduleName === 'Disbursement' && (
                <Button
                  leftIcon={<MdOutlineUploadFile />}
                  variant="primary"
                  size="medium"
                  onClick={() => onUploadDisbursementOpen()}
                >
                  Upload Disbursement List
                </Button>
              )} */}
              {/* {moduleName === 'Disbursement' && (
                <Button
                  leftIcon={<MdDownload />}
                  variant="primary"
                  size="medium"
                  onClick={() => download({ programId: programID?.toLocaleString() })}
                  isLoading={isDownloading}
                >
                  Download Disbursement List
                </Button>
              )} */}
            </Flex>
          </Flex>
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
              moduleName === 'Disbursement' && !anyAlreadyApprovedOrDisbursed ? (
                <Button
                  variant="accept"
                  size="medium"
                  leftIcon={<MdCheckCircle />}
                  onClick={() => onApprove({ status: FormStatus.DISBURSED, ids: selectedIds })}
                >
                  Disburse selected
                </Button>
              ) : !anyAlreadyApprovedOrDisbursed ? (
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
              ) : null
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
            display={totalCount > 1 ? 'flex' : 'none'}
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
              moduleName={moduleName}
            />
          )}
        </Flex>
      )}
    </>
  );
};
