'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import theme from './theme';

type Props = { children: ReactNode };

export default function ThemedChakraProvider({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right', isClosable: true } }}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
