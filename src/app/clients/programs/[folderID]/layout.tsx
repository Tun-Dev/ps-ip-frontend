'use client';

import { Button, Flex, Text, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, useToast } from '@chakra-ui/react';
import { Suspense, useCallback, type PropsWithChildren } from 'react';

import ProgramsBreadcrumbs from '../programs-breadcrumbs';
import { MdMoreHoriz } from 'react-icons/md';
import { useBulkProcessAction } from '@/hooks/useBulkProcessAction';
import { usePathname, useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useGetProgramById } from '@/hooks/useGetProgramById';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const toast = useToast();
  // const router = useRouter();
  const pathname = usePathname();
  const { folderID, programID } = useParams();
  const { mutate } = useBulkProcessAction();

  const lastPart = pathname.split('/').pop();

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

  return (
    <Flex flexDir="column" h="full">
      <Flex
        h="72px"
        py="24px"
        borderBottom="1px solid"
        borderBottomColor="grey.200"
        justifyContent="space-between"
        alignItems="center"
        gap="4"
      >
        <ProgramsBreadcrumbs />
        {pathname.includes(`/clients/programs/${folderID}/${programID}`) && (
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
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  BulkAction({ status: 'APPROVED' });
                  // onApprove({ status: 'Approved', id: info.row.original.id });
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Approve all
                </Text>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  BulkAction({ status: 'DISAPPROVED' });
                  // onApprove({ status: 'Disapproved', id: info.row.original.id });
                }}
              >
                <Text as="span" variant="Body2Regular" w="full">
                  Deny all
                </Text>
              </MenuItem>
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
    </Flex>
  );
};

export default ProgramsLayout;
