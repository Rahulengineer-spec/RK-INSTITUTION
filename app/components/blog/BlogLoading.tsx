import { Skeleton } from "@/app/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900/95">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-gray-900/95">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6 dark:bg-gray-700" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8 dark:bg-gray-700" />
            <div className="flex items-center max-w-md mx-auto">
              <Skeleton className="h-12 w-full rounded-full dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Skeleton */}
      <section className="py-8 border-b dark:border-gray-800">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full dark:bg-gray-700" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <Skeleton className="h-80 w-full dark:bg-gray-700" />
              <div className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4 dark:bg-gray-700" />
                <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-2/3 mb-6 dark:bg-gray-700" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full dark:bg-gray-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 dark:bg-gray-700" />
                    <Skeleton className="h-3 w-24 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-24 w-24 flex-shrink-0 dark:bg-gray-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full dark:bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 dark:bg-gray-700" />
                    <Skeleton className="h-3 w-24 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regular Posts Grid Skeleton */}
      <section className="py-16 bg-muted/50 dark:bg-gray-800/20">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4 dark:bg-gray-700" />
            <Skeleton className="h-5 w-96 mx-auto dark:bg-gray-700" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-52 w-full dark:bg-gray-700" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-4/5 mb-4 dark:bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-24 dark:bg-gray-700" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
