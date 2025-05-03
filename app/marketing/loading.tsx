import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section Loading */}
      <section className="text-center mb-20">
        <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/3 mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </section>

      {/* Features Section Loading */}
      <section className="mb-20">
        <Skeleton className="h-8 w-48 mx-auto mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section Loading */}
      <section className="mb-20">
        <Skeleton className="h-8 w-64 mx-auto mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-32 mb-6" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 flex-grow" />
                </div>
              ))}
              <Skeleton className="h-10 w-full mt-6" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section Loading */}
      <section className="text-center bg-primary/5 rounded-2xl p-12 mb-20">
        <Skeleton className="h-8 w-96 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
        <Skeleton className="h-10 w-32 mx-auto" />
      </section>
    </div>
  );
} 