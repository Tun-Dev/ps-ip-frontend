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
        {ModulesData.map((item, index) => (
          <ModuleCard
            key={index}
            {...item}
            maxW="242px"
            isDisabled={false}
            onClick={() => router.push(`/clients/modules/${item.id}/${item.name.toLowerCase()}`)}
          />
        ))}
      </Flex>
      {children}
    </Flex>
  );
};

export default ProgramIDLayout;
