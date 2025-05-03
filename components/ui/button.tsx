import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:shadow-md',
        gradient: 'bg-gradient-primary text-primary-foreground shadow-sm hover:shadow-lg',
        outline: 'border border-input bg-background text-foreground shadow-xs hover:shadow-md',
        ghost: 'bg-transparent text-foreground hover:bg-muted/40',
        destructive: 'bg-error text-white shadow-xs hover:shadow-md',
        success: 'bg-success text-white shadow-xs hover:shadow-md',
        info: 'bg-info text-white shadow-xs hover:shadow-md',
        warning: 'bg-warning text-white shadow-xs hover:shadow-md',
      },
      size: {
        default: 'h-10 px-4 py-2 text-base rounded',
        sm: 'h-8 px-3 text-sm rounded-md',
        lg: 'h-12 px-6 text-lg rounded-lg',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
