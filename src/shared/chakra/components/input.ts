import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const dropdown = definePartsStyle({
  field: {
    color: 'text',
    outline: '1px solid',
    outlineColor: 'grey.200',
    outlineRadius: '0.25rem',
    background: 'primary.50',
    fontSize: '0.8125rem',
    fontWeight: 'semibold',
    lineHeight: '1.25rem',
    py: '0.375rem',
    px: '0.75rem',
    height: 'auto',
    _hover: { background: 'primary.100' },
    _active: { background: 'primary.200' },
    _focusVisible: { outlineColor: 'primary.500' },
  },
  icon: {
    color: 'primary.600',
  },
});

export default defineMultiStyleConfig({
  variants: { dropdown: dropdown },
});
