import { Box, Text, Icon, Heading, Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OverviewCardProps = {
  title: string;
  icon: IconType;
  number: number;
  active?: boolean;
};

export const OverviewCard = ({ title, icon, number, active }: OverviewCardProps) => {
  return (
    <Box
      padding="16px"
      borderRadius="12px"
      border="1px solid"
      backgroundColor={active ? 'primary.50' : 'white'}
      borderColor="grey.100"
      boxShadow="card"
    >
      <Flex mb="16px" align="center" gap="8px">
        <Box
          backgroundColor={active ? 'primary.100' : 'grey.100'}
          padding="6px"
          borderRadius="10px"
          gap="8px"
          width="32px"
          height="32px"
        >
          <Icon as={icon} boxSize="1.25rem" color="primary.600" />
        </Box>
        <Text as="h2" variant="Body1Semibold" color="grey.500">
          {title}
        </Text>
      </Flex>
      <Heading as="p" variant="Header2Bold">
        {number.toLocaleString()}
      </Heading>
    </Box>
  );
};
