"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";

type Props = { children: ReactNode };

export default function ThemedChakraProvider({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
