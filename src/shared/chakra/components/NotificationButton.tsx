'use client';

import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { MdNotifications } from 'react-icons/md';

const NotificationButton = ({ count, url, active }: { count: number; url: string; active?: boolean }) => {
  return (
    <Flex
      as={Link}
      href={url}
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      h="36px"
      p="8px"
      borderRadius="6px"
      bg={active ? 'secondary.500' : ''}
      transition="all 0.3s ease-in-out"
    >
      <Flex alignItems="center" gap="15px">
        <MdNotifications size="20px" color="white" />
        <Text variant="Body2Semibold" color="white" transition="all 0.3s ease-in-out">
          Notifications
        </Text>
      </Flex>
      <Flex
        boxSize="15px"
        borderRadius="50%"
        bg={active ? '#FFFFFF33' : 'white'}
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s ease-in-out"
      >
        <Text variant="Body3Semibold" color={active ? 'white' : 'primary.500'}>
          {count}
        </Text>
      </Flex>
    </Flex>
  );
};

export { NotificationButton };
