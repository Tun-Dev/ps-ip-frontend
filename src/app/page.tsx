'use client';

// import { Box, Container, Stack, Text } from '@chakra-ui/react';
// import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signin');

  return null;

  // return (
  //   <Box as="main">
  //     <Container maxW="container.xl" minH="100dvh" py="4">
  //       <Stack spacing="10">
  //         <Text variant="Body1Bold">Home Page</Text>
  //       </Stack>
  //     </Container>
  //   </Box>
  // );
}
