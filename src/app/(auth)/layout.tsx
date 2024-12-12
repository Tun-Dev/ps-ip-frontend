'use client';

import { withPublicLoader } from '@/shared/chakra/components/public-route-loader';
import { Flex, Image } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Flex w="full" h="100vh" p="12px">
      <Flex w="calc(100% - 708px)" borderRadius="24px" overflow="hidden" pos="relative">
        <Image src="/images/BOI_LOGO.png" alt="" pos="absolute" top="32px" left="32px" w="181px" h="36px" zIndex={2} />
        <Image src="/images/loginbg.png" objectFit="cover" alt="" w="full" />
      </Flex>
      <Flex w="708px" justifyContent="center" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
}

export default withPublicLoader(AuthLayout);
