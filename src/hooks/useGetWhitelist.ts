import { getWhitelist } from '@/services/whitelist';
import { useQuery } from '@tanstack/react-query';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
  programId: string;
  vendorId: string;
  status: string;
}>;

export const useGetWhitelist = (params: Params) => {
  return useQuery({
    queryKey: ['whitelist', params],
    queryFn: getWhitelist,
    enabled: !!params.programId,
  });
};
