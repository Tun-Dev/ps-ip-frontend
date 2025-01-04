'use client';

import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { Box, Flex, Image } from '@chakra-ui/react';

const BeneficiaryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" minH="100dvh" bg="primary.500" p="24px" gap="24px" position="relative" justifyContent="center">
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
      <Image src="/images/boi-white.png" alt="" pos="absolute" top="32px" left="32px" w="197px" h="52px" zIndex={2} />
      <Box w="920px" borderRadius="12px" bg="white" boxShadow="card" zIndex={1}>
        {children}
      </Box>
    </Flex>
  );
};

export default withDesktopOnlyOverlay(BeneficiaryLayout);
