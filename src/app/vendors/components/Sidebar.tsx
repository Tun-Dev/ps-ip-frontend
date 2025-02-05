'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { NotificationButton, SideBarItem } from '@/shared/chakra/components';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { MdHome, MdLogout, MdNoteAlt, MdPerson, MdViewCarousel } from 'react-icons/md';

const sideBarData = [
  { name: 'Dashboard', Icon: MdHome, url: '/vendors' },
  { name: 'Programs', Icon: MdViewCarousel, url: '/vendors/programs' },
  { name: 'Reports', Icon: MdNoteAlt, url: '/vendors/reports' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    queryClient.invalidateQueries();
    queryClient.clear();
    logout();
  };

  return (
    <Flex w="full" flexDir="column">
      <Image src="/images/boi-white.png" alt="" h="52px" w="197px" />
      <Flex flex="1 1 0%" mt="44px" flexDirection="column" gap="10px">
        {sideBarData.map((item, index) => (
          <SideBarItem
            key={index}
            {...item}
            active={pathname.startsWith(item.url) && (item.url === '/vendors' ? pathname === '/vendors' : true)}
          />
        ))}
      </Flex>

      <Flex flexDir="column" mb="68px">
        <NotificationButton
          count={3}
          url="/vendors/notifications"
          active={pathname.startsWith('/vendors/notifications')}
        />

        <Flex flexDir="column" mt="48px" gap="16px">
          <Flex
            py="16px"
            px="12px"
            borderRadius="12px"
            bg="primary.600"
            alignItems="center"
            justifyContent="center"
            gap="8px"
            h="64px"
            boxShadow="0px 2px 4px -1px #0330000A, 0px 4px 6px -1px #0330000A"
          >
            <Flex
              boxSize="40px"
              bg="white"
              borderRadius="16px"
              justifyContent="center"
              alignItems="center"
              flexShrink={0}
            >
              <MdPerson size="24px" color="#A4A4A4" />
            </Flex>
            <Flex flexDir="column" minW={0} color="white">
              <Text variant="Body2Bold">{`${user?.firstName} ${user?.lastName}`}</Text>
              <Text variant="Body3Semibold" isTruncated>
                {user?.email}
              </Text>
            </Flex>
          </Flex>
          <Button
            variant="cancel"
            bg="#FFD6D6"
            leftIcon={<MdLogout size="16px" color="red" />}
            w="100%"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
