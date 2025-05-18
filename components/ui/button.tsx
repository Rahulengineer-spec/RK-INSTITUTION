import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105',
  {
    variants: {
      variant: {
        default: 'button-primary',
        gradient: 'button-primary',
        outline: 'button-outline',
        ghost: 'bg-transparent text-foreground hover:bg-muted/40',
        destructive: 'bg-destructive text-white shadow-md hover:shadow-lg',
        success: 'bg-success text-white shadow-md hover:shadow-lg',
        info: 'bg-accent text-white shadow-md hover:shadow-lg',
        warning: 'bg-warning text-white shadow-md hover:shadow-lg',
      },
      size: {
        default: 'h-12 px-6 py-3 text-base rounded-lg',
        sm: 'h-9 px-4 text-sm rounded-md',
        lg: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-12 w-12 p-0 rounded-full',
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
