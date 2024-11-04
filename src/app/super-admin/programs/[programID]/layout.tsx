import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import { ModuleCard } from '@/components';
import { ALL_MODULES } from '@/utils';

export function generateStaticParams() {
  return ALL_MODULES.map((item) => ({ programID: item.id.toString() }));
}

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex w="full" flexDir="column" gap="20px" pt="20px">
      <Flex gap="12px" overflowX="auto">
        {ALL_MODULES.map((item, index) => (
          <ModuleCard
            key={item.id}
            module={item}
            status="In progress"
            maxW="242px"
            flexShrink={0}
            number={index + 1}
            route={`/super-admin/programs/${item.id}/${item.name.toLowerCase()}`}
            scroll
          />
        ))}
      </Flex>
      {children}
    </Flex>
  );
};

export default ProgramIDLayout;
