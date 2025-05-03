'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogSearch } from './BlogSearch';
import { BlogCategories } from './BlogCategories';
import { BlogList } from './BlogList';
import { BlogCardSkeleton } from '@/app/components/ui/skeleton';

export function BlogClientWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchParams]);
  
  // If params change, show loading
  useEffect(() => {
    setIsLoading(true);
  }, [searchParams]);
  
  return (
    <>
      <div className="space-y-6">
        <BlogSearch />
        <BlogCategories />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array(6).fill(null).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <BlogList />
        </div>
      )}
    </>
  );
}
