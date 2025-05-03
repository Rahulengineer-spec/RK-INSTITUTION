import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes
  updateAgeOnGet: true,
  updateAgeOnHas: true,
});

export async function getCachedData<T>(
  key: string,
  fetchData: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData as T;
  }

  const data = await fetchData();
  cache.set(key, data, { ttl: ttl || 1000 * 60 * 5 });
  return data;
}

export function invalidateCache(key: string): void {
  cache.delete(key);
}

export function clearCache(): void {
  cache.clear();
} 