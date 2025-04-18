import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to EduTech Institute
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Empowering minds with cutting-edge education and innovative learning experiences.
                Shape your future with us.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 text-center">
              <GraduationCap className="h-12 w-12 text-primary" />
              <h3 className="font-bold">Expert Faculty</h3>
              <p className="text-sm text-muted-foreground">
                Learn from industry experts and experienced educators
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="font-bold">Small Class Sizes</h3>
              <p className="text-sm text-muted-foreground">
                Personalized attention and interactive learning
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <BookOpen className="h-12 w-12 text-primary" />
              <h3 className="font-bold">Modern Curriculum</h3>
              <p className="text-sm text-muted-foreground">
                Industry-aligned courses updated regularly
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <Award className="h-12 w-12 text-primary" />
              <h3 className="font-bold">Recognized Certification</h3>
              <p className="text-sm text-muted-foreground">
                Globally accepted certifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to Start Your Journey?</h2>
            <p className="mx-auto max-w-[600px]">
              Join thousands of students who have transformed their careers with EduTech Institute
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}