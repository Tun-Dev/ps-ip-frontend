'use client';

import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const primaryVariant = definePartsStyle({
  field: {
    fontSize: '16px',
    py: '8px',
    px: '16px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'grey.200',
    backgroundColor: 'White',
    color: 'grey.400',

    _placeholder: {
      color: 'grey.400',
    },

    _focus: {
      color: 'text',
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: {
    primary: primaryVariant,
  },
});
