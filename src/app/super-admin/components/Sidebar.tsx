'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import {
  MdGroups,
  MdHome,
  MdLocalShipping,
  MdLogout,
  MdNoteAlt,
  MdNotifications,
  MdPerson,
  MdViewCarousel,
  MdVolunteerActivism,
} from 'react-icons/md';
import { useRouter, usePathname } from 'next/navigation';

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
  return (
    <Flex w="full" flexDir="column">
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
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="15px">
            <MdNotifications size="20px" color="#077D00" />
            <Text variant="Body2Semibold" color="#077D00">
              Notifications
            </Text>
          </Flex>
          <Flex boxSize="15px" borderRadius="50%" bg="red" alignItems="center" justifyContent="center">
            <Text variant="Body3Semibold" color="white">
              3
            </Text>
          </Flex>
        </Flex>

        <Flex flexDir="column" mt="88px" gap="16px">
          <Flex h="64px" borderRadius="6px" bg="primary.100" alignItems="center" justifyContent="center" gap="8px">
            <Flex boxSize="40px" bg="white" borderRadius="16px" justifyContent="center" alignItems="center">
              <MdPerson size="24px" color="#9CCB99" />
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
      onClick={() => router.push(url)}
      transition="all 0.3s ease-in-out"
      bg={active ? 'primary.500' : ''}
    >
      <Icon color={active ? 'white' : '#A4A4A4'} size={active ? '20px' : '16px'} />
      <Text
        variant={active ? 'Body1Bold' : 'Body2Semibold'}
        color={active ? 'white' : 'grey.400'}
        transition="all 0.3s ease-in-out"
      >
        {name}
      </Text>
    </Flex>
  );
};
