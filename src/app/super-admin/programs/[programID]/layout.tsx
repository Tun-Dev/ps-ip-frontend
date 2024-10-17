'use client';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <Flex w="full" flexDir="column" gap="20px" pt="20px">
      <Flex gap="12px">
        {ModulesData.map((item) => (
          <ModuleCard
            key={item.id}
            {...item}
            maxW="242px"
            onClick={() => router.push(`/super-admin/programs/${item.id}/${item.name.toLowerCase()}`)}
          />
        ))}
      </Flex>
      {children}
    </Flex>
  );
};

export default ProgramIDLayout;
