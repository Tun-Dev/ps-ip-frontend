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

const Header2Bold = defineStyle({
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '32px',
});

export default defineStyleConfig({
  variants: {
    Body3Regular,
    Body3Semibold,
    Body3Bold,
    Body2Regular,
    Body2Semibold,
    Body2Bold,
    Body1Regular,
    Body1Semibold,
    Body1Bold,
    Header2Bold,
  },
  defaultProps: { variant: 'Body1Regular' },
});
