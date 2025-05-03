'use client';
 
import { useEffect, useState, ReactNode } from 'react';

interface ClientNoSSRProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientNoSSR({ children, fallback = null }: ClientNoSSRProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}
