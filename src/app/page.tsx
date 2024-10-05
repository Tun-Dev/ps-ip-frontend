import { Box, Container, Stack, Text } from '@chakra-ui/react';

import { FormBuilder } from '@/components/form-builder';

export default function Home() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Text variant="Body1Bold">Home Page</Text>
          <FormBuilder />
        </Stack>
      </Container>
    </Box>
  );
}
