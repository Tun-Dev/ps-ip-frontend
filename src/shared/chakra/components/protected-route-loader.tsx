'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { getDashboardRoute } from '@/utils';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

type Role = 'Super Admin' | 'Program Administrator' | 'Aggregator' | 'Client' | 'Vendor' | 'Vetting Officer';

export const withProtectedLoader = <P extends object>(Component: ComponentType<P>, role: Role) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (!isHydrated) return;
      if (!user || !user.roles.includes(role)) router.replace(getDashboardRoute(user));
    }, [isHydrated, router, user]);

    if (!isHydrated || !user || !user.roles.includes(role))
      return (
        <Flex h="100dvh" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withProtectedLoader(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
