'use client';

import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex w="full" flexDir="column" gap="20px" pt="20px">
      <Flex gap="12px">
        {ModulesData.map((item, index) => (
          <ModuleCard key={index} {...item} maxW="242px" />
        ))}
      </Flex>
      {children}
    </Flex>
  );
};

export default ProgramIDLayout;
