
import { useQuery } from '@tanstack/react-query';
import { usePerformanceCache } from './usePerformanceCache';
import { useCallback } from 'react';

interface UseOptimizedQueryProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useOptimizedQuery = <T,>(props: UseOptimizedQueryProps<T>) => {
  const {
    queryKey,
    queryFn,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
    enabled = true,
    refetchOnWindowFocus = false
  } = props;

  const { getCachedData, setCachedData } = usePerformanceCache();

  const optimizedQueryFn = useCallback(async (): Promise<T> => {
    const cacheKey = queryKey.join('-');
    const cached = getCachedData(cacheKey) as T;
    
    if (cached) {
      return cached;
    }

    const data = await queryFn();
    setCachedData(cacheKey, data, staleTime);
    return data;
  }, [queryKey, queryFn, getCachedData, setCachedData, staleTime]);

  return useQuery({
    queryKey,
    queryFn: optimizedQueryFn,
    staleTime,
    gcTime: cacheTime,
    enabled,
    refetchOnWindowFocus,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};
