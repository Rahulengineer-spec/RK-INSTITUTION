'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  weight?: 'normal' | 'medium' | 'bold';
}

const fontWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, weight = 'medium', ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', fontWeights[weight], className)}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
