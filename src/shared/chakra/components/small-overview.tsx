import { Box, BoxProps, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OverviewCardProps = {
  title: string;
  icon: IconType;
  number: number | string;
  stat?: number;
  iconColor?: string;
} & BoxProps;

export const SmallOverviewCard = ({ title, icon, number, iconColor = 'primary.500', ...props }: OverviewCardProps) => {
  return (
    <Box
      padding="8px 12px"
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="12px"
      border="1px solid"
      backgroundColor="primary.100"
      borderColor="grey.100"
      boxShadow="card"
      minW="258px"
      gap="8px"
      {...props}
    >
      <Flex align="center" gap="8px">
        <Flex
          align="center"
          justify="center"
          backgroundColor={'primary.200'}
          padding="6px"
          borderRadius="10px"
          gap="8px"
          width="26px"
          height="26px"
        >
          <Icon as={icon} color={iconColor} boxSize="14px" />
        </Flex>
        <Text as="h2" variant="Body2Semibold" color={'grey.500'}>
          {title}
        </Text>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Heading as="p" variant="Header1Bold" color={'inherit'}>
          {number.toLocaleString()}
        </Heading>
        {/* {stat && (
          <Box p="2px 4px" h="fit-content" bg="green/10" borderRadius="8px">
            <Text variant="Body2Semibold" color="green" display="flex" alignItems="center" gap=".25rem">
              <MdArrowOutward /> {stat}%
            </Text>
          </Box>
        )} */}
      </Flex>
    </Box>
  );
};
