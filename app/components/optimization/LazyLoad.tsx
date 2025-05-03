'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  placeholder?: ReactNode;
}

export function LazyLoad({ 
  children, 
  threshold = 0.1,
  placeholder 
}: LazyLoadProps) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setLoaded(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="min-h-[50px]">
      {loaded ? children : placeholder || <div className="animate-pulse bg-muted h-full min-h-[200px] rounded-md" />}
    </div>
  );
}
