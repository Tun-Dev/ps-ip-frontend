import { useVettingModal } from '@/providers/vetting-modal-provider';
import { Box, Grid, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { parsePhoneNumber } from 'libphonenumber-js/min';

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
        const value = formatValue(answer.value, answer.key);
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

const formatValue = (value: string, type: string) => {
  if (type === 'Date of Birth') return format(parseISO(value), 'dd/MM/yyyy');
  if (type === 'Phone Number') return '0' + parsePhoneNumber(value).nationalNumber;
  return value;
};
