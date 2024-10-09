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
      minW="265px"
      padding="16px"
      borderRadius="12px"
      border="1px solid"
      backgroundColor={active ? 'primary.50' : 'white'}
      borderColor="grey.100"
      boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
    >
      <Flex mb="16px" align="center" gap="8px">
        <Box backgroundColor="gray.100" padding="6px" borderRadius="10px" gap="8px" width="32px" height="32px">
          <Icon as={icon} boxSize="1.25rem" color="primary.600" />
        </Box>
        <Text as="h2" variant="Body1Semibold" color="grey.500">
          {title}
        </Text>
      </Flex>
      <Heading as="p" variant="Header2Bold">
        {number}
      </Heading>
    </Box>
  );
};
