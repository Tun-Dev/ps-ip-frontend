import { useVettingModal } from '@/providers/vetting-modal-provider';
import { Box, Grid, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

export function ProfileTab() {
  const { profile } = useVettingModal();

  if (profile.length < 1)
    return (
      <Text variant="Body2Semibold" textAlign="center">
        No profile found
      </Text>
    );

  return (
    <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem">
      {profile.map((answer, index) => {
        const value = answer.key === 'Date of Birth' ? format(parseISO(answer.value), 'dd/MM/yyyy') : answer.value;
        return (
          <Box key={index}>
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              {answer.key}
            </Text>
            <Text variant="Body1Regular">{value}</Text>
          </Box>
        );
      })}
    </Grid>
  );
}
