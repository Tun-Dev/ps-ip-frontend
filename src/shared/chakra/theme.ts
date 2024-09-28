import { extendTheme, ThemeOverride } from '@chakra-ui/react';

import colors from './colors';
import components from './components';

const extendedConfig: ThemeOverride = {
  styles: {
    global: {
      body: {
        color: 'text',
      },
    },
  },
  fonts: {
    body: 'var(--font-inter)',
    heading: 'var(--font-inter)',
  },
  colors,
  shadows: {},
  breakpoints: {
    base: '0px',
    sm: '1440px',
    md: '1600px',
    lg: '1920px',
  },
  components,
};

const theme = extendTheme(extendedConfig);

export default theme;
