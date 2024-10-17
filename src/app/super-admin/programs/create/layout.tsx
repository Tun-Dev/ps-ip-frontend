'use client';

import { Box, Flex, Icon, Input, Stack, Text } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';
import { MultiStepHeader } from '@/shared';
import { MdEdit } from 'react-icons/md';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Flex h="100%" w="full">
      <Box flex="1 1 0%">
        <Flex border="1px solid red" pt="20px" gap="24px" flexDir="column">
          <MultiStepHeader />
          <Flex>
            <Flex alignItems="center" gap="8px">
              <Input placeholder="Program Name" border="1px dashed" borderColor="grey.300" isReadOnly />
              <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />
            </Flex>
          </Flex>
        </Flex>
        <Box>{children}</Box>
      </Box>

      <Box py="3" pl="5" borderLeft="1px solid" borderColor="grey.200" h="100%" ml="5">
        <Text variant="Body2Semibold" color="grey.400" mb="2">
          Modules
        </Text>
        <Stack spacing="3" minW="263px">
          {ModulesData.map((item) => (
            <ModuleCard
              key={item.id}
              {...item}
              onClick={() => {
                const step = searchParams.get('step') || '1';
                if (step === '1') return;
                const params = new URLSearchParams(searchParams.toString());
                params.set('moduleId', item.id.toString());
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default CreateProgramLayout;
