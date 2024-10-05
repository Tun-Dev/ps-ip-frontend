import { Button, Flex, Image, Text, Input } from '@chakra-ui/react';

const SignInPage = () => {
  return (
    <Flex w="full" h="100vh" p="12px">
      <Flex w="calc(100% - 708px)" borderRadius="24px" overflow="hidden" pos="relative">
        <Image src="/images/BOI_LOGO.png" alt="" pos="absolute" top="32px" left="32px" w="181px" h="36px" zIndex={2} />
        <Image src="/images/loginbg.png" objectFit="cover" alt="" w="full" />
      </Flex>
      <Flex w="708px" justifyContent="center" alignItems="center">
        <Flex flexDir="column" w="480px" gap="24px">
          <Flex flexDir="column" gap="8px">
            <Text variant="Header2Bold">Sign in</Text>
            <Text variant="Body1Regular" color="grey.500">
              Welcome back. Please input your detail.
            </Text>
          </Flex>

          <Flex flexDir="column" gap="16px">
            <Flex flexDir="column" gap="8px">
              <Text variant="Body2Semibold" color="grey.500">
                Username
              </Text>
              <Input variant="primary" placeholder="Input username" />
            </Flex>
            <Flex flexDir="column" gap="8px">
              <Text variant="Body2Semibold" color="grey.500">
                Password
              </Text>
              <Input variant="primary" placeholder="Input password" />
            </Flex>
          </Flex>

          <Button variant="primary" w="full" h="48px" mt="12px">
            Sign in
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
