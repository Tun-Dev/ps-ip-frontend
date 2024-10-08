'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Flex flexDir="column">
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
        <Button variant="primary" gap="8px" onClick={() => router.push('/super-admin/programs/create')}>
          <MdAddCircle />
          <Text>Create New Program</Text>
        </Button>
      </Flex>
      {children}
    </Flex>
  );
};

export default ProgramsLayout;
