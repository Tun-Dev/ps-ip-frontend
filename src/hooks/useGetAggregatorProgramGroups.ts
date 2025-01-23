import { useQuery } from '@tanstack/react-query';

import { getAggregatorProgramGroups } from '@/services/aggregators';

export const useGetAggregatorProgramGroups = () => {
  return useQuery({ queryKey: ['aggregatorProgramGroups'], queryFn: getAggregatorProgramGroups });
};
