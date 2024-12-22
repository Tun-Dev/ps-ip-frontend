import { useQuery } from '@tanstack/react-query';

import { getPartners } from '@/services/partners';
import { PartnerFilterParams } from '@/types';

export const useGetPartners = (filterParams: PartnerFilterParams) => {
  return useQuery({ queryKey: ['partners', filterParams], queryFn: () => getPartners(filterParams) });
};
