'use client';

import { Box, Button, Heading, SimpleGrid, Stack, StackProps } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';

type Props = {
  step: number;
} & StackProps;

const SelectModules = ({ step, ...props }: Props) => {
  const [modules, setModules] = useState(ModulesData);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Stack py="6" w="full" spacing="8.75rem" {...props}>
      <Box>
        <Heading variant="Body2Semibold" color="grey.500" mb="4">
          Selected Modules
        </Heading>
        <SimpleGrid columns={3} spacingX="12" spacingY="8">
          {modules.map((item) => (
            <ModuleCard
              key={item.id}
              {...item}
              isDisabled={false}
              status="Edit"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('step', '2');
                params.set('moduleId', item.id.toString());
                router.push(`${pathname}?${params.toString()}`);
              }}
              onRemove={() => setModules((prev) => prev.filter((module) => module.id !== item.id))}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Button
        as={Link}
        href={`/super-admin/programs/create?step=${step + 1}`}
        variant="primary"
        size="default"
        alignSelf="end"
        w="full"
        maxW="15.125rem"
      >
        Next
      </Button>
    </Stack>
  );
};

export default SelectModules;
