'use client';

import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { Flex, Box } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';

const VettingOfficersLayout = ({ children }: { children: React.ReactNode }) => {
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

export default withDesktopOnlyOverlay(VettingOfficersLayout);
