'use client';

import { ProgramFormProvider } from '@/providers/form-provider';
import { ProgramStoreProvider } from '@/providers/programs-store-provider';
import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { withProtectedLoader } from '@/shared/chakra/components/protected-route-loader';
import { Box, Flex, Image } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';

const ClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgramStoreProvider>
      <ProgramFormProvider>
        <Flex w="full" minH="100dvh" bg="primary.500" p="24px" gap="24px" position="relative" minW="1000px">
          <Image
            src="/images/bg-image.png"
            alt=""
            pos="absolute"
            top="0px"
            left="0px"
            w="100%"
            height="100%"
            objectFit="cover"
          />
          <Flex pos="fixed" w="208px" top="24px" bottom="24px" left="24px" zIndex={1}>
            <Sidebar />
          </Flex>
          <Box w="calc(100% - 232px)" borderRadius="12px" ml="auto" bg="white" p="24px" boxShadow="card" zIndex={1}>
            {children}
          </Box>
        </Flex>
      </ProgramFormProvider>
    </ProgramStoreProvider>
  );
};

export default withDesktopOnlyOverlay(withProtectedLoader(ClientsLayout, 'Client'));
