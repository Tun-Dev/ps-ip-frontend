import { ButtonProps, StyleConfig, SystemStyleInterpolation } from '@chakra-ui/react';

export const sizes = { small: {}, medium: {}, default: {} };
type ButtonSize = keyof typeof sizes;

const sizeStyleMap: { [k in ButtonSize]: SystemStyleInterpolation } = {
  small: {
    padding: '8px',
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '16px',
    h: '24px',
  },
  medium: {
    padding: '12px',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '20px',
    h: '32px',
  },
  default: {
    padding: '24px',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    h: '48px',
  },
};

export const primaryVariant = () =>
  ({
    color: 'white',
    fill: 'white',
    bg: 'secondary.500',
    _hover: {
      bg: 'secondary.800',
      _disabled: {
        _hover: { bg: 'secondary.500' },
      },
    },
    font: 'body1-bold',
  }) as SystemStyleInterpolation;

export const buttonBaseStyle = (size: ButtonProps['size']) => ({
  borderRadius: '6px',
  whiteSpace: 'nowrap',
  position: 'relative',
  fontWeight: '600',
  textTransform: 'capitalize',
  width: 'fit-content',
  ...sizeStyleMap[size as ButtonSize],
});

export const secondaryVariant = () =>
  ({
    color: 'secondary.500',
    fill: 'secondary.500',
    bg: 'secondary.100',
    _hover: {
      bg: 'secondary.200',
      _disabled: {
        _hover: { bg: 'secondary.100' },
      },
    },
    font: 'body1-bold',
  }) as SystemStyleInterpolation;

export const tertiaryVariant = () =>
  ({
    color: 'secondary.500',
    fill: 'secondary.500',
    bg: 'transparent',
    _hover: {
      bg: 'secondary.100',
      _disabled: {
        _hover: { bg: 'transparent' },
      },
    },
    font: 'body1-bold',
  }) as SystemStyleInterpolation;

export const formSuccessVariant = () =>
  ({
    color: 'green',
    fill: 'green',
    bg: 'green/10',
    _hover: {
      bg: 'green/20',
      _disabled: {
        _hover: { bg: 'green/10' },
      },
    },
    font: 'body1-bold',
  }) as SystemStyleInterpolation;

export const formErrorVariant = () =>
  ({
    color: 'red',
    fill: 'red',
    bg: 'red/10',
    _hover: {
      bg: 'red/20',
      _disabled: {
        _hover: { bg: 'red/10' },
      },
    },
    font: 'body1-bold',
  }) as SystemStyleInterpolation;

const buttonTheme: StyleConfig = {
  baseStyle: ({ size }) => buttonBaseStyle(size),
  variants: {
    primary: primaryVariant(),
    secondary: secondaryVariant(),
    tertiary: tertiaryVariant(),
    cancel: formErrorVariant(),
    accept: formSuccessVariant(),
  },
  sizes,
};

export default buttonTheme;
