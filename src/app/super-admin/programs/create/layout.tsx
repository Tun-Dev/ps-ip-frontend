'use client';

import { Box, Button, Flex, Icon, Input, Stack, Text } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ModuleCard } from '@/components';
import { ModulesData } from '@/utils';
import { MultiStepHeader } from '@/shared';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';

const CreateProgramLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep((prev: number) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep((prev: number) => prev - 1);
    }
  };

  return (
    <Flex h="100%" w="full">
      <Box flex="1 1 0%">
        <Flex pt="20px" gap="24px" flexDir="column">
          <MultiStepHeader activeStep={activeStep} />
          <Flex>
            <Flex alignItems="center" gap="8px">
              <Input placeholder="Program Name" border="1px dashed" borderColor="grey.300" isReadOnly />
              <Icon as={MdEdit} aria-label={`Edit`} color="primary.500" boxSize="3" />
            </Flex>
          </Flex>
        </Flex>
        <Box minH="600px">{children}</Box>

        <Flex gap="16px" justifyContent="flex-end">
          {activeStep > 1 && (
            <Button variant="secondary" w="242px" onClick={handlePreviousStep}>
              Prev
            </Button>
          )}
          <Button variant="primary" w="242px" onClick={handleNextStep}>
            Next
          </Button>
        </Flex>
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
