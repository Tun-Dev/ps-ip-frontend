
import { Box, Text, Icon, Heading, Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type OverviewCardProps = {
  title: string;
  icon: IconType;
  number: number;
};

export const OverviewCard = ({ title, icon, number }: OverviewCardProps) => {
  return (
    <Box     
      maxW="max-content"      
      padding="16px"      
      borderRadius="12px"
      border="1px solid"
      backgroundColor="white"
      borderColor="grey.100"
      boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
    >
        <Flex mb='16px' align='center' gap="8px">
        <Icon as={icon} boxSize="1.25rem" color="primary.600" />
        <Text as='h2' variant="Body1Semibold" color="grey.500">{title }</Text>              
        </Flex>
        <Heading as="p" variant="Header2Bold">{number}</Heading>
    </Box>
  )
}