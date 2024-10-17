import { Box, Flex, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

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
        <Text variant="Body1Semibold" color="grey.400">
          INVESTMENT IN DIGITAL CREATIVE ENTERPRISES PROGRAM (iDICE)
        </Text>
      </Flex>
      <Box flex="1 1 0%">{children}</Box>
    </Flex>
  );
};

export default ModulesLayout;
