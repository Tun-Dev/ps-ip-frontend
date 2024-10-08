import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const ProgramsLayout = ({ children }: PropsWithChildren) => {
  return <Flex>{children}</Flex>;
};

export default ProgramsLayout;
