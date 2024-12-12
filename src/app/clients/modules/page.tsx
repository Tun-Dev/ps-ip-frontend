'use client';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { ModuleCard } from '@/shared/chakra/components';
import { ALL_MODULES } from '@/utils';

const ModulesPage = () => {
  const router = useRouter();

  return (
    <Box py="4">
      <Heading variant="Body2Semibold" color="grey.400" mb="3">
        Modules
      </Heading>
      <SimpleGrid columns={4} spacingX="6" spacingY="5">
        {ALL_MODULES.map((item, index) => (
          <ModuleCard
            key={item.id}
            module={item}
            status="In progress"
            number={index + 1}
            onClick={() => router.push(`/clients/modules/${item.id}/${item.name.toLowerCase()}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ModulesPage;
