import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CoursesSection } from "./components/CoursesSection";
import { cn } from "@/lib/utils"; // Import cn utility

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-gradient-to-b from-background via-background/90 to-background">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-6 max-w-4xl">
              {/* Apply gradient in both modes, add shadow only in light mode */}
              <h1 
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl 
                           bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient 
                           text-shadow-sm dark:text-shadow-none 
                           animate-fade-in-up"
                style={{ animationDelay: '0.2s', opacity: 0 }} // Inline style for initial state
              >
                Shape Your Future with RK INSTITUTION
              </h1>
              {/* Added animation class and delay */}
              <p 
                className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl animate-fade-in-up"
                style={{ animationDelay: '0.4s', opacity: 0 }}
              >
                Unlock your potential with cutting-edge courses, expert instructors, and a vibrant learning community. Your journey to success starts here.
              </p>
            </div>
            {/* Added animation class and delay */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.6s', opacity: 0 }}
            >
              {/* Applied new button style class */}
              <Button size="lg" className="button-gradient-hover text-white px-8 py-3">
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent/10 hover:border-accent transition-all duration-300 px-8 py-3 dark:bg-gray-800/50 dark:hover:bg-gray-700/70"
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
            {/* Added animation class and delay, applied improved card style */}
            <div 
              className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl w-full animate-fade-in-up"
              style={{ animationDelay: '0.8s', opacity: 0 }}
            >
              <div className="glass-card-improved text-center">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Expert Instructors</p>
              </div>
              <div className="glass-card-improved text-center">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
              <div className="glass-card-improved text-center">
                <p className="text-3xl font-bold text-primary">10k+</p>
                <p className="text-sm text-muted-foreground">Happy Students</p>
              </div>
              <div className="glass-card-improved text-center">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 dark:bg-gray-900/50 relative overflow-hidden">
        {/* Refined background grid */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.03] dark:bg-grid-white/[0.03] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="container relative px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose RK INSTITUTION?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a unique blend of quality education, flexibility, and support designed for your success.
            </p>
          </div>
          {/* Applied improved feature card style */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="feature-card-improved">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-muted-foreground">
                Learn from industry leaders and experienced educators passionate about teaching.
              </p>
            </div>
            <div className="feature-card-improved">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Engage with course material through hands-on projects and collaborative sessions.
              </p>
            </div>
            <div className="feature-card-improved">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Curriculum</h3>
              <p className="text-muted-foreground">
                Learn at your own pace with courses designed for busy schedules.
              </p>
            </div>
            <div className="feature-card-improved">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Focused</h3>
              <p className="text-muted-foreground">
                Gain practical skills and recognized certifications to advance your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Assuming this component is styled appropriately */}
      <CoursesSection />

      {/* CTA Section */}
      <section className="relative py-28 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="container px-4 md:px-6">
          {/* Improved CTA card styling */}
          <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 bg-gradient-to-r from-primary/80 to-accent/80 dark:from-primary/70 dark:to-accent/70 shadow-xl">
             <div className="absolute inset-0 bg-[url('/path/to/your/subtle-pattern.svg')] opacity-10 mix-blend-overlay"></div> {/* Optional pattern */}
            <div className="relative flex flex-col items-center space-y-6 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary-foreground">
                Ready to Elevate Your Skills?
              </h2>
              <p className="mx-auto max-w-[650px] text-lg text-primary-foreground/90">
                Join thousands of successful learners. Enroll today and take the next step in your professional journey with RK INSTITUTION.
              </p>
              {/* Applied new button style class */}
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-10 py-3">
                <Link href="/register" className="flex items-center gap-2">
                  Start Learning Today <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}