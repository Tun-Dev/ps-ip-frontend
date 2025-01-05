import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { MdArrowOutward } from 'react-icons/md';

type OverviewCardProps = {
  title: string;
  icon: IconType;
  number: number | string;
  active?: boolean;
  stat?: number;
  iconColor?: string;
};

export const OverviewCard = ({ title, icon, number, active, iconColor = 'primary.500', stat }: OverviewCardProps) => {
  return (
    <Box
      padding="16px"
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="12px"
      border="1px solid"
      backgroundColor={active ? 'primary.500' : 'primary.50'}
      borderColor="grey.100"
      boxShadow="card"
      minW="265px"
    >
      <Flex mb="16px" align="center" gap="8px">
        <Flex
          align="center"
          justify="center"
          backgroundColor={active ? 'white' : 'primary.100'}
          padding="6px"
          borderRadius="10px"
          gap="8px"
          width="32px"
          height="32px"
        >
          <Icon as={icon} color={iconColor} boxSize="20px" />
        </Flex>
        <Text as="h2" variant="Body1Semibold" color={active ? 'white' : 'gray.500'}>
          {title}
        </Text>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Heading as="p" variant="Header2Bold" color={active ? 'white' : 'inherit'}>
          {number.toLocaleString()}
        </Heading>
        {stat && (
          <Box p="2px 4px" h="fit-content" bg="green/10" borderRadius="8px">
            <Text variant="Body2Semibold" color="green" display="flex" alignItems="center" gap=".25rem">
              <MdArrowOutward /> {stat}%
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
