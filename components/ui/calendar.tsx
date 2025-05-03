'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('bg-card shadow-xs rounded-lg p-4', className)} {...props} />
));
Calendar.displayName = 'Calendar';

export { Calendar };
