import { Box, type BoxProps, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { MdArrowOutward } from 'react-icons/md';

type OverviewCardProps = {
  title: string;
  icon: IconType;
  number: number | string;
  active?: boolean;
  stat?: number;
  iconColor?: string;
  size?: 'small' | 'large';
  colorScheme?: 'red' | 'green';
} & BoxProps;

export const OverviewCard = ({
  title,
  icon,
  number,
  active,
  stat,
  colorScheme,
  size = 'large',
  iconColor = size === 'small' ? 'primary.600' : 'primary.500',
  ...props
}: OverviewCardProps) => {
  return (
    <Stack
      padding={size === 'small' ? '0.5rem 0.75rem' : '1rem'}
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="0.75rem"
      backgroundColor={active ? 'primary.500' : 'primary.100'}
      border="1px solid"
      borderColor="grey.100"
      boxShadow="card"
      spacing={size === 'small' ? '0.5rem' : '1rem'}
      {...props}
    >
      <Flex align="center" gap="0.5rem">
        <Flex
          align="center"
          justify="center"
          backgroundColor={
            active ? 'white' : colorScheme ? `${colorScheme}/10` : size === 'small' ? 'primary.150' : 'primary.200'
          }
          padding={size === 'small' ? '0' : '6px'}
          borderRadius="0.625rem"
          boxSize={size === 'small' ? '1.625rem' : '2rem'}
        >
          <Icon
            as={icon}
            color={colorScheme ? `${colorScheme}/50` : iconColor}
            boxSize={size === 'small' ? '0.875rem' : '1.25rem'}
          />
        </Flex>
        <Text
          as="h2"
          variant={size === 'small' ? 'Body2Semibold' : 'Body1Semibold'}
          color={active ? 'white' : 'grey.500'}
        >
          {title}
        </Text>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Heading
          as="p"
          variant={size === 'small' ? 'Body1Bold' : 'Header2Bold'}
          color={active ? 'white' : colorScheme || 'text'}
        >
          {number.toLocaleString()}
        </Heading>
        {stat && (
          <Box p="2px 4px" h="fit-content" bg="green/10" borderRadius="8px">
            <Text
              variant={size === 'small' ? 'Body1Semibold' : 'Body2Semibold'}
              color="green"
              display="flex"
              alignItems="center"
              gap=".25rem"
            >
              <MdArrowOutward /> {stat}%
            </Text>
          </Box>
        )}
      </Flex>
    </Stack>
  );
};
