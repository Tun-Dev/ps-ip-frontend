'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';

import { useGetPrograms } from '@/hooks/useGetPrograms';
import { GeepComponent, ModuleProgressCard } from '@/shared/chakra/components';
import { Program, ProgramModules } from '@/types';
// import { useDeleteProgram } from '@/hooks/useDeleteProgram';
// import { ALL_MODULES } from '@/utils';

const ProgramsPage = () => {
  const [selectedId, setSelectedId] = useState('');

  const { data: programs, isLoading } = useGetPrograms({ page: 1, pageSize: 10 });
  const programCount = programs?.body.total ?? 0;
  const programList = programs?.body.data ?? [];

  const selectedProgram = programList.find((program) => program.id === selectedId);

  if (isLoading)
    return (
      <Box p="6" w="full">
        <SimpleGrid columns={4} spacingY="6" spacingX="5">
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
      </Box>
    );

  if (programCount < 1)
    return (
      <Grid placeContent="center" textAlign="center" gap="2" color="grey.500" w="full">
        <Text variant="Body2Semibold">No Programs Available.</Text>
        <Text variant="Body2Semibold">Please create a new program.</Text>
      </Grid>
    );

  return (
    <Box pos="relative" overflow="hidden" p="6">
      <SimpleGrid columns={4} spacingY="6" spacingX="5">
        {programList.map((item, index) => (
          <GeepComponent
            key={index}
            name={item.name}
            logo={item.logo}
            count={Number(item.programModules.length)}
            waveDirection={Number(item.id) % 2 === 0 ? 'bottom' : 'top'}
            isActive={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
          />
        ))}
      </SimpleGrid>
      <AnimatePresence>
        {selectedProgram && <ProgramDrawer program={selectedProgram} onClose={() => setSelectedId('')} />}
      </AnimatePresence>
    </Box>
  );
};

const ProgramDrawer = ({ program, onClose }: { program: Program; onClose: () => void }) => {
  const router = useRouter();

  // const { mutate: deleteProgram, isSuccess } = useDeleteProgram();

  const handleEdit = (itemId: string) => {
    router.push(`/super-admin/programs/${itemId}/application`);
  };

  const handleDelete = (itemId: string) => {
    console.log(itemId);
    // deleteProgram(itemId);
  };

  const transition: Transition = { duration: 0.5, ease: 'easeInOut' };

  // console.log(program);

  // console.log(isSuccess);

  const modules = reorderDescending(program.programModules);

  const moduleUrl = findFirstActiveObject(modules);

  console.log(moduleUrl);

  return (
    <Stack
      spacing="0"
      as={motion.div}
      pos="absolute"
      inset="0"
      w="full"
      zIndex={10}
      initial={{ transform: 'translateY(100%)' }}
      exit={{ transform: 'translateY(100%)', transition }}
      animate={{ transform: program ? 'translateY(0%)' : 'translateY(100%)', transition }}
    >
      <Box flex="1" onClick={onClose} />
      <Flex
        p="16px"
        boxShadow="0px -2px 4px -1px #0330000A, 0px -4px 6px -1px #0330000A"
        flexDir="column"
        gap="20px"
        bgColor="white"
      >
        <Flex gap="16px">
          <Flex gap="16px" alignItems="center" w="72%">
            <Avatar name={program.name} src={program.logo} bg="primary.100" boxSize="99px" color="grey.500" />

            <Flex
              flexDir="column"
              p="12px"
              border="1px solid"
              borderColor="grey.200"
              borderRadius="8px"
              gap="4px"
              w="full"
              h="full"
            >
              <Text variant="Body2Semibold" color="primary.500">
                {program.name}
              </Text>
              <Text variant="Body2Regular" color="text">
                {program.description}
              </Text>
            </Flex>
          </Flex>
          <Flex w="28%" flexDir="column" gap="32px" justifyContent="center">
            <Button
              variant="primary"
              h="48px"
              w="full"
              onClick={() => router.push(`/super-admin/programs/${program.id}/${moduleUrl?.name.toLowerCase()}`)}
            >
              View More
              <MdArrowRightAlt style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </Button>
            <Flex gap="16px">
              <Button fontSize="10px" w="full" variant="cancel" onClick={() => handleDelete(program.id)}>
                Delete Program
              </Button>
              <Button fontSize="10px" w="full" variant="accept" onClick={() => handleEdit(program.id)}>
                Edit Program
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexWrap="wrap" gap="16px">
          {modules.map((item, index) => (
            <ModuleProgressCard
              key={index}
              status={item.isCompleted ? 'Completed' : item.isActive && !item.isCompleted ? 'In Progress' : 'Pending'}
              name={item.name}
              number={item.order}
            />
          ))}
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ProgramsPage;

function reorderDescending(items: ProgramModules[]): ProgramModules[] {
  return items.sort((a, b) => a.order - b.order);
}

function findFirstActiveObject(items: ProgramModules[]) {
  return items.find((item) => item.isActive && !item.isCompleted);
}
