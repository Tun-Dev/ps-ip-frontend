import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: { p: '0.25rem', rounded: '0.375rem', minW: '7rem', borderColor: 'grey.200' },
  item: { p: '0.25rem', rounded: '0.375rem', textAlign: 'center' },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
