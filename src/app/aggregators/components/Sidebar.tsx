'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';
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
      <Image src="/images/boi-white.png" alt="" h="52px" w="197px" />

      <Flex flex="1 1 0%" mt="44px" flexDirection="column" gap="10px">
        {sideBarData.map((item, index) => (
          <SideBarItem
            key={index}
            {...item}
            active={pathname.startsWith(item.url) && (item.url === '/aggregators' ? pathname === '/aggregators' : true)}
          />
        ))}
      </Flex>

      <Flex flexDir="column" mb="68px">
        <NotificationButton
          count={3}
          url="/aggregators/notifications"
          active={pathname.startsWith('/aggregators/notifications')}
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
            <Flex boxSize="40px" bg="white" borderRadius="16px" justifyContent="center" alignItems="center">
              <MdPerson size="24px" color="#A4A4A4" />
            </Flex>
            <Flex flexDir="column" minW={0} color="white">
              <Text variant="Body2Bold">Chukwuemeka Aliu</Text>
              <Text variant="Body3Semibold">ChukwuAliu@gmail.com</Text>
            </Flex>
          </Flex>
          <Button variant="cancel" bg="#FFD6D6" leftIcon={<MdLogout size="16px" color="red" />} w="100%">
            Log out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
