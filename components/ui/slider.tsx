'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({ className, ...props }, ref) => (
  <input
    type="range"
    ref={ref}
    className={cn('w-full h-2 bg-muted rounded-full shadow-xs appearance-none focus:outline-none', className)}
    {...props}
    style={{
      ...props.style,
      accentColor: 'var(--primary-color)',
    }}
  />
));
Slider.displayName = 'Slider';

export { Slider };
