'use client';

import { getClientById } from '@/services/clients';
import { useQuery } from '@tanstack/react-query';

export const useGetClientByID = (clientId: string) => {
  return useQuery({ queryKey: ['client', clientId], queryFn: getClientById, enabled: !!clientId });
};
