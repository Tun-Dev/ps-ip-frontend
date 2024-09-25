import { Theme, extendTheme } from "@chakra-ui/react";
import { theme as chakraProTheme } from "@chakra-ui/pro-theme";

const font = `'Poppins', sans-serif`;

const proTheme = extendTheme(chakraProTheme) as Theme;

const extendedConfig = {
  colors: {
    ...proTheme.colors,
  },
  fonts: {
    ...proTheme.fonts,
    body: font,
    heading: font,
  },
  shadows: {},
  breakpoints: {
    base: "0px",
    sm: "1440px",
    md: "1600px",
    lg: "1920px",
  },
  components: {},
};

const theme = extendTheme(extendedConfig);

export default theme;
