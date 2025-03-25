'use client';

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
import { useCallback, useMemo, useState } from 'react';
import { MdCancel, MdCheckCircle, MdDownload, MdMoreHoriz, MdSearch } from 'react-icons/md';

import { useApproveBeneficiary } from '@/hooks/useApproveBeneficiary';
import { useGetBeneficiariesById } from '@/hooks/useGetBeneficariesByProgramId';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { VettingModalProvider } from '@/providers/vetting-modal-provider';
import { ReusableTable } from '@/shared';
import { TablePagination } from '@/shared/chakra/components/table-pagination';
import { Beneficiary } from '@/types';
import { formatDateForInput, FormStatus } from '@/utils';
import { useParams } from 'next/navigation';
import { VettingModal } from './vetting-modal';

const moduleName = 'Vetting';

export const VettingTable = () => {
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

export const BeneficiaryPanel = ({ status }: BeneficiaryPanelProps) => {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { programID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { mutate: approveBeneficiary } = useApproveBeneficiary();
  const { response } = useGetProgramById(programID.toString());
  const { data: modules } = useGetModules();

  const moduleId = useMemo(() => modules?.body?.find((module) => module.name === moduleName)?.id ?? 0, [modules]);

  const isProgramCompleted = useMemo(
    () => response?.body?.programModules?.find((module) => module.module === moduleName)?.isCompleted ?? true,
    [response]
  );

  const { data, isPlaceholderData, isLoading, isError, refetch, isRefetching, isRefetchError } =
    useGetBeneficiariesById({
      page,
      pageSize: 10,
      programId: programID.toString(),
      moduleId,
      status,
      enabled: !!programID && !!moduleId,
    });

  const totalPages = data?.body.totalPages ?? 0;

  const tableData = useMemo(() => (data ? data.body.data : []), [data]);

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
    [onApprove]
  );

  const openBeneficiaryModal = (beneficiary: Beneficiary) => {
    setBeneficiary(beneficiary);
    onOpen();
  };

  return (
    <Flex direction="column" gap="1.5rem" h="full">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="6">
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="primary.600">
              <MdSearch />
            </InputLeftElement>
            <Input placeholder="Search" variant="primary" pl="2.5rem" />
          </InputGroup>
        </Flex>
        <Flex gap="16px">
          <Button
            leftIcon={<MdDownload size="0.875rem" />}
            variant={isProgramCompleted ? 'primary' : 'secondary'}
            size="medium"
          >
            Download Report
          </Button>
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
