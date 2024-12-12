import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const Body3Regular = defineStyle({
  fontSize: '10px',
  fontWeight: 'normal',
  lineHeight: '16px',
});

const Body3Semibold = defineStyle({
  fontSize: '10px',
  fontWeight: 'semibold',
  lineHeight: '16px',
});

const Body3Bold = defineStyle({
  fontSize: '10px',
  fontWeight: 'bold',
  lineHeight: '16px',
});

const Body2Regular = defineStyle({
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '20px',
});

const Body2Semibold = defineStyle({
  fontSize: '13px',
  fontWeight: 'semibold',
  lineHeight: '20px',
});

const Body2Bold = defineStyle({
  fontSize: '13px',
  fontWeight: 'bold',
  lineHeight: '20px',
});

const Body1Regular = defineStyle({
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '24px',
});

const Body1Semibold = defineStyle({
  fontSize: '16px',
  fontWeight: 'semibold',
  lineHeight: '24px',
});

const Body1Bold = defineStyle({
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '24px',
});

const Header1Regular = defineStyle({
  fontSize: '20px',
  fontWeight: 'normal',
  lineHeight: '28px',
});

const Header1Bold = defineStyle({
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '28px',
});

const Header2Bold = defineStyle({
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '32px',
});

const Header3Bold = defineStyle({
  fontSize: '30px',
  fontWeight: 'bold',
  lineHeight: '36px',
});

const Header4Bold = defineStyle({
  fontSize: '36px',
  fontWeight: 'bold',
  lineHeight: '40px',
});

const variants = {
  Body3Regular,
  Body3Semibold,
  Body3Bold,
  Body2Regular,
  Body2Semibold,
  Body2Bold,
  Body1Regular,
  Body1Semibold,
  Body1Bold,
  Header1Regular,
  Header1Bold,
  Header2Bold,
  Header3Bold,
  Header4Bold,
};

export const Text = defineStyleConfig({
  variants,
  defaultProps: { variant: 'Body1Regular' },
});

export const Heading = defineStyleConfig({
  variants,
  defaultProps: { variant: 'Header2Bold' },
});
