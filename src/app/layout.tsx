import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { UserStoreProvider } from '@/providers/user-store-provider';
import { ClientRootLayout } from '@/shared/chakra/components';
import ThemedChakraProvider from '@/shared/chakra/ThemedChakraProvider';
import { siteConfig } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.title}` },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ClientRootLayout>
          <ThemedChakraProvider>
            <UserStoreProvider>{children}</UserStoreProvider>
          </ThemedChakraProvider>
        </ClientRootLayout>
      </body>
    </html>
  );
}
