'use client';

import { OverviewCard } from '@/shared/chakra/components/overview';
import { Box, Button, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAddCircle, MdPerson, MdVolunteerActivism } from 'react-icons/md';
import SuperAdminTab from './tabs/SuperAdminTab';
import VettingOfficerTab from './tabs/VettingOfficerTab';
import { AddNewUserModal } from '@/shared';

const RoleManagemantPage = () => {
  const [selected, setSelected] = useState('super-admin');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      <AddNewUserModal isOpen={isOpen} onClose={onClose} />
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button onClick={onOpen} variant="primary" gap="8px">
            <MdAddCircle />
            <Text> Add New User</Text>
          </Button>
        </Flex>
        <Flex gap="1rem">
          <Box w="265px" onClick={() => setSelected('super-admin')} cursor="pointer">
            <OverviewCard title="Super Admins" number={3} icon={MdPerson} active={selected === 'super-admin'} />
          </Box>
          <Box w="265px" onClick={() => setSelected('vetting-officers')} cursor="pointer">
            <OverviewCard
              title="Vetting Officers"
              number={20}
              icon={MdVolunteerActivism}
              active={selected === 'vetting-officers'}
            />
          </Box>
        </Flex>
      </Flex>
      <Divider borderColor="grey.200" opacity="1" />
      {selected === 'super-admin' ? <SuperAdminTab /> : <VettingOfficerTab />}
    </Flex>
  );
};

export default RoleManagemantPage;
