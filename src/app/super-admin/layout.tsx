'use client';

import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { ProgramFormProvider } from '@/providers/form-provider';
import { ProgramStoreProvider } from '@/providers/programs-store-provider';
import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { withProtectedLoader } from '@/shared/chakra/components/protected-route-loader';
import Sidebar from './components/Sidebar';

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <ProgramStoreProvider>
      <ProgramFormProvider>
        <Flex w="full" minH="100dvh" bg="greenBG" p="24px" gap="24px" position="relative" minW="1000px">
          <Flex pos="fixed" w="208px" top="24px" bottom="24px" left="24px">
            <Sidebar />
          </Flex>
          <Box
            w="calc(100% - 232px)"
            borderRadius="12px"
            ml="auto"
            bg="white"
            p={pathname === '/super-admin/programs' ? '0px' : '24px'}
            boxShadow="card"
          >
            {children}
          </Box>
        </Flex>
      </ProgramFormProvider>
    </ProgramStoreProvider>
  );
};

export default withDesktopOnlyOverlay(withProtectedLoader(SuperAdminLayout));
