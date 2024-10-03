import { Center, Flex, Icon, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { MdLocalShipping, MdOpenInNew } from 'react-icons/md';

const NotificationCard = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      h="7rem"
      minW="22.375rem"
      boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
      borderRadius="12px"
      padding="10px 12px"
    >
      <Flex gap="4">
        <Center h="2rem" w="2rem" bg="grey.100" padding="8px" borderRadius="10px">
          <Icon as={MdLocalShipping} color="primary.600" />
        </Center>
        <Flex flexDir="column" gap="2">
          <Text display="flex" alignItems="center" gap="2" color="grey.500" variant="Body2Semibold">
            Disbursement update{' '}
            <Text as="span" color="grey.400" variant="Body3Semibold">
              1hr ago
            </Text>
          </Text>
          <Text variant="Body2Regular">
            Enumeration from{' '}
            <Text as="span" variant="Body2Bold">
              Ikeja{' '}
            </Text>
            just concluded
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end" color="primary.500">
        <Link>
          <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
            View details <Icon as={MdOpenInNew} />
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export { NotificationCard };
