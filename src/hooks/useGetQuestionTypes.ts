'use client';

import { useQuery } from '@tanstack/react-query';

import { getQuestionTypes } from '@/services/reference';

export const useGetQuestionTypes = () => {
  return useQuery({ queryKey: ['questionTypes'], queryFn: getQuestionTypes, placeholderData: (data) => data });
};
