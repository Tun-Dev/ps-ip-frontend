import { Flex } from '@chakra-ui/react';

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" border="1px solid red" minH="100vh" bg="greenBG" p="24px" gap="24px">
      <Flex>Sidebar</Flex>
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default SuperAdminLayout;
