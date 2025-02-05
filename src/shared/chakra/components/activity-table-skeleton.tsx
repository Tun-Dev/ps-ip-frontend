import { Box, Flex, SimpleGrid, Skeleton } from '@chakra-ui/react';

export const ActivityTableSkeleton = () => {
  return (
    <Flex gap="4px" flexDirection="column" padding="10px" borderRadius="12px" boxShadow="card" bgColor="primary.30">
      <Flex justifyContent="space-between" alignItems="center" h="5">
        <Skeleton height="2" width="150px" />
        <Skeleton height="2" width="100px" />
      </Flex>
      <Box mt="4">
        {Array.from(Array(5).keys()).map((index) => (
          <SimpleGrid
            key={index}
            h="7"
            gap="4"
            columns={3}
            placeItems="center"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Skeleton h="2" w="full" />
            <Skeleton h="2" w="full" />
            <Skeleton h="2" w="full" />
          </SimpleGrid>
        ))}
      </Box>
    </Flex>
  );
};
