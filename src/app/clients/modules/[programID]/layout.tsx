import { Box, Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import { ModuleCard } from '@/shared/chakra/components';
import { ALL_MODULES } from '@/utils';

export function generateStaticParams() {
  return ALL_MODULES.map((item) => ({ programID: item.id.toString() }));
}

const ProgramIDLayout = ({ children, params }: { params: { programID: string } } & PropsWithChildren) => {
  return (
    <Flex flexDir="column" gap="20px" pt="20px" h="full">
      <Flex gap="12px" overflowX="auto">
        {ALL_MODULES.map((item, index) => (
          <ModuleCard
            key={index}
            module={item}
            status="In progress"
            number={index + 1}
            maxW="242px"
            flexShrink={0}
            route={`/clients/modules/${item.id}/${item.name.toLowerCase()}`}
            isActive={params.programID === item.id.toString()}
            scroll
          />
        ))}
      </Flex>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default ProgramIDLayout;
