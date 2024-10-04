import Sidebar from './components/Sidebar';
import { Flex } from '@chakra-ui/react';

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" minH="100vh" bg="greenBG" p="24px" gap="24px" position="relative">
      <Flex pos="fixed" w="208px" top="24px" bottom="24px" left="24px">
        <Sidebar />
      </Flex>
      <Flex w="calc(100% - 232px)" borderRadius="12px" ml="auto" bg="white" p="24px" boxShadow="card">
        {children}
      </Flex>
    </Flex>
  );
};

export default SuperAdminLayout;
