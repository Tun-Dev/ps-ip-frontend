'use client';

import { Image } from '@chakra-ui/next-js';
import { Box, Stack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { CoverPhoto } from './components/cover-photo';

const BeneficiaryLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Stack pos="relative" w="full" minH="100dvh" p={{ base: '3', xs: '6' }} gap="2.5" align="center">
      <Image src="/images/beneficiaries-bg.png" alt="Background image" sizes="100vw" fill />
      <Box
        pos={{ xs: 'absolute' }}
        bgColor="white"
        alignSelf="flex-start"
        p="2"
        rounded="0.375rem"
        top="6"
        left="6"
        zIndex="1"
      >
        <Image
          src="/images/BOI_LOGO.png"
          alt="Bank of Industry Logo"
          width={1048}
          height={238}
          w="auto"
          h={{ base: '1.5rem', xs: '2.25rem' }}
          sx={{ objectFit: 'contain' }}
        />
      </Box>
      <Stack
        gap="0"
        maxW={pathname.includes('details') ? '57.5rem' : '42.5rem'}
        w="full"
        mx="auto"
        rounded="0.75rem"
        bgColor="white"
        overflow="hidden"
        boxShadow="card"
        zIndex="1"
        flex="1"
      >
        <CoverPhoto />
        {children}
      </Stack>
    </Stack>
  );
};

export default withDesktopOnlyOverlay(BeneficiaryLayout);
