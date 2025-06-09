
import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

const globalCache = new PerformanceCache();

export const usePerformanceCache = () => {
  const [cacheVersion, setCacheVersion] = useState(0);

  const invalidateCache = useCallback(() => {
    setCacheVersion(prev => prev + 1);
  }, []);

  const getCachedData = useCallback(<T>(key: string): T | null => {
    return globalCache.get<T>(key);
  }, [cacheVersion]);

  const setCachedData = useCallback(<T>(key: string, data: T, ttl?: number): void => {
    globalCache.set(key, data, ttl);
    invalidateCache();
  }, [invalidateCache]);

  const removeCachedData = useCallback((key: string): void => {
    globalCache.remove(key);
    invalidateCache();
  }, [invalidateCache]);

  const clearCache = useCallback((): void => {
    globalCache.clear();
    invalidateCache();
  }, [invalidateCache]);

  return {
    getCachedData,
    setCachedData,
    removeCachedData,
    clearCache,
    hasCachedData: globalCache.has.bind(globalCache)
  };
};
