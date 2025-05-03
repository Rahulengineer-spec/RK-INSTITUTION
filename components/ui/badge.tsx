import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
}

const variants = {
  default: 'bg-accent text-accent-foreground',
  info: 'bg-info text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  error: 'bg-error text-white',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => (
  <span
    ref={ref}
    className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold shadow-xs', variants[variant], className)}
    {...props}
  />
));
Badge.displayName = 'Badge';

export { Badge };
