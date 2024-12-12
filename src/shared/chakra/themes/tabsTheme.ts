import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: '600',
    color: 'grey.400',
    padding: '0px',
    mb: '-2px',
    borderBottom: '2px solid transparent',
    _selected: {
      color: 'text',
      borderBottom: '2px solid',
      borderColor: 'secondary.500',
      mb: '-2px',
    },
  },
  tablist: {
    borderBottom: '2px solid',
    borderColor: 'grey.200',
  },
  tabpanel: {
    padding: '24px',
  },
});

export const tabsTheme = defineMultiStyleConfig({ baseStyle });
