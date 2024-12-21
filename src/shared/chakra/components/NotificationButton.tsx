'use client';

import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { MdNotifications } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const NotificationButton = ({ count, url, active }: { count: number; url: string; active?: boolean }) => {
  const router = useRouter();
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      h="36px"
      p="8px"
      borderRadius="6px"
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          window.open(url, '_blank');
        } else {
          router.push(url);
        }
      }}
      bg={active ? 'secondary.500' : ''}
      transition="all 0.3s ease-in-out"
    >
      <Flex alignItems="center" gap="15px">
        <MdNotifications size="20px" color={active ? 'white' : '#077D00'} />
        <Text variant="Body2Semibold" color={active ? 'white' : '#077D00'} transition="all 0.3s ease-in-out">
          Notifications
        </Text>
      </Flex>
      <Flex
        boxSize="15px"
        borderRadius="50%"
        bg={active ? '#FFFFFF33' : '#077D00'}
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s ease-in-out"
      >
        <Text variant="Body3Semibold" color="white">
          {count}
        </Text>
      </Flex>
    </Flex>
  );
};

export { NotificationButton };
