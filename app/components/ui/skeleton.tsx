import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'image' | 'avatar';
  count?: number;
}

export function Skeleton({ className, variant = 'text', count = 1 }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-[320px] w-full';
      case 'text':
        return 'h-4 w-full';
      case 'image':
        return 'aspect-video w-full';
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      default:
        return '';
    }
  };

  const renderSkeleton = () => {
    return Array(count).fill(null).map((_, index) => (
      <div
        key={index}
        className={cn(
          baseClasses,
          getVariantClasses(),
          className,
          count > 1 && index < count - 1 ? 'mb-3' : ''
        )}
      />
    ));
  };

  return <>{renderSkeleton()}</>;
}

export function BlogCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="image" />
      <div className="space-y-2">
        <Skeleton className="w-1/4" />
        <Skeleton className="w-3/4" />
        <Skeleton count={2} />
      </div>
      <div className="flex items-center space-x-3">
        <Skeleton variant="avatar" />
        <Skeleton className="w-24" />
      </div>
    </div>
  );
}

export function BlogHeroSkeleton() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 p-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <div className="flex space-x-4 pt-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogSidebarSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex flex-wrap gap-2">
          {Array(6).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
    </div>
  );
} 