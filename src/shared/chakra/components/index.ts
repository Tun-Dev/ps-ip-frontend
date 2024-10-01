import { ThemeComponents } from '@chakra-ui/react';

import Heading from './heading';
import Input from './input';
import Select from './select';
import Text from './text';
import buttonTheme from './buttonTheme';

const components: ThemeComponents = {
  Input: Input,
  Select: Select,
  Text: Text,
  Heading: Heading,
  Button: buttonTheme,
};

export default components;
