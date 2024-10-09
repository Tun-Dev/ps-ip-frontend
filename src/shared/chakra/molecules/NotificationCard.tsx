import { Center, Flex, Link, Text, Icon as ChakraIcon } from '@chakra-ui/react';
import React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { IconType } from 'react-icons';

interface NotificationCardProps {
  title: string;
  time: string;
  desc: string;
  Icon: IconType;
}

const NotificationCard = ({ title, time, desc, Icon }: NotificationCardProps) => {
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
          <Icon color="#6AB166" />
        </Center>
        <Flex flexDir="column" gap="2">
          <Text display="flex" alignItems="center" gap="2" color="grey.500" variant="Body2Semibold">
            {title}{' '}
            <Text as="span" color="grey.400" variant="Body3Semibold">
              {time}
            </Text>
          </Text>
          <Text variant="Body2Regular">
            {desc}
            {/* Enumeration from{' '}
            <Text as="span" variant="Body2Bold">
              Ikeja{' '}
            </Text>
            just concluded */}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end" color="primary.500">
        <Link>
          <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
            View details <ChakraIcon as={MdOpenInNew} />
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export { NotificationCard };
