"use client"
import { SiteHeader } from "@/components/site-header";
import { CoursesSection } from "./components/CoursesSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Users, Award, GraduationCap, BookOpen, Phone } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for testimonials and partners
const testimonials = [
  {
    name: "Shamelle Chotoki",
    quote: "The support from mentors, lecturers, and everyone involved was exceptional.",
    image: "/testimonials/shamelle.jpg",
    title: "PG Program in Data Science and Business Analytics"
  },
  {
    name: "Alston Noah",
    quote: "The instructors and professors have very deep knowledge. The course exceeded my expectations.",
    image: "/testimonials/alston.jpg",
    title: "AI and Machine Learning Program"
  },
  {
    name: "Stephanie Nicole Baker",
    quote: "I enjoyed the process of learning something and immediately applying it.",
    image: "/testimonials/stephanie.jpg",
    title: "Artificial Intelligence Program"
  }
];

const partners = [
  "/partners/mit.png",
  "/partners/texas.png",
  "/partners/northwestern.png",
  "/partners/johnshopkins.png",
  "/partners/microsoft.png",
  "/partners/google.png",
  "/partners/amazon.png",
  "/partners/ibm.png"
];

const heroSlides = [
  {
    headline: "Shape Your Future with RK INSTITUTION",
    subheadline: "Unlock your potential with cutting-edge courses, expert instructors, and a vibrant learning community. Your journey to success starts here.",
    image: "/hero/slide1.jpg",
    cta: { label: "Get Started Now", href: "/register" },
    secondaryCta: { label: "Talk to an Advisor", href: "/contact", icon: <Phone className="h-5 w-5" /> },
  },
  {
    headline: "Learn from the Best, Succeed Anywhere",
    subheadline: "Join 9 million+ learners and get certified by top universities and industry leaders.",
    image: "/hero/slide2.jpg",
    cta: { label: "Explore Courses", href: "/courses" },
    secondaryCta: { label: "Download Brochure", href: "/brochure", icon: <ArrowRight className="h-5 w-5" /> },
  },
  {
    headline: "Career-Focused, Flexible Learning",
    subheadline: "Advance your career with hands-on projects, mentorship, and real-world skills.",
    image: "/hero/slide3.jpg",
    cta: { label: "Start Learning Today", href: "/register" },
    secondaryCta: { label: "Talk to an Advisor", href: "/contact", icon: <Phone className="h-5 w-5" /> },
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Dynamic testimonials auto-advance (show 3 at a time, infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 3) % testimonials.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Navbar */}
      {/* <SiteHeader /> */}

      {/* Dynamic Hero Section (Carousel) */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-background via-background/90 to-background">
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Carousel Slides */}
          <div className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                aria-hidden={idx !== currentSlide}
              >
                <img
                  src={slide.image}
                  alt="Hero background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
                  draggable={false}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient drop-shadow-lg mb-6">
                    {slide.headline}
                  </h1>
                  <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
                    {slide.subheadline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="button-gradient-hover text-white px-8 py-3">
                      <Link href={slide.cta.href} className="flex items-center gap-2">
                        {slide.cta.label} <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="bg-background/80 border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 px-8 py-3 flex items-center gap-2">
                      <Link href={slide.secondaryCta.href} className="flex items-center gap-2">
                        {slide.secondaryCta.icon}
                        {slide.secondaryCta.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {/* Carousel Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 ${idx === currentSlide ? 'bg-primary border-primary' : 'bg-white/70 border-gray-300'} transition`}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Trust signals and partner logos as before */}
      </section>

      {/* Popular Programs / Courses Section */}
      <CoursesSection />

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Success Stories
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => {
              const idx = (currentTestimonial + i) % testimonials.length;
              const t = testimonials[idx];
              return (
                <div key={idx} className="rounded-xl bg-card shadow-lg p-8 flex flex-col items-center text-center transition-all duration-700">
                  <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary/30" />
                  <blockquote className="text-lg italic text-muted-foreground mb-4">“{t.quote}”</blockquote>
                  <div className="font-semibold text-primary mb-1">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose RK INSTITUTION?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a unique blend of quality education, flexibility, and support designed for your success.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="feature-card-improved">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-muted-foreground">Learn from industry leaders and experienced educators passionate about teaching.</p>
            </div>
            <div className="feature-card-improved">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">Engage with course material through hands-on projects and collaborative sessions.</p>
            </div>
            <div className="feature-card-improved">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Curriculum</h3>
              <p className="text-muted-foreground">Learn at your own pace with courses designed for busy schedules.</p>
            </div>
            <div className="feature-card-improved">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Focused</h3>
              <p className="text-muted-foreground">Gain practical skills and recognized certifications to advance your career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="relative py-28 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 bg-gradient-to-r from-primary/80 to-accent/80 dark:from-primary/70 dark:to-accent/70 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary-foreground mb-4">
                Ready to Elevate Your Skills?
              </h2>
              <p className="max-w-[650px] text-lg text-primary-foreground/90 mb-6">
                Join thousands of successful learners. Enroll today and take the next step in your professional journey with RK INSTITUTION.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-10 py-3">
                  <Link href="/register" className="flex items-center gap-2">
                    Start Learning Today <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-background/80 border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 px-10 py-3">
                  <Link href="/brochure" className="flex items-center gap-2">
                    Download Brochure <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <img src="/cta-illustration.svg" alt="Learning illustration" className="max-w-xs md:max-w-md w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t dark:border-gray-800 py-12 mt-12">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logo.svg" alt="RK INSTITUTION Logo" className="h-10 w-auto mb-2" />
            <div className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} RK INSTITUTION. All rights reserved.</div>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-primary"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.6v4.73z"/></svg></a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">info@rkinstitution.com | +1 512 647 2647</div>
          </div>
        </div>
      </footer>
    </div>
  );
}