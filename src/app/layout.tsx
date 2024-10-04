import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ThemedChakraProvider from '@/shared/chakra/ThemedChakraProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PS-IP',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemedChakraProvider>{children}</ThemedChakraProvider>
      </body>
    </html>
  );
}
