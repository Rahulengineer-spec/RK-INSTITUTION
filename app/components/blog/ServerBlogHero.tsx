import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServerBlogHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-primary/10 via-banner/30 to-background/80">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-banner/30 to-background/80 opacity-60 dark:opacity-40" />
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-4 animate-fade-in-up">
            Insights & Resources for Modern Learners
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl dark:text-gray-300 animate-fade-in-up">
            Discover the latest trends, tips, and insights in online education and professional development.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg" 
              className="button-primary shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="button-outline shadow-lg hover:shadow-xl transition-shadow"
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
