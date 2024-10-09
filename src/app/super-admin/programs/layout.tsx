'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { MdAddCircle } from 'react-icons/md';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Flex flexDir="column" h="full">
      <Flex
        h="72px"
        pb="24px"
        borderBottom="1px solid"
        borderBottomColor="grey.200"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="Body1Semibold" color="grey.400">
          Programs
        </Text>
        {pathname !== '/super-admin/programs/create' && (
          <Button variant="primary" gap="8px" onClick={() => router.push('/super-admin/programs/create')}>
            <MdAddCircle />
            <Text>Create New Program</Text>
          </Button>
        )}
      </Flex>
      <Flex flex="1 1 0%" w="100%" h="full">
        {children}
      </Flex>
    </Flex>
  );
};

export default ProgramsLayout;
