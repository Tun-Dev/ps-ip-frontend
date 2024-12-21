'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  MdGroups,
  MdHome,
  MdLocalShipping,
  MdLogout,
  MdNoteAlt,
  MdPerson,
  MdViewCarousel,
  MdVolunteerActivism,
} from 'react-icons/md';

import { useUserStore } from '@/providers/user-store-provider';
import NotificationModal from '@/shared/chakra/modals/notificationModal';
import { SideBarItem, NotificationButton } from '@/shared/chakra/components';

const sideBarData = [
  { name: 'Dashboard', Icon: MdHome, url: '/super-admin' },
  { name: 'Programs', Icon: MdViewCarousel, url: '/super-admin/programs' },
  { name: 'Agents/Aggregators', Icon: MdGroups, url: '/super-admin/agents' },
  { name: 'Vendors/Orders', Icon: MdLocalShipping, url: '/super-admin/vendors' },
  { name: 'Partners', Icon: MdVolunteerActivism, url: '/super-admin/partners' },
  { name: 'Reports', Icon: MdNoteAlt, url: '/super-admin/reports' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isNotfModalOpen, setIsNoftModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  // const router = useRouter();

  const handleLogout = () => {
    queryClient.invalidateQueries();
    queryClient.clear();
    logout();
  };

  return (
    <Flex w="full" flexDir="column">
      <NotificationModal isOpen={isNotfModalOpen} onClose={() => setIsNoftModalOpen((prev) => !prev)} />
      <Image src="/images/BOI_LOGO.png" alt="" h="36px" w="181px" />

      <Flex flex="1 1 0%" mt="104px" flexDirection="column" gap="10px">
        {sideBarData.map((item, index) => (
          <SideBarItem
            key={index}
            {...item}
            active={pathname.startsWith(item.url) && (item.url === '/super-admin' ? pathname === '/super-admin' : true)}
          />
        ))}
      </Flex>

      <Flex flexDir="column">
        <NotificationButton
          count={3}
          url="/super-admin/notifications"
          active={pathname.startsWith('/super-admin/notifications')}
        />
        <Flex flexDir="column" mt="88px" gap="16px">
          <Flex py="3" px="4" borderRadius="6px" bg="primary.100" alignItems="center" justifyContent="center" gap="8px">
            <Flex
              boxSize="40px"
              bg="white"
              borderRadius="16px"
              justifyContent="center"
              alignItems="center"
              flexShrink={0}
            >
              <MdPerson size="24px" color="#D7D7D7" />
            </Flex>
            <Flex flexDir="column" minW={0}>
              <Text variant="Body2Bold">{`${user?.firstName} ${user?.lastName}`}</Text>
              <Text variant="Body3Semibold" isTruncated>
                {user?.email}
              </Text>
            </Flex>
          </Flex>
          <Flex gap="8px" align="center" justify="center" cursor="pointer" onClick={handleLogout}>
            <MdLogout size="16px" color="red" />
            <Text variant="Body1Bold" color="red">
              Log out
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
