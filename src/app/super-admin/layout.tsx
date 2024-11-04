'use client';

import { Box, Flex } from '@chakra-ui/react';

import { withDesktopOnlyOverlay } from '@/components/desktop-only-overlay';
import { ProgramFormProvider } from '@/providers/form-provider';
import { ProgramStoreProvider } from '@/providers/programs-store-provider';
import Sidebar from './components/Sidebar';

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgramStoreProvider>
      <ProgramFormProvider>
        <Flex w="full" minH="100dvh" bg="greenBG" p="24px" gap="24px" position="relative" minW="1000px">
          <Flex pos="fixed" w="208px" top="24px" bottom="24px" left="24px">
            <Sidebar />
          </Flex>
          <Box w="calc(100% - 232px)" borderRadius="12px" ml="auto" bg="white" p="24px" boxShadow="card">
            {children}
          </Box>
        </Flex>
      </ProgramFormProvider>
    </ProgramStoreProvider>
  );
};

export default withDesktopOnlyOverlay(SuperAdminLayout);
