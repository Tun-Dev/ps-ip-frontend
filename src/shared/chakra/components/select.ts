import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    borderRadius: '0.25rem',
    fontSize: '0.8125rem',
    lineHeight: '1.25rem',
    py: '0.375rem',
    px: '0.75rem',
    height: 'auto',
  },
});

const small = {
  field: defineStyle({
    borderRadius: '0.25rem',
    fontSize: '0.8125rem',
    py: '0.25rem',
    px: '0.5rem',
  }),
  icon: defineStyle({
    boxSize: '1rem',
  }),
};

const medium = {
  field: defineStyle({
    borderRadius: '0.375rem',
    fontSize: '1rem',
    py: '0.375rem',
    px: '0.75rem',
  }),
  icon: defineStyle({
    boxSize: '1.25rem',
  }),
};

const sizes = {
  small: definePartsStyle({ field: small.field, icon: small.icon }),
  medium: definePartsStyle({ field: medium.field, icon: medium.icon }),
};

const primary = definePartsStyle({
  field: {
    color: 'text',
    outline: '1px solid',
    outlineColor: 'grey.200',
    background: 'primary.50',
    _hover: { background: 'primary.100' },
    _active: { background: 'primary.200' },
    _focusVisible: { outlineColor: 'primary.500' },
  },
  icon: {
    color: 'primary.600',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
  variants: { primary },
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'medium',
  },
});
