import { Box, Container, Stack, Text } from '@chakra-ui/react';
// import { OverviewCard } from '@/components/overview';
// import colors from "@/shared/chakra/colors";

export default function Home() {
  return (
    <Box as="main">
      <Container maxW="container.xl" minH="100dvh" py="4">
        <Stack spacing="10">
          <Text variant="Body1Bold">Home Page</Text>
        </Stack>
      </Container>
    </Box>
  );
}
