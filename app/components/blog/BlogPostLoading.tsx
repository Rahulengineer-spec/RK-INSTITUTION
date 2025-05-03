import { Skeleton } from "@/app/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-1 mb-6">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>
      
      <div className="mx-auto max-w-3xl">
        {/* Post Header Skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-20 mx-auto mb-4" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="text-sm text-left">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <Skeleton className="aspect-video w-full rounded-lg mb-10" />

        {/* Content Skeleton */}
        <div className="space-y-4 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>

        <div className="space-y-6 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className="mt-8 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>

        {/* Navigation Skeleton */}
        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
