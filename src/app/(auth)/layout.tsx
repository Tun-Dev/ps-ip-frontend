'use client';

import { withPublicLoader } from '@/shared/chakra/components/public-route-loader';
import { Flex, Image } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Flex w="full" h="100vh" p="12px" justifyContent="center" alignItems="center" bg="primary.500" pos="relative">
      <Image src="/images/boi-white.png" alt="" pos="absolute" top="32px" left="32px" w="197px" h="52px" zIndex={2} />

      <Image src="/images/loginbg2.png" pos="absolute" objectFit="cover" alt="" w="full" h="100%" top={0} left={0} />

      <Flex
        w="708px"
        justifyContent="center"
        alignItems="center"
        border="1px solid black"
        bg="white"
        zIndex={1}
        borderRadius="32px"
        h="78%"
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default withPublicLoader(AuthLayout);
