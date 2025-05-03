import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
}

const variants = {
  info: 'bg-info/10 text-info border-info shadow-xs',
  success: 'bg-success/10 text-success border-success shadow-xs',
  warning: 'bg-warning/10 text-warning border-warning shadow-xs',
  error: 'bg-error/10 text-error border-error shadow-xs',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant = 'info', ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn('w-full rounded-md border p-4 flex items-center gap-2', variants[variant], className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
