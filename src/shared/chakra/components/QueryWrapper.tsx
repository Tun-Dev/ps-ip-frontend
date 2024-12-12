'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

let queryClient: QueryClient | null = null;

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });
};

export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient();
  return (queryClient ??= createQueryClient());
};

export function ClientRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
