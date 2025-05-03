import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  variant?: 'default' | 'table' | 'overlay';
  message?: string;
}

export function LoadingState({ 
  variant = 'default', 
  message = 'Loading...' 
}: LoadingStateProps) {
  if (variant === 'table') {
    return (
      <tr>
        <td colSpan={5} className="h-24 text-center">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>{message}</span>
          </div>
        </td>
      </tr>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
} 