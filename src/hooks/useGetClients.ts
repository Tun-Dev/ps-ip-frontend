import { useQuery } from '@tanstack/react-query';

import { getClients } from '@/services/clients';
import { PartnerFilterParams } from '@/types';

export const useGetClients = (filterParams: PartnerFilterParams) => {
  return useQuery({ queryKey: ['partners', filterParams], queryFn: () => getClients(filterParams) });
};
