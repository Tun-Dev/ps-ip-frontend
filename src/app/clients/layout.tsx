'use client';

import { Box, Flex, useMediaQuery, Text } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isNotDesktop] = useMediaQuery('(max-width: 1000px)');

  if (isNotDesktop) {
    return (
      <Flex
        w="full"
        minH="100dvh"
        bg="greenBG"
        p="24px"
        gap="24px"
        position="relative"
        minW="1000px"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="Body1Bold" fontSize="48px">
          Please View On A Desktop
        </Text>
      </Flex>
    );
  }

  return (
    <Flex w="full" minH="100dvh" bg="greenBG" p="24px" gap="24px" position="relative" minW="1000px">
      <Flex pos="fixed" w="208px" top="24px" bottom="24px" left="24px">
        <Sidebar />
      </Flex>
      <Box w="calc(100% - 232px)" borderRadius="12px" ml="auto" bg="white" p="24px" boxShadow="card">
        {children}
      </Box>
    </Flex>
  );
};

export default SuperAdminLayout;
