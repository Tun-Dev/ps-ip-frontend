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
  Spinner,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { MdCancel, MdCheckCircle, MdDownload, MdMoreHoriz, MdOutlineUploadFile, MdSearch } from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetVerificationStatus } from '@/hooks/useGetVerificationStatus';
import { useToggleVerification } from '@/hooks/useToggleAutomaticVerification';
import { ReusableTable } from '@/shared';
import BeneficiaryDetailsModal from '@/shared/chakra/components/beneficiary-details-modal';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { formatDateForInput, FormStatus } from '@/utils';
import { useParams } from 'next/navigation';
import NominationModal from '../modals/NominationModal';

const columnHelper = createColumnHelper<Beneficiary>();

type Props = {
  moduleName: string;
};

export const BeneficiaryTable = ({ moduleName }: Props) => {
  const toast = useToast();
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isNominationOpen, onOpen: onNominationOpen, onClose: onNominationClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { response } = useGetProgramById(programID.toString());
  const { data: modules } = useGetModules();

  const moduleId = useMemo(
    () => modules?.body?.find((module) => module.name === moduleName)?.id ?? 0,
    [modules, moduleName]
  );

  const toggleVerificationMutation = useToggleVerification();

  const { data: verficationStatus, isLoading: isVerificationLoading } = useGetVerificationStatus(programID.toString());

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked;
    toggleVerificationMutation.mutate({ programId: programID as string, status: newStatus });
  };

  const isProgramCompleted = useMemo(
    () => response?.body?.programModules?.find((module) => module.module === moduleName)?.isCompleted ?? true,
    [response, moduleName]
  );

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page: page,
      pageSize: 10,
      query: debouncedQuery === '' ? undefined : debouncedQuery,
      programId: programID.toString(),
      moduleId: moduleId,
      enabled: !!programID && !!moduleId,
    });

  const totalPages = data?.body.totalPages ?? 1;

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
        columnHelper.accessor('email', {
          header: 'Email',
          cell: (info) => (
            <Text as="span" variant="Body2Regular">
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
        }),
        columnHelper.accessor('phoneNumber', {
          header: 'Phone Number',
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
              {info.getValue() === true ? 'Yes' : info.getValue() === false ? 'No' : 'N/A'}
            </Text>
          ),
          meta: { isCentered: true },
        }),
        columnHelper.display({
          id: 'actions',
          header: () => (
            <Text variant="Body3Semibold" color="grey.500" textAlign="center">
              Actions
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

  return (
    <>
      <NominationModal isOpen={isNominationOpen} onClose={onNominationClose} programId={programID?.toLocaleString()} />
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
            </Flex>
            <Flex gap="16px">
              {moduleName === 'Verification' && (
                <Flex alignItems="center" gap="8px">
                  <Text as="label" htmlFor="automatic-verification" variant="Body2Semibold" color="grey.500">
                    Automatic verification:
                  </Text>
                  {!!verficationStatus ? (
                    <Switch
                      id="automatic-verification"
                      onChange={handleToggle}
                      defaultChecked={verficationStatus.body}
                      isDisabled={toggleVerificationMutation.isPending || isVerificationLoading}
                    />
                  ) : (
                    <Spinner size="xs" color="grey.400" />
                  )}
                </Flex>
              )}
              <Button
                leftIcon={<MdDownload size="0.875rem" />}
                variant={isProgramCompleted ? 'primary' : 'secondary'}
                size="medium"
              >
                Download Report
              </Button>
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
              moduleName === 'Disbursement' ? (
                <Button
                  variant="accept"
                  size="medium"
                  leftIcon={<MdCheckCircle />}
                  onClick={() => onApprove({ status: FormStatus.DISBURSED, ids: selectedIds })}
                >
                  Disburse selected
                </Button>
              ) : (
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
              )
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
