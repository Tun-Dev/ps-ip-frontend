'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import { MdGroups, MdHome, MdLocalShipping, MdNoteAlt, MdViewCarousel, MdVolunteerActivism } from 'react-icons/md';
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
          <SideBarItem key={index} {...item} active={pathname === item.url} />
        ))}
      </Flex>

      <Flex justifySelf="end">Bottom</Flex>
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
  console.log(active);
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
      <Icon fill={active ? 'white' : '#A4A4A4'} width={active ? '20px' : '16px'} height={active ? '20px' : '16px'} />
      <Text variant={active ? 'Body1Bold' : 'Body2Semibold'} color={active ? 'white' : 'grey.400'}>
        {name}
      </Text>
    </Flex>
  );
};
