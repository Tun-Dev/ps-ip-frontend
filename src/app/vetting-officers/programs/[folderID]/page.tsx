'use client';

import { Box, Flex, Grid, Image, SimpleGrid, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetVettingOfficersPrograms } from '@/hooks/useGetVettingOfficersPrograms';
import { GeepComponent } from '@/shared/chakra/components';
import { TablePagination } from '@/shared/chakra/components/table-pagination';

const PAGE_SIZE = 8;

const ProgramsPage = () => {
  const router = useRouter();
  const { folderID } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData } = useGetVettingOfficersPrograms({
    page,
    pageSize: PAGE_SIZE,
    folderId: folderID.toString(),
  });

  const programList = data?.body.programs ?? [];
  const programCount = data?.body.programs.length ?? 0;
  const totalPages = Math.ceil((data?.body.programs.length ?? 0) / PAGE_SIZE);
  const paginatedPrograms = programList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Stack pos="relative" overflow="hidden" spacing="6" justify="space-between" boxSize="full">
      {isLoading ? (
        <LoadingSkeleton />
      ) : programCount < 1 ? (
        <EmptyState />
      ) : (
        <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5">
          {paginatedPrograms.map((item, index) => (
            <GeepComponent
              key={index}
              name={item.name}
              logo={item.logo}
              programType={item.programType}
              count="Vetting"
              waveDirection={index % 2 === 0 ? 'bottom' : 'top'}
              onClick={() => router.push(`/vetting-officers/programs/${folderID}/${item.id}`)}
            />
          ))}
        </SimpleGrid>
      )}
      <TablePagination
        handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        handlePrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        handlePageChange={(pageNumber) => setPage(pageNumber)}
        isNextDisabled={page >= totalPages}
        isPrevDisabled={page <= 1}
        currentPage={page}
        totalPages={totalPages}
        isDisabled={isLoading || isPlaceholderData}
        display={totalPages > 1 ? 'flex' : 'none'}
      />
    </Stack>
  );
};

const EmptyState = () => (
  <Grid placeContent="center" textAlign="center" gap="2" color="grey.500" w="full" h="full">
    <Flex width="193px" height="182px" borderRadius="12px" bg="primary.200" p="16px 24px">
      <Image src="/icons/Blank.svg" alt="" />
    </Flex>
    <Text variant="Body2Semibold">No Programs Available.</Text>
  </Grid>
);

const LoadingSkeleton = () => (
  <SimpleGrid columns={{ base: 3, xl: 4 }} spacingY="6" spacingX="5">
    {Array.from({ length: 8 }, (_, index) => (
      <Stack
        key={index}
        pt="2"
        px="3"
        pb="5"
        border="1px solid"
        borderColor="grey.100"
        rounded="2xl"
        boxShadow="card"
        spacing="3"
      >
        <SkeletonText h="20px" noOfLines={1} maxW="5rem" />
        <Box>
          <SkeletonCircle boxSize="6rem" mx="auto" mb="2" />
          <SkeletonText h="40px" noOfLines={2} />
        </Box>
      </Stack>
    ))}
  </SimpleGrid>
);

export default ProgramsPage;
