import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys);

export const radioTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
});
