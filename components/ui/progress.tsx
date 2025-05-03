'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn('w-full h-3 bg-muted rounded-full shadow-xs', className)} {...props}>
    <div
      className="h-full rounded-full bg-gradient-success transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = 'Progress';

export { Progress };
