'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import { MdChecklistRtl, MdHome, MdLogout, MdNoteAlt, MdPerson } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import NotificationModal from '@/shared/chakra/modals/notificationModal';
import { useState } from 'react';
import { NotificationButton, SideBarItem } from '@/shared/chakra/components';

const sideBarData = [
  { name: 'Dashboard', Icon: MdHome, url: '/vetting-officers' },
  { name: 'Vetting', Icon: MdChecklistRtl, url: '/vetting-officers/vetting' },
  { name: 'Reports', Icon: MdNoteAlt, url: '/vetting-officers/reports' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isNotfModalOpen, setIsNoftModalOpen] = useState(false);
  return (
    <Flex w="full" flexDir="column">
      <NotificationModal isOpen={isNotfModalOpen} onClose={() => setIsNoftModalOpen((prev) => !prev)} />
      <Image src="/images/BOI_LOGO.png" alt="" h="36px" w="181px" />

      <Flex flex="1 1 0%" mt="104px" flexDirection="column" gap="10px">
        {sideBarData.map((item, index) => (
          <SideBarItem
            key={index}
            {...item}
            active={
              pathname.startsWith(item.url) &&
              (item.url === '/vetting-officers' ? pathname === '/vetting-officers' : true)
            }
          />
        ))}
      </Flex>

      <Flex flexDir="column">
        <NotificationButton
          count={3}
          url="/vetting-officers/notifications"
          active={pathname.startsWith('/vetting-officers/notifications')}
        />

        <Flex flexDir="column" mt="88px" gap="16px">
          <Flex h="64px" borderRadius="6px" bg="primary.100" alignItems="center" justifyContent="center" gap="8px">
            <Flex boxSize="40px" bg="white" borderRadius="16px" justifyContent="center" alignItems="center">
              <MdPerson size="24px" color="#D7D7D7" />
            </Flex>
            <Flex flexDir="column">
              <Text variant="Body2Bold">Chukwuemeka Aliu</Text>
              <Text variant="Body3Semibold">ChukwuAliu@gmail.com</Text>
            </Flex>
          </Flex>
          <Flex gap="8px" alignItems="center" justifyContent="center" cursor="pointer" onClick={() => {}}>
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
