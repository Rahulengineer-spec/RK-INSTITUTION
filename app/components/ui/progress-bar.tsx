'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const handleStart = () => {
      setIsVisible(true);
      setProgress(0);

      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);
    };

    const handleComplete = () => {
      setProgress(100);
      clearInterval(progressInterval);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    };
    
    // For Next.js 13+ App Router, we need to use pathname changes
    // instead of router.events which is not available anymore
    
    handleStart();
    
    // Simulate route completion after a short delay
    const simulatedLoadingTime = setTimeout(() => {
      handleComplete();
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      clearTimeout(simulatedLoadingTime);
    };
  }, [router]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 transition-opacity duration-200',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          transition: 'width 300ms ease-in-out',
        }}
      />
    </div>
  );
} 