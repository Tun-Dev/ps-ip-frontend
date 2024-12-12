import { ThemeComponents } from '@chakra-ui/react';

import buttonTheme from './buttonTheme';
import { checkboxTheme } from './checkbox';
import Input from './input';
import { radioTheme } from './radio';
import Select from './select';
import { switchTheme } from './switch';
import { tabsTheme } from './tabsTheme';
import { Heading, Text } from './typography';

const components: ThemeComponents = {
  Input: Input,
  Select: Select,
  Text: Text,
  Heading: Heading,
  Button: buttonTheme,
  Tabs: tabsTheme,
  Switch: switchTheme,
  Checkbox: checkboxTheme,
  Radio: radioTheme,
};

export default components;
