'use client';

import { Button, Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, type PropsWithChildren } from 'react';
import { MdAddCircle } from 'react-icons/md';

import ProgramsBreadcrumbs from '../programs-breadcrumbs';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { folderID } = useParams();

  return (
    <Flex flexDir="column" h="full">
      <Flex
        h="72px"
        p="24px"
        borderBottom="1px solid"
        borderBottomColor="grey.200"
        justifyContent="space-between"
        alignItems="center"
      >
        <ProgramsBreadcrumbs />
        {pathname !== `/super-admin/programs/${folderID}/create` &&
          !pathname.includes(`/super-admin/programs/${folderID}/edit`) && (
            <Button variant="primary" gap="8px" onClick={() => router.push(`/super-admin/programs/${folderID}/create`)}>
              <MdAddCircle />
              <Text>Create New Program</Text>
            </Button>
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
