import { Flex, Skeleton } from '@chakra-ui/react';

export const NotificationCardSkeleton = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      h="7rem"
      boxShadow="card"
      borderRadius="12px"
      padding="10px 12px"
      bg="primary.30"
    >
      <Flex gap="4">
        <Skeleton boxSize="8" borderRadius="10px" />
        <Flex direction="column" gap="2" flex="1">
          <Skeleton h="2" w="120px" />
          <Skeleton h="2" w="full" />
        </Flex>
      </Flex>
      <Skeleton h="2" w="60px" ml="auto" />
    </Flex>
  );
};
