'use client';

import { Flex, Text, Box, Button, Grid, useDisclosure } from '@chakra-ui/react';
import { OverviewCard } from '@/shared/chakra/components/overview';
import {
  MdAddCircle,
  MdLocalShipping,
  MdVolunteerActivism,
  MdAccountBalanceWallet,
  MdEmojiEmotions,
} from 'react-icons/md';
import { NewVendorModal } from '@/shared';
import { useGetVendorOverview } from '@/hooks/useGetVendorOverview';
import { usePathname, useRouter } from 'next/navigation';

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { response: overview, isLoading } = useGetVendorOverview();

  const cards = [
    {
      name: 'Vendors',
      icon: MdLocalShipping,
      value: overview?.body?.vendors || 0,
      identifier: '/super-admin/vendors',
      clickable: true,
    },
    {
      name: 'Orders',
      icon: MdLocalShipping,
      value: overview?.body?.orders || 0,
      identifier: '/super-admin/vendors/orders',
      clickable: true,
    },
    {
      name: 'Amount Disbursed',
      icon: MdVolunteerActivism,
      value: overview?.body?.amountDisbursed || 0,
      identifier: 'amount-disbursed',
      clickable: false,
    },
    {
      name: 'Beneficiaries Disbursed',
      icon: MdEmojiEmotions,
      value: overview?.body?.beneficiariesDisbursed || 0,
      identifier: 'beneficiaries-disbursed',
      clickable: false,
    },
    {
      name: 'Amount Disbursable',
      icon: MdAccountBalanceWallet,
      value: overview?.body?.amountDisburseable || 0,
      identifier: 'amount-disbursable',
      clickable: false,
    },
  ];

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%">
      <NewVendorModal isOpen={isOpen} onClose={onClose} />
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button variant="primary" gap="8px" onClick={onOpen}>
            <MdAddCircle />
            <Text> Add New Vendor</Text>
          </Button>
        </Flex>
        <Grid gap="6" templateColumns="repeat(auto-fit, minmax(265px, 1fr))">
          {cards.map((card, index) => (
            <Box
              key={index}
              onClick={card.clickable ? () => router.push(card.identifier) : () => {}}
              cursor={card.clickable ? 'pointer' : 'default'}
            >
              <OverviewCard
                title={card.name}
                number={isLoading ? '...' : card.value}
                icon={card.icon}
                active={pathname.endsWith(card.identifier)}
              />
            </Box>
          ))}
        </Grid>
      </Flex>
      {children}
    </Flex>
  );
};

export default VendorLayout;
