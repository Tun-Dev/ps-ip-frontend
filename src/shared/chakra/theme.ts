import { Theme, extendTheme } from "@chakra-ui/react";
import { theme as chakraProTheme } from "@chakra-ui/pro-theme";

import typography from "./typography";

const proTheme = extendTheme(chakraProTheme) as Theme;

const extendedConfig = {
  global: {
    body: {
      color: "text",
    },
  },
  fonts: {
    ...proTheme.fonts,
    body: "var(--font-inter)",
    heading: "var(--font-inter)",
  },
  colors: {
    ...proTheme,
    primary: {
      50: "#F3F9F2",
      100: "#E6F2E6",
      200: "#CDE5CC",
      400: "#9CCB99",
      500: "#077D00",
      600: "#6AB166",
      800: "#399733",
    },
    secondary: {
      50: "#FCFBF6",
      100: "#FAF7EC",
      200: "#F5EEDA",
      400: "#EBDDB5",
      500: "#CCAB45",
      600: "#E0CD8F",
      800: "#D6BC6A",
    },
    grey: {
      100: "#F8F8F8",
      200: "#EBEBEB",
      300: "#D7D7D7",
      400: "#A4A4A4",
      500: "#7D7D7D",
    },
    red: "#FF0000",
    "red/10": "rgba(255, 0, 0, 0.1)",
    "red/20": "rgba(255, 0, 0, 0.2)",
    "red/50": "rgba(255, 0, 0, 0.5)",
    green: "#00A75B",
    "green/10": "rgba(0, 167, 91, 0.1)",
    "green/20": "rgba(0, 167, 91, 0.2)",
    "green/50": "rgba(0, 167, 91, 0.5)",
    text: "#343434",
    greenBG: "#F3F8F2",
    white: "#FFFFFF",
    "white/20": "rgba(255, 255, 255, 0.2)",
    "white/50": "rgba(255, 255, 255, 0.5)",
    black: "#000000",
  },
  shadows: {},
  breakpoints: {
    base: "0px",
    sm: "1440px",
    md: "1600px",
    lg: "1920px",
  },
  components: {
    Text: typography,
  },
};

const theme = extendTheme(extendedConfig);

export default theme;
