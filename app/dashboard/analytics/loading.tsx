import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
        
        {/* Chart placeholders */}
        <div className="col-span-2 h-[400px] bg-gray-100 rounded"></div>
        <div className="col-span-2 h-[400px] bg-gray-100 rounded"></div>
        
        {/* Tables placeholder */}
        <div className="col-span-4">
          <div className="h-6 bg-gray-200 rounded w-1/6 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 