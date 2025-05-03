import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServerBlogHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-50 dark:opacity-30" />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Insights & Resources for Modern Learners
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl dark:text-gray-300">
            Discover the latest trends, tips, and insights in online education and professional development.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="button-gradient text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/90 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </section>
  );
}
