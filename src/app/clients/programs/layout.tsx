import { Stack } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

import ProgramsBreadcrumbs from './programs-breadcrumbs';

const ModulesLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack overflow="hidden" spacing="6" boxSize="full">
      <ProgramsBreadcrumbs />
      {children}
    </Stack>
  );
};

export default ModulesLayout;
