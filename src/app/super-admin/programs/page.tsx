'use client';

import { Box, Grid, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useState } from 'react';

import { GeepComponent, ModuleCard } from '@/components';

const PROGRAMS = [
  { id: 1, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 2, name: 'INVESMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 3, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 4, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
  { id: 5, name: 'Government Enterprise And Empowerment Programme', logo: 'GEEP LOGO', count: 5 },
  { id: 6, name: 'INVESMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM', logo: 'IDICE LOGO', count: 4 },
  { id: 7, name: 'ALIKO DANGOTE FOUNDATION FUND', logo: 'ADFF LOGO', count: 3 },
  { id: 8, name: 'CBN Backward Integration Fund', logo: 'CBNIF LOGO', count: 5 },
];

const ProgramsPage = () => {
  const router = useRouter();
  const [programs, setPrograms] = useState(PROGRAMS);
  const [selectedId, setSelectedId] = useState(0);
  const selectedProgram = programs.find((program) => program.id === selectedId);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.stopPropagation();
    router.push(`/super-admin/programs/${itemId}`);
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
    <Grid templateColumns="1fr auto">
      <SimpleGrid columns={!!selectedId ? 3 : 4} spacingY="6" spacingX="5" px="6" py="5">
        {programs.map((item) => (
          <GeepComponent
            key={item.id}
            name={item.name}
            count={item.count}
            waveDirection={item.id % 2 === 0 ? 'bottom' : 'top'}
            bgColor={selectedId === item.id ? 'primary.50' : 'white'}
            onClick={() => handleSelect(item.id)}
            onEdit={(e) => handleEdit(e, item.id)}
            onDelete={(e) => handleDelete(e, item.id)}
          />
        ))}
      </SimpleGrid>
      {selectedProgram && (
        <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%">
          <Heading variant="Body2Semibold" color="grey.400" mb="2">
            Modules - ({selectedProgram.count})
          </Heading>
          <Stack spacing="3" minW="263px">
            <ModuleCard />
            {/* Module Cards go here */}
          </Stack>
        </Box>
      )}
    </Grid>
  );
};

export default ProgramsPage;
