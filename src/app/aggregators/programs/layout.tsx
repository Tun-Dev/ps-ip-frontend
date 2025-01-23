'use client';

import { Stack } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

import ProgramsBreadcrumbs from './programs-breadcrumbs';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack overflow="hidden" spacing="8" boxSize="full">
      <ProgramsBreadcrumbs />
      {children}
    </Stack>
  );
};

export default ProgramsLayout;
