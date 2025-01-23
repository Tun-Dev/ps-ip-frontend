'use client';

import { Divider, Flex, Grid, Icon, Image, SimpleGrid, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { useGetAggregatorProgramGroups } from '@/hooks/useGetAggregatorProgramGroups';
import { FolderCard } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { MdFolder, MdViewCarousel } from 'react-icons/md';

const ProgramsFolderPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAggregatorProgramGroups();

  const folderList = data?.body.programGroups ?? [];
  const folderCount = folderList.length ?? 0;
  const programCount = data?.body.programCount ?? 0;

  return (
    <Stack pos="relative" overflow="hidden" spacing="6" boxSize="full">
      <SimpleGrid columns={{ base: 3, xl: 4 }}>
        <OverviewCard minW="unset" title="Programs" number={isLoading ? '...' : programCount} icon={MdViewCarousel} />
      </SimpleGrid>
      <Divider borderColor="grey.200" opacity={1} />
      {isLoading ? (
        <LoadingSkeleton />
      ) : folderCount < 1 ? (
        <EmptyState />
      ) : (
        <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5">
          {folderList.map((item) => (
            <FolderCard
              key={item.id}
              name={item.name}
              onClick={() => router.push(`/aggregators/programs/${item.id}`)}
              count={item.programCount ?? 0}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

const LoadingSkeleton = () => (
  <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5">
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
