import { Flex, Spinner } from '@chakra-ui/react';

function Loading() {
  return (
    <Flex h="100dvh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
}

export default Loading;
