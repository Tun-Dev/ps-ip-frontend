'use client';

import { Box, Grid, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useState } from 'react';

import { GeepComponent, ModuleCard } from '@/components';
import { ALL_MODULES, ProgramsData } from '@/utils';

const ProgramsPage = () => {
  const router = useRouter();
  const [programs, setPrograms] = useState(ProgramsData);
  const [selectedId, setSelectedId] = useState(0);
  const selectedProgram = programs.find((program) => program.id === selectedId);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.stopPropagation();
    router.push(`/super-admin/programs/${itemId}/application`);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.stopPropagation();
    if (selectedId === itemId) setSelectedId(0);
    setPrograms((programs) => programs.filter((program) => program.id !== itemId));
  };

  const handleSelect = (itemId: number) => {
    setSelectedId((id) => (id === itemId ? 0 : itemId));
  };

  return (
    <Grid templateColumns="1fr auto" alignItems="start" w="full">
      <SimpleGrid columns={!!selectedId ? 3 : 4} spacingY="6" spacingX="5" py="5">
        {programs.map((item) => (
          <GeepComponent
            key={item.id}
            name={item.name}
            count={item.count}
            waveDirection={item.id % 2 === 0 ? 'bottom' : 'top'}
            isActive={selectedId === item.id}
            onClick={() => handleSelect(item.id)}
            onEdit={(e) => handleEdit(e, item.id)}
            onDelete={(e) => handleDelete(e, item.id)}
          />
        ))}
      </SimpleGrid>
      {selectedProgram && (
        <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5">
          <Heading variant="Body2Semibold" color="grey.400" mb="2">
            Modules - ({selectedProgram.count})
          </Heading>
          <Stack spacing="3" minW="263px">
            {ALL_MODULES.map((item, index) => (
              <ModuleCard
                key={item.id}
                module={item}
                status="In progress"
                number={index + 1}
                onClick={() => router.push(`/super-admin/programs/${item.id}/${item.name.toLowerCase()}`)}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Grid>
  );
};

export default ProgramsPage;
