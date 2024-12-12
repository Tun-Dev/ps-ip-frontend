'use client';

import { Grid, Text, useMediaQuery } from '@chakra-ui/react';
import { ComponentType } from 'react';

export const withDesktopOnlyOverlay = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const [isMobile] = useMediaQuery('(max-width: 1023px)');

    // Show overlay only on production
    if (isMobile && process.env.NODE_ENV !== 'development')
      return (
        <Grid inset="0" h="100dvh" w="full" bgColor="greenBG" p="6" gap="6" position="relative" placeItems="center">
          <Text variant="Body1Bold">Please View On A Desktop</Text>
        </Grid>
      );

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withMobileOverlay(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
