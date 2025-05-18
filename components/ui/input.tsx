"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { VoiceSearchButton } from './voice-search';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-base font-normal text-foreground shadow-md transition-all duration-200 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const InputWithVoiceSearch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-base font-normal text-foreground shadow-md transition-all duration-200 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background',
            className
          )}
          value={value}
          onChange={e => setValue(e.target.value)}
          {...props}
        />
        <VoiceSearchButton onResult={setValue} />
      </div>
    );
  }
);
InputWithVoiceSearch.displayName = 'InputWithVoiceSearch';

export { Input };
