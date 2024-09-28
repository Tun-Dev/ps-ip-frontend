import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

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

export default defineStyleConfig({
  variants: { Header1Regular, Header1Bold, Header2Bold, Header3Bold, Header4Bold },
  defaultProps: { variant: 'Header2Bold' },
});
