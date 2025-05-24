'use client';

import { useGetVendorOverview } from '@/hooks/useGetVendorOverview';
import { SmallOverviewCard } from '@/shared/chakra/components';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Flex, Link, SimpleGrid, Stack } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MdAccountBalanceWallet, MdEmojiEmotions, MdLocalShipping, MdVolunteerActivism } from 'react-icons/md';

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { response: overview, isLoading } = useGetVendorOverview();

  const programId = useSearchParams().get('program');

  const cards = useMemo(
    () => [
      {
        name: 'Vendors',
        icon: MdLocalShipping,
        value: overview?.body?.vendors || 0,
        identifier: '/clients/vendors',
      },
      {
        name: 'Orders',
        icon: MdLocalShipping,
        value: overview?.body?.orders || 0,
        identifier: '/clients/vendors/orders',
      },
    ],
    [overview]
  );

  const metrics = useMemo(
    () => [
      {
        name: 'Amount Disbursed',
        icon: MdVolunteerActivism,
        value: overview?.body?.amountDisbursed || 0,
      },
      {
        name: 'Beneficiaries Disbursed',
        icon: MdEmojiEmotions,
        value: overview?.body?.beneficiariesDisbursed || 0,
      },
      {
        name: 'Amount Disbursable',
        icon: MdAccountBalanceWallet,
        value: overview?.body?.amountDisburseable || 0,
      },
    ],
    [overview]
  );

  return (
    <Stack gap="6" boxSize="full">
      <Stack gap="6">
        <Flex align="center" justify="space-between">
          {/* <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text> */}
          <Breadcrumb separator=">" color="grey.500" fontSize="1rem" fontWeight="600">
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/clients/vendors/orders">
                Overview
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!!programId && (
              <BreadcrumbItem
                isCurrentPage={pathname === `/clients/vendors/orders?programId=${programId}`}
                color={pathname === `/clients/vendors/orders?programId=${programId}` ? 'primary.600' : 'inherit'}
              >
                <BreadcrumbLink
                  as={pathname === `/clients/vendors/orders?programId=${programId}` ? 'span' : Link}
                  href={`/clients/vendors/orders?programId=${programId}`}
                >
                  {programId}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Flex>
        <SimpleGrid gap="4" columns={{ base: 3, sm: 4 }}>
          {cards.map((card, index) => (
            <OverviewCard
              key={index}
              title={card.name}
              number={isLoading ? '...' : card.value}
              icon={card.icon}
              active={pathname.endsWith(card.identifier)}
              onClick={() => router.push(card.identifier)}
              cursor="pointer"
            />
          ))}
        </SimpleGrid>
        <Stack gap="4">
          <Divider borderColor="grey.200" opacity="1" />
          <SimpleGrid gap="6" columns={{ base: 3, sm: 4 }}>
            {metrics.map((card, index) => (
              <SmallOverviewCard
                key={index}
                title={card.name}
                number={isLoading ? '...' : card.value}
                icon={card.icon}
                iconColor="primary.600"
                minW="0"
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
      {children}
    </Stack>
  );
};

export default VendorLayout;
