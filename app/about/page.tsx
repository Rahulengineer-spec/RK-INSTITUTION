"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Users, GraduationCap, Globe, Clock, Quote, Linkedin, Twitter, Mail, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface CountUpProps {
  end: number
  duration?: number
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(countRef)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        setCount(Math.min(Math.floor((progress / duration) * end), end))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    if (isInView) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={countRef}>{count}</span>
}

const timeline = [
  { year: 2020, title: "Foundation", description: "EduTech Institute was established with a vision to transform education" },
  { year: 2021, title: "Growth", description: "Expanded our course offerings and welcomed 1000+ students" },
  { year: 2022, title: "Innovation", description: "Launched hybrid learning programs and industry partnerships" },
  { year: 2023, title: "Recognition", description: "Received multiple awards for educational excellence" },
]

const faqs = [
  {
    question: "What makes EduTech Institute unique?",
    answer: "We combine cutting-edge technology with expert instruction and practical industry experience to provide a comprehensive learning experience."
  },
  {
    question: "Are the courses accredited?",
    answer: "Yes, all our courses are accredited by relevant industry bodies and recognized globally."
  },
  {
    question: "What support do students receive?",
    answer: "Students receive comprehensive support including mentorship, career guidance, and placement assistance."
  },
  {
    question: "Can I learn at my own pace?",
    answer: "Yes, we offer flexible learning options with both self-paced and structured programs to suit your schedule."
  },
]

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">About EduTech Institute</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Transforming education through technology and innovation since 2020. We&apos;re committed to 
          providing world-class education that prepares students for the digital future.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-3 mb-16"
      >
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
          <h3 className="text-4xl font-bold mb-2"><CountUp end={5000} />+</h3>
          <p className="text-muted-foreground">Students Enrolled</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
          <h3 className="text-4xl font-bold mb-2"><CountUp end={150} />+</h3>
          <p className="text-muted-foreground">Expert Instructors</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
          <h3 className="text-4xl font-bold mb-2"><CountUp end={98} />%</h3>
          <p className="text-muted-foreground">Success Rate</p>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div 
        style={{ scale }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } mb-8`}
            >
              <div className="w-1/2" />
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
              <Card className={`w-1/2 ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{item.year}</h3>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
      >
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
      </motion.div>

      {/* Leadership Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="text-center group">
              <CardContent className="pt-6">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  <span className="text-5xl group-hover:scale-110 transition-transform">👨‍🏫</span>
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="#" className="text-white hover:text-white/80">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      <Mail className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Manish Kumar</h3>
                <p className="text-lg text-primary mb-2">Founder & Director</p>
                <p className="text-muted-foreground max-w-[600px] mx-auto mb-4">
                  Founded RK INSTITUTION with a vision to transform education through innovative teaching methods. 
                  Master in Mathematics with over 12 years of teaching excellence, dedicated to nurturing the next 
                  generation of learners.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12+</p>
                    <p className="text-sm text-muted-foreground">Years Teaching</p>
                  </div>
                  <div className="h-8 w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">5000+</p>
                    <p className="text-sm text-muted-foreground">Students Mentored</p>
                  </div>
                  <div className="h-8 w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="text-center group">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👩‍🏫</span>
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="#" className="text-white hover:text-white/80">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-muted-foreground mb-2">Academic Director</p>
                <p className="text-sm text-muted-foreground">
                  Expert in curriculum development and educational innovation
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="text-center group">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👨‍💻</span>
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="#" className="text-white hover:text-white/80">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-white hover:text-white/80">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                <p className="text-muted-foreground mb-2">Technical Director</p>
                <p className="text-sm text-muted-foreground">
                  Leading our technology initiatives and digital transformation
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-[800px] mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Contact CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary/5 rounded-lg p-12 text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-[600px] mx-auto">
          Join thousands of students who have transformed their careers with EduTech Institute.
          Get in touch with our admissions team today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            Apply Now
          </Button>
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-primary/5 rounded-lg p-8 mb-16"
      >
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To empower individuals with cutting-edge technical education and practical skills, 
            preparing them for successful careers in the ever-evolving digital landscape. We 
            strive to create an inclusive learning environment that fosters innovation, 
            critical thinking, and professional growth.
          </p>
        </div>
      </motion.div>
    </div>
  )
}