'use client';

import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { Box, Flex, Image } from '@chakra-ui/react';

const BeneficiaryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" minH="100dvh" bg="greenBG" p="24px" gap="24px" position="relative" justifyContent="center">
      <Image src="/images/BOI_LOGO.png" alt="" pos="absolute" top="32px" left="32px" w="181px" h="36px" zIndex={2} />
      <Box w="920px" borderRadius="12px" bg="white" boxShadow="card">
        {children}
      </Box>
    </Flex>
  );
};

export default withDesktopOnlyOverlay(BeneficiaryLayout);
