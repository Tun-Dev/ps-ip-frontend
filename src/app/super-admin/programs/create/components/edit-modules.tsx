import { Box, Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';

import { FormBuilder } from '@/components/form-builder';

type Props = {
  currentModule: string;
};

const EditModules = ({ currentModule }: Props) => {
  return (
    <Stack py="6" maxW="52.9375rem" spacing="2.94rem">
      <Box>
        <Heading variant="Body2Semibold" color="primary.500" mb="4" textTransform="capitalize">
          <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
            1
          </Box>{' '}
          {currentModule}
        </Heading>
        <Stack spacing="2.94rem">
          <FormBuilder />
          <ButtonGroup size="default" spacing="4" alignSelf="end" w="full" maxW="31.25rem">
            <Button as={Link} href="/super-admin/programs/create" type="button" variant="secondary" flex="1">
              Back
            </Button>
            <Button type="submit" variant="primary" flex="1">
              Next
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Stack>
  );
};

export default EditModules;
