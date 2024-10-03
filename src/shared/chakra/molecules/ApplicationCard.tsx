import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdArrowForward, MdCheckCircle, MdRefresh } from 'react-icons/md';

interface ApplicationCard {
  status: 'Completed' | 'Processing' | 'Pending';
  title: 'Application' | 'Enumeration' | 'Nomination' | 'Verification' | 'Vetting' | 'Whitelisting' | 'Disbursement';
  number: number;
}

const ApplicationCard = ({ status, title, number }: ApplicationCard) => {
  const getBgColour = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'primary.50';
        break;
      case 'Processing':
        return 'primary.50';
        break;
      default:
        return 'grey.100';
        break;
    }
  };
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      height="9.75rem"
      padding="12px"
      borderRadius="16px"
      bg={getBgColour(status)}
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap="2">
          <Text
            variant="Body2Semibold"
            color={status === 'Pending' ? 'white' : 'primary.500'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={status === 'Pending' ? 'grey.400' : 'primary.100'}
            height="20px"
            width="20px"
            borderRadius="50%"
            padding="4px"
          >
            {number}
          </Text>
          <Text variant="Body2Semibold" color={status === 'Pending' ? 'grey.400' : 'primary.500'}>
            {title}
          </Text>
        </Flex>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={status === 'Pending' ? 'grey.400' : 'primary.100'}
          height="20px"
          width="20px"
          borderRadius="50%"
          padding="4px"
        >
          <Icon as={MdArrowForward} color={status === 'Pending' ? 'white' : 'primary.500'} />
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" gap="2">
        <Text variant="Body3Semibold" color={status === 'Pending' ? 'grey.400' : 'primary.500'}>
          {status}
        </Text>
        <Icon
          as={status === 'Pending' ? MdRefresh : status === 'Completed' ? MdCheckCircle : MdRefresh}
          color={status === 'Pending' ? 'grey.400' : 'primary.500'}
        />
      </Flex>
    </Flex>
  );
};

export { ApplicationCard };
