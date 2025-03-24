'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { NotificationButton, SideBarItem } from '@/shared/chakra/components';
import { Image } from '@chakra-ui/next-js';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import {
  MdGroups,
  MdHome,
  MdLocalShipping,
  MdLogout,
  MdManageAccounts,
  MdNoteAlt,
  MdPerson,
  MdViewCarousel,
} from 'react-icons/md';

const sideBarData = [
  { name: 'Dashboard', Icon: MdHome, url: '/clients' },
  { name: 'Programs', Icon: MdViewCarousel, url: '/clients/programs' },
  { name: 'Agents/Aggregators', Icon: MdGroups, url: '/clients/agents' },
  { name: 'Vendors/Orders', Icon: MdLocalShipping, url: '/clients/vendors' },
  { name: 'Role Management', Icon: MdManageAccounts, url: '/clients/role-management' },
  { name: 'Reports', Icon: MdNoteAlt, url: '/clients/reports' },
];

const NAME = '/clients';
const NOTIFICATIONS_URL = `${NAME}/notifications`;

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
    <Stack
      w="full"
      justify="space-between"
      gap="4"
      overflowY="auto"
      sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
    >
      <Stack align="flex-start" gap="2.75rem" w="full">
        <Box bgColor="white" p="2" rounded="0.375rem">
          <Image
            src="/images/BOI_LOGO.png"
            alt="Bank of Industry Logo"
            width={1048}
            height={238}
            boxSize="auto"
            minW="11rem"
            sx={{ objectFit: 'contain' }}
            priority
          />
        </Box>
        <Stack gap="2.5" w="full">
          {sideBarData.map((item, index) => (
            <SideBarItem
              key={index}
              {...item}
              active={pathname.startsWith(item.url) && (item.url === NAME ? pathname === NAME : true)}
            />
          ))}
        </Stack>
      </Stack>
      <Stack gap="3rem">
        <NotificationButton count={3} url={NOTIFICATIONS_URL} active={pathname.startsWith(NOTIFICATIONS_URL)} />
        <Stack gap="4 ">
          <Flex
            py="16px"
            px="12px"
            borderRadius="12px"
            bg="primary.600"
            alignItems="center"
            justifyContent="center"
            gap="8px"
            h="64px"
            boxShadow="card"
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
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
