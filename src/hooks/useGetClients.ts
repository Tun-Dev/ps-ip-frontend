import { useQuery } from '@tanstack/react-query';

import { getClients } from '@/services/clients';
import { ClientFilterParams } from '@/types';

export const useGetClients = (filterParams: ClientFilterParams) => {
  return useQuery({ queryKey: ['client', filterParams], queryFn: () => getClients(filterParams) });
};
