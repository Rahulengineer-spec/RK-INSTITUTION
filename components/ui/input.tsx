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
          'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-base font-normal text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
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
            'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-base font-normal text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
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
