'use client';

import { useGetGroup } from '@/hooks/useGetGroup';
import { FolderCard } from '@/shared';
import { Flex, Grid, Icon, Image, SimpleGrid, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdFolder } from 'react-icons/md';
import ProgramsBreadcrumbs from './programs-breadcrumbs';

const ProgramsFolderPage = () => {
  const router = useRouter();
  const { data: groups, isPending } = useGetGroup({ page: 1, pageSize: 10 });

  const data = groups?.body.data ?? [];
  return (
    <>
      <Stack pos="relative" overflow="hidden" p="6" spacing="0" w="full" h="100%">
        <Flex
          h="72px"
          py="24px"
          borderBottom="1px solid"
          borderBottomColor="grey.200"
          justifyContent="space-between"
          alignItems="center"
        >
          <ProgramsBreadcrumbs />
        </Flex>
        {isPending ? (
          <LoadingSkeleton />
        ) : data.length < 1 ? (
          <EmptyState />
        ) : (
          <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5" mt="20px">
            {data?.map((item, index) => (
              <FolderCard
                key={index}
                name={item.name}
                onClick={() => router.push(`/clients/programs/${item.id}`)}
                count={item.programCount ?? 0}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </>
  );
};

const LoadingSkeleton = () => (
  <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5" mt="20px">
    {Array.from({ length: 8 }, (_, index) => (
      <Flex key={index} p="16px" borderRadius="16px" bg="primary.100" flexDir="column" gap="12px">
        <Flex width="60px" height="56px" bg="primary.200" borderRadius="8px" align="center" justify="center">
          <Icon as={MdFolder} color="primary.500" boxSize="48px" />
        </Flex>
        <Flex flexDir="column" gap="6px">
          <SkeletonText h="20px" noOfLines={2} />
        </Flex>
      </Flex>
    ))}
  </SimpleGrid>
);

const EmptyState = () => (
  <Grid placeContent="center" textAlign="center" gap="2" color="grey.500" w="full" h="full">
    <Flex width="193px" height="182px" borderRadius="12px" bg="primary.200" p="16px 24px">
      <Image src="/icons/Blank.svg" alt="" />
    </Flex>
    <Text variant="Body2Semibold">No Folders Available.</Text>
    <Text variant="Body2Semibold">Please create a folder.</Text>
  </Grid>
);

export default ProgramsFolderPage;
