'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

export const withProtectedLoader = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (!isHydrated || !!user) return;
      const searchParams = new URLSearchParams();
      searchParams.set('redirect', window.location.href);
      router.replace(`/login?${searchParams.toString()}`);
    }, [isHydrated, router, user]);

    if (!isHydrated || !user)
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
