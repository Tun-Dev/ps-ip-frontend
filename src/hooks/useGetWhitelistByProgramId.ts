import { getWhiteListByProgramId } from '@/services/whitelist';
import { useQuery } from '@tanstack/react-query';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
}>;

export const useGetWhitelistByProgramId = (params: Params, programId: string) => {
  return useQuery({
    queryKey: ['whitelist', programId, params],
    queryFn: getWhiteListByProgramId,
    enabled: !!programId,
  });
};
