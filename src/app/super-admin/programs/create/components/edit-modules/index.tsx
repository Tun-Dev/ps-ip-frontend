import { Box, Button, ButtonGroup, Heading, Stack, StackProps } from '@chakra-ui/react';
import Link from 'next/link';

import { ModulesData } from '@/utils';
import { ApplicationForm } from './application-form';
import { EnumerationForm } from './enumeration-form';
import { VettingForm } from './vetting-form';

type Props = {
  step: number;
  moduleId: number;
} & StackProps;

const EditModules = ({ step, moduleId, ...props }: Props) => {
  const moduleName = ModulesData.find((module) => module.id === moduleId)?.name;
  return (
    <Stack py="6" spacing="2.94rem" minH="31.375rem" {...props}>
      <Box flex="1">
        <Heading variant="Body2Semibold" color="primary.500" mb="6" textTransform="capitalize">
          <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
            {moduleId}
          </Box>{' '}
          {moduleName}
        </Heading>
        <ApplicationForm display={moduleId === 1 ? 'flex' : 'none'} />
        <EnumerationForm display={moduleId === 2 ? 'flex' : 'none'} />
        <VettingForm display={moduleId === 4 ? 'flex' : 'none'} />
      </Box>
      <ButtonGroup size="default" spacing="4" alignSelf="end" w="full" maxW="31.25rem">
        <Button as={Link} href={`/super-admin/programs/create?step=${step - 1}`} variant="secondary" flex="1">
          Back
        </Button>
        <Button as={Link} href={`/super-admin/programs/create?step=${step + 1}`} variant="primary" flex="1">
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default EditModules;
