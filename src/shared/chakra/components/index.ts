import { ThemeComponents } from '@chakra-ui/react';

import Input from './input';
import Select from './select';
import { Heading, Text } from './typography';
import buttonTheme from './buttonTheme';

const components: ThemeComponents = {
  Input: Input,
  Select: Select,
  Text: Text,
  Heading: Heading,
  Button: buttonTheme,
};

export default components;
