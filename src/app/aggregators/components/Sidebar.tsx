'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import { MdGroups, MdHome, MdLogout, MdNoteAlt, MdPerson, MdViewList } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NotificationModal from '@/shared/chakra/modals/notificationModal';
import { NotificationButton, SideBarItem } from '@/shared/chakra/components';

const sideBarData = [
  { name: 'Dashboard', Icon: MdHome, url: '/aggregators' },
  { name: 'Enumerations', Icon: MdViewList, url: '/aggregators/enumerations' },
  { name: 'Agents', Icon: MdGroups, url: '/aggregators/agents' },
  { name: 'Reports', Icon: MdNoteAlt, url: '/aggregators/reports' },
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
            active={pathname.startsWith(item.url) && (item.url === '/aggregators' ? pathname === '/aggregators' : true)}
          />
        ))}
      </Flex>

      <Flex flexDir="column">
        <NotificationButton
          count={3}
          url="/aggregators/notifications"
          active={pathname.startsWith('/aggregators/notifications')}
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
