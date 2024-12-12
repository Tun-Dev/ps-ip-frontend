'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useUserStore } from '@/providers/user-store-provider';
import { getUser } from '@/services/auth';
import { formatErrorMessage } from '@/utils';

export const useGetUser = (enabled?: boolean) => {
  const toast = useToast();
  const setUser = useUserStore((state) => state.setUser);

  const { data: response, isLoading, error } = useQuery({ queryKey: ['user'], queryFn: getUser, enabled });

  useEffect(() => {
    if (response) setUser(response.body);
  }, [setUser, response]);

  useEffect(() => {
    if (error) toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
  }, [error, toast]);

  return { response, isLoading, error };
};
