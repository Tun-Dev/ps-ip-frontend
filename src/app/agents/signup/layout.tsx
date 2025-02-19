import { Box, Image } from '@chakra-ui/react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Box bg={'primary.500'} padding={'24px 32px'}>
        <Image src="/images/boi-white.png" alt="" h="52px" w="197px" />
      </Box>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
