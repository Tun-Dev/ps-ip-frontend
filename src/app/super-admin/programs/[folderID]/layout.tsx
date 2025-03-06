'use client';

import { Button, Flex, Grid, MenuButton, Spinner, Text, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, type PropsWithChildren } from 'react';
import { MdAddCircle, MdMoreHoriz } from 'react-icons/md';

import ProgramsBreadcrumbs from '../programs-breadcrumbs';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { folderID, programID } = useParams();

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
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
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
