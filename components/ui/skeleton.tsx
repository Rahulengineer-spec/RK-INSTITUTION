import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40 rounded shadow-xs relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 animate-gradient bg-gradient-primary opacity-20" />
    </div>
  );
}

export default Skeleton;
