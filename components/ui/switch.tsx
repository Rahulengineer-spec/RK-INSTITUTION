'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <label className={cn('inline-flex items-center cursor-pointer', className)}>
      <input
        type="checkbox"
        ref={ref}
        className="sr-only peer"
        {...props}
      />
      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary relative transition-colors shadow-xs">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5" />
      </div>
    </label>
  );
});
Switch.displayName = 'Switch';

export { Switch };
