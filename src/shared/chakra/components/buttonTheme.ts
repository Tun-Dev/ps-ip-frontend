import {
  ButtonProps,
  StyleConfig,
  SystemStyleInterpolation,
} from "@chakra-ui/react";

export const sizes = { small: {}, medium: {}, default: {} };
type ButtonSize = keyof typeof sizes;

const sizeStyleMap: { [k in ButtonSize]: SystemStyleInterpolation } = {
  small: {
    padding: "8px",
    fontSize: "10px",
    fontWeight: 600,
    lineHeight: "16px",
    h: "24px",
  },
  medium: {
    padding: "12px",
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "20px",
    h: "32px",
  },
  default: {
    padding: "24px",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    h: "48px",
  },
};

export const primaryVariant = () =>
  ({
    color: "white",
    fill: "white",
    bg: "primary.500",
    _hover: {
      bg: "primary.800",
    },
    font: "body1-bold",
  } as SystemStyleInterpolation);

export const buttonBaseStyle = (size: ButtonProps["size"]) => ({
  borderRadius: "6px",
  whiteSpace: "nowrap",
  position: "relative",
  fontWeight: "600",
  textTransform: "capitalize",
  width: "fit-content",
  ...sizeStyleMap[size as ButtonSize],
});

export const secondaryVariant = () =>
  ({
    color: "primary.500",
    fill: "primary.500",
    bg: "primary.100",
    _hover: {
      bg: "primary.200",
    },
    font: "body1-bold",
  } as SystemStyleInterpolation);

export const tertiaryVariant = () =>
  ({
    color: "primary.500",
    fill: "primary-500",
    bg: "transparent",
    _hover: {
      bg: "primary.100",
    },
    font: "body1-bold",
  } as SystemStyleInterpolation);

export const formSuccessVariant = () =>
  ({
    color: "primary.500",
    fill: "primary.500",
    bg: "green/10",
    _hover: {
      bg: "primary.200",
    },
    font: "body1-bold",
  } as SystemStyleInterpolation);

  export const formErrorVariant = () =>
    ({
      color: "red",
      fill: "red",
      bg: "red/10",
      _hover: {
        bg: "red/20",
      },
      font: "body1-bold",
    } as SystemStyleInterpolation);

const buttonTheme: StyleConfig = {
  baseStyle: ({ size }) => buttonBaseStyle(size),
  variants: {
    primary: primaryVariant(),
    secondary: secondaryVariant(),
    tertiary: tertiaryVariant(),
    cancel: formErrorVariant(),
    accept: formSuccessVariant()
  },
  sizes,
};

export default buttonTheme;