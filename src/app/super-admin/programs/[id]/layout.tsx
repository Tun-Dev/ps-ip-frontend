import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const ProgramIDLayout = ({ children }: PropsWithChildren) => {
  return <Flex w="full">{children}</Flex>;
};

export default ProgramIDLayout;
