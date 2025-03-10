'use client';

import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

import { useUserStore } from '@/providers/user-store-provider';
import { getDashboardRoute } from '@/utils';

export const withPublicLoader = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (!isHydrated || !user) return;
      const route = getDashboardRoute(user);
      if (route === '/login') logout();
      router.replace(route);
    }, [isHydrated, logout, router, user]);

    if (!isHydrated || !!user)
      return (
        <Flex h="100dvh" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPublicLoader(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
