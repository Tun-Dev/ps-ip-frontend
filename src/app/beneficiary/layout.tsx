'use client';

import { Image, Link } from '@chakra-ui/next-js';
import { Box, Grid, Stack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { withDesktopOnlyOverlay } from '@/shared/chakra/components/desktop-only-overlay';
import { CoverPhoto } from './components/cover-photo';

const BeneficiaryLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Grid
      templateRows={{ base: 'auto 1fr', xs: 'none' }}
      templateColumns={{ xs: 'auto 1fr auto' }}
      w="full"
      minH="100dvh"
      p={{ base: '3', xs: '6' }}
      gap="2.5"
    >
      <Box pos="fixed" h="100dvh" w="100dvw" top="0" left="0" zIndex="-1">
        <Image
          src="/images/beneficiaries-bg.png"
          alt="Background image"
          sizes="100vw"
          sx={{ objectFit: 'cover' }}
          fill
          priority
        />
      </Box>
      <Link href="/" bgColor="white" p="2" rounded="0.375rem" alignSelf="flex-start" justifySelf="self-start">
        <Image
          src="/images/BOI_LOGO.png"
          alt="Bank of Industry Logo"
          width={1048}
          height={238}
          w="auto"
          h={{ base: '1.5rem', xs: '2.25rem' }}
          sx={{ objectFit: 'contain' }}
          priority
        />
      </Link>
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
      <Box
        display={{ base: 'none', xs: 'block' }}
        bgColor="white"
        p="2"
        rounded="0.375rem"
        alignSelf="flex-start"
        justifySelf="self-start"
        visibility="hidden"
      >
        <Image
          src="/images/BOI_LOGO.png"
          alt="Bank of Industry Logo"
          width={1048}
          height={238}
          w="auto"
          h={{ base: '1.5rem', xs: '2.25rem' }}
          sx={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    </Grid>
  );
};

export default withDesktopOnlyOverlay(BeneficiaryLayout);
