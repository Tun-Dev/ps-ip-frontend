import { extendTheme, ThemeOverride } from '@chakra-ui/react';
import { inputTheme } from '@/components/inputTheme';

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
  shadows: {
    card: '0px 4px 6px -1px rgba(3, 48, 0, 0.04), 0px 2px 4px -1px rgba(3, 48, 0, 0.04)',
  },
  breakpoints: {
    base: '0px',
    sm: '1440px',
    md: '1600px',
    lg: '1920px',
  },
  components: {
    ...components,
    Input: inputTheme,
  },
  components,
};

const theme = extendTheme(extendedConfig);

export default theme;
