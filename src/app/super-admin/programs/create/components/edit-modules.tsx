import { Box, Heading, Stack } from '@chakra-ui/react';

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
        <FormBuilder />
      </Box>
    </Stack>
  );
};

export default EditModules;
