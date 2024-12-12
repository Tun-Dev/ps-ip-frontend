import { switchAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const switchTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
    colorScheme: 'primary',
  },
});
