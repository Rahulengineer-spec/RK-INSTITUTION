'use client';

import { useEffect } from 'react';
import { measurePerformance, measureLCP, measureFID, measureCLS } from '@/app/lib/utils/performance';

export function PerformanceMonitor() {
  // Initialize performance measurements in client component
  useEffect(() => {
    measureLCP();
    measureFID();
    measureCLS();
    
    const measurePageLoad = measurePerformance('blog-page-load');
    measurePageLoad();
    console.log('Blog content loaded');
  }, []);
  
  // This component doesn't render anything visible
  return null;
}
