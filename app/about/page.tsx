"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Users, GraduationCap, Globe, Clock, Quote } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About EduTech Institute</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Transforming education through technology and innovation since 2020. We&apos;re committed to 
          providing world-class education that prepares students for the digital future.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-colors">
          <h3 className="text-4xl font-bold mb-2">5000+</h3>
          <p className="text-muted-foreground">Students Enrolled</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-colors">
          <h3 className="text-4xl font-bold mb-2">150+</h3>
          <p className="text-muted-foreground">Expert Instructors</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-colors">
          <h3 className="text-4xl font-bold mb-2">98%</h3>
          <p className="text-muted-foreground">Success Rate</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Expert Faculty</h3>
            </div>
            <p className="text-muted-foreground">
              Learn from industry professionals with years of real-world experience in their respective fields.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Modern Curriculum</h3>
            </div>
            <p className="text-muted-foreground">
              Our curriculum is regularly updated to reflect the latest industry trends and technologies.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Small Class Sizes</h3>
            </div>
            <p className="text-muted-foreground">
              Personalized attention with small class sizes ensuring better learning outcomes.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Global Recognition</h3>
            </div>
            <p className="text-muted-foreground">
              Our certifications are recognized by leading companies worldwide.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Flexible Learning</h3>
            </div>
            <p className="text-muted-foreground">
              Choose between online and hybrid learning options that fit your schedule.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Career Support</h3>
            </div>
            <p className="text-muted-foreground">
              Comprehensive career guidance and placement assistance for all students.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leadership Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="text-muted-foreground mb-2">Founder & CEO</p>
              <p className="text-sm text-muted-foreground">
                Visionary leader with 20+ years in education technology
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">👩‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-muted-foreground mb-2">Academic Director</p>
              <p className="text-sm text-muted-foreground">
                Expert in curriculum development and educational innovation
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-muted-foreground mb-2">Technical Director</p>
              <p className="text-sm text-muted-foreground">
                Leading our technology initiatives and digital transformation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg mb-4">
                &ldquo;The hands-on learning approach and expert guidance helped me land my dream job in tech. The curriculum is perfectly aligned with industry needs.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👩‍🎓</span>
                </div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer, Google</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg mb-4">
                &ldquo;The flexible learning options allowed me to balance my studies with work. The support from faculty and career services was exceptional.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <div>
                  <h4 className="font-semibold">David Kim</h4>
                  <p className="text-sm text-muted-foreground">Product Manager, Microsoft</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-primary/5 rounded-lg p-8 mb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To empower individuals with cutting-edge technical education and practical skills, 
            preparing them for successful careers in the ever-evolving digital landscape. We 
            strive to create an inclusive learning environment that fosters innovation, 
            critical thinking, and professional growth.
          </p>
        </div>
      </div>
    </div>
  )
}