import { Box, Flex } from '@chakra-ui/react';
import { Suspense, type PropsWithChildren } from 'react';

import ProgramsBreadcrumbs from './programs-breadcrumbs';

const ModulesLayout = ({ children }: PropsWithChildren) => {
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
        <ProgramsBreadcrumbs />
      </Flex>
      <Box flex="1 1 0%" boxSize="full">
        <Suspense>{children}</Suspense>
      </Box>
    </Flex>
  );
};

export default ModulesLayout;
