import { Theme, ThemeOverride, extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import styles from "./styles";
import typography from "./typography";
import buttonTheme from "./buttonTheme";

const extendedConfig: ThemeOverride = {
  styles,
  colors,
  ...typography,
  shadows: {},
  breakpoints: {
    base: "0px",
    sm: "1440px",
    md: "1600px",
    lg: "1920px",
  },
  components: {
    Button: buttonTheme,
  },
};

const theme = extendTheme(extendedConfig) as Theme;

export default theme;
