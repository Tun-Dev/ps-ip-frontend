'use client';

import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdHome } from 'react-icons/md';

const SideBarItem = ({
  name,
  Icon,
  url,
  active,
}: {
  name: string;
  Icon: typeof MdHome;
  url: string;
  active?: boolean;
}) => {
  const router = useRouter();
  return (
    <Flex
      w="full"
      h="40px"
      alignItems="center"
      p={active ? '8px 0px 8px 12px' : '8px 0px'}
      gap="8px"
      borderRadius="6px"
      cursor="pointer"
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          window.open(url, '_blank');
        } else {
          router.push(url);
        }
      }}
      transition="all 0.3s ease-in-out"
      bg={active ? 'secondary.500' : ''}
    >
      <Icon color={active ? 'white' : 'white'} size={active ? '20px' : '16px'} />
      <Text
        variant={active ? 'Body1Bold' : 'Body2Semibold'}
        color={active ? 'white' : 'white'}
        transition="all 0.3s ease-in-out"
      >
        {name}
      </Text>
    </Flex>
  );
};

export { SideBarItem };
