'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to your error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-muted-foreground">
          An error occurred while processing your request. Please try again.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 rounded-md bg-slate-950 p-4">
            <p className="text-sm text-white">{error.message}</p>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
} 