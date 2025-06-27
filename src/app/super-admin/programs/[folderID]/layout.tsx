'use client';

import {
  Button,
  Flex,
  Grid,
  MenuButton,
  Spinner,
  Text,
  Menu,
  MenuItem,
  MenuList,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useCallback, type PropsWithChildren } from 'react';
import { MdAddCircle, MdMoreHoriz } from 'react-icons/md';

import ProgramsBreadcrumbs from '../programs-breadcrumbs';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useBulkProcessAction } from '@/hooks/useBulkProcessAction';
import { FormStatus } from '@/utils';
import CreateWhiteListBucket from '@/shared/chakra/modals/CreateWhiteListBucket';
import { AddExistingWhiteListBucket } from '@/shared/chakra/modals/AddExistingWhiteListBucket';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { folderID, programID } = useParams();
  const { mutate } = useBulkProcessAction();

  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenExisting, onOpen: onOpenExisting, onClose: onCloseExisting } = useDisclosure();

  const lastPart = pathname.split('/').pop();
  console.log(lastPart);

  const { response } = useGetProgramById(programID?.toString());
  const programModuleId =
    response?.body?.programModules?.find((module) => module.module.toLowerCase() === lastPart)?.id.toString() ?? '';

  const BulkAction = useCallback(
    ({ status }: { status: string }) => {
      mutate(
        { programModuleId, status },
        {
          onSuccess: () => {
            toast({ title: `${status === 'Disapproved' ? 'Denied' : status} successfully`, status: 'success' });
          },
        }
      );
    },
    [mutate, programModuleId, toast]
  );

  const programType = response?.body?.programType ?? '';

  const isDisbursement = pathname.includes('disbursement');
  const isWhitelisting = pathname.includes('whitelisting');

  return (
    <Flex flexDir="column" h="full">
      <Flex
        h="72px"
        p="24px"
        borderBottom="1px solid"
        borderBottomColor="grey.200"
        justifyContent="space-between"
        alignItems="center"
        gap="4"
      >
        <ProgramsBreadcrumbs />
        {pathname !== `/super-admin/programs/${folderID}/create` &&
          !pathname.includes(`/super-admin/programs/${folderID}/edit`) &&
          !pathname.includes(`/super-admin/programs/${folderID}/${programID}`) && (
            <Button
              variant="primary"
              gap="8px"
              onClick={() => router.push(`/super-admin/programs/${folderID}/create`)}
              flexShrink="0"
            >
              <MdAddCircle />
              <Text>Create New Product</Text>
            </Button>
          )}
        {pathname.includes(`/super-admin/programs/${folderID}/${programID}`) && (
          <Menu>
            <Button
              as={MenuButton}
              variant="primary"
              gap="8px"
              // width="164px"
              display="flex"
              alignItems="center"
              // onClick={() => router.push(`/super-admin/programs/${folderID}/create`)}
              flexShrink="0"
            >
              <Flex alignItems="center" gap="8px">
                <MdMoreHoriz />
                <Text>Bulk Action</Text>
              </Flex>
            </Button>
            <MenuList>
              {isWhitelisting ? (
                <>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCreate();
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Create New Bulk Whitelist
                    </Text>
                  </MenuItem>

                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenExisting();
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      Add Bulk to Existing Whitelist
                    </Text>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      BulkAction({ status: isDisbursement ? FormStatus.DISBURSED : FormStatus.APPROVED });
                      // onApprove({ status: 'Approved', id: info.row.original.id });
                    }}
                  >
                    <Text as="span" variant="Body2Regular" w="full">
                      {isDisbursement ? 'Mark all as disbursed' : 'Approve all'}
                    </Text>
                  </MenuItem>
                  {!isDisbursement && (
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        BulkAction({ status: FormStatus.DISAPPROVED });
                        // onApprove({ status: 'Disapproved', id: info.row.original.id });
                      }}
                    >
                      <Text as="span" variant="Body2Regular" w="full">
                        Deny all
                      </Text>
                    </MenuItem>
                  )}
                </>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Flex flex="1 1 0%" w="100%" h="full">
        <Suspense
          fallback={
            <Grid placeItems="center" boxSize="full">
              <Spinner />
            </Grid>
          }
        >
          {children}
        </Suspense>
      </Flex>

      <CreateWhiteListBucket
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        programId={programID?.toString()}
        programType={programType}
        beneficiariesIds={[]}
        programName={response?.body?.name ?? ''}
        isBulk={true}
      />

      <AddExistingWhiteListBucket
        isOpen={isOpenExisting}
        onClose={onCloseExisting}
        beneficiariesIds={[]}
        programID={programID}
        programName={response?.body?.name ?? ''}
        selectedIds={[]}
        isBulk={true}
      />
    </Flex>
  );
};

export default ProgramsLayout;
