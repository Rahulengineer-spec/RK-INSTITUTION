"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Users, GraduationCap, Globe, Clock, Quote, Linkedin, Twitter, Mail, ChevronLeft, ChevronRight } from "lucide-react"
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

const mission = "To empower individuals with cutting-edge technical education and practical skills, preparing them for successful careers in the ever-evolving digital landscape."
const vision = "To be a global leader in innovative, accessible, and inclusive education, shaping the future of learning and professional growth."

const timeline = [
  { year: 2020, title: "Foundation", description: "Rk Institution was established with a vision to transform education." },
  { year: 2021, title: "Growth", description: "Expanded our course offerings and welcomed 1000+ students." },
  { year: 2022, title: "Innovation", description: "Launched hybrid learning programs and industry partnerships." },
  { year: 2023, title: "Recognition", description: "Received multiple awards for educational excellence." },
  { year: 2024, title: "Supporters", description: "Backed by passionate educators, advisors, and our vibrant community." },
]

const founder = {
  name: "Manish Kumar",
  role: "Founder & Director",
  bio: "Founded Rk Institution with a vision to transform education through innovative teaching methods. Master in Mathematics with over 12 years of teaching excellence, dedicated to nurturing the next generation of learners.",
  image: "/team/founder.jpg",
  linkedin: "#",
  email: "#"
}

const supporters = [
  { name: "Priya Sharma", role: "Advisor", image: "/team/supporter1.jpg", linkedin: "#" },
  { name: "Rahul Verma", role: "Early Team", image: "/team/supporter2.jpg", linkedin: "#" },
  { name: "Anjali Patel", role: "Mentor", image: "/team/supporter3.jpg", linkedin: "#" },
]

const team = [
  { name: "Amit Singh", role: "Lead Instructor", image: "/team/amit.jpg", linkedin: "#" },
  { name: "Neha Gupta", role: "Course Designer", image: "/team/neha.jpg", linkedin: "#" },
  { name: "Ravi Kumar", role: "Tech Lead", image: "/team/ravi.jpg", linkedin: "#" },
  { name: "Sonia Mehra", role: "Student Success", image: "/team/sonia.jpg", linkedin: "#" },
  { name: "Vikas Jain", role: "Marketing", image: "/team/vikas.jpg", linkedin: "#" },
  { name: "Pooja Sinha", role: "Operations", image: "/team/pooja.jpg", linkedin: "#" },
]

const faqs = [
  {
    question: "Who is the owner of Rk Institution?",
    answer: "Rk Institution is owned and led by Mr. Ragha Kumar, who is dedicated to providing quality education and fostering student success."
  },
  {
    question: "In which year was Rk Institution established?",
    answer: "Rk Institution was established in 2016 with the vision to transform education."
  },
  {
    question: "What is the main focus of Rk Institution?",
    answer: "Our main focus is to empower students with practical skills and knowledge for successful careers in the digital era."
  },
  {
    question: "Where is Rk Institution located?",
    answer: "Rk Institution is located at Nanda Road, Adarsh Nagar, Delhi 110033. For more details, please visit our Contact page."
  },
  {
    question: "How can I contact Rk Institution?",
    answer: "You can reach us through the Contact Us page on our website or email us at info@rkinstitution.com."
  },
]

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const [teamIndex, setTeamIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamIndex((prev) => (prev + 3) % team.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-banner to-background/80 py-12">
      <div className="container">
      {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-4">About Rk Institution</h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto mb-4">
            Welcome to Rk Institution — where innovation meets education. Our mission and vision drive us to empower learners everywhere.
        </p>
      </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card-improved">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">{mission}</p>
            </CardContent>
          </Card>
          <Card className="glass-card-improved">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
              <p className="text-muted-foreground">{vision}</p>
            </CardContent>
          </Card>
        </div>

      {/* Stats Section */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="glass p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">5000+</h3>
          <p className="text-muted-foreground">Students Enrolled</p>
        </div>
        <div className="glass p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">150+</h3>
          <p className="text-muted-foreground">Expert Instructors</p>
        </div>
        <div className="glass p-8 text-center hover:bg-primary/10 transition-all hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">98%</h3>
          <p className="text-muted-foreground">Success Rate</p>
          </div>
        </div>

      {/* Timeline Section */}
        <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} mb-8`}
            >
              <div className="w-1/2" />
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
              <Card className={`w-1/2 glass-card-improved ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{item.year}</h3>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
            </div>

        {/* Founder Section */}
      <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Founder</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Card className="text-center group max-w-md w-full">
              <CardContent className="pt-6">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  <Image src={founder.image} alt={founder.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={founder.linkedin} className="text-white hover:text-white/80"><Linkedin className="h-6 w-6" /></Link>
                    <Link href={founder.email} className="text-white hover:text-white/80"><Mail className="h-6 w-6" /></Link>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                <p className="text-lg text-primary mb-2">{founder.role}</p>
                <p className="text-muted-foreground max-w-[600px] mx-auto mb-4">{founder.bio}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Supporters Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Main Supporters</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {supporters.map((s, i) => (
              <Card key={i} className="text-center group max-w-xs w-full">
              <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                    <Image src={s.image} alt={s.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={s.linkedin} className="text-white hover:text-white/80"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                  <p className="text-muted-foreground mb-2">{s.role}</p>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>

        {/* Dynamic Team Carousel */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => setTeamIndex((prev) => (prev - 3 + team.length) % team.length)}><ChevronLeft /></Button>
            <div className="grid gap-8 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => {
                const idx = (teamIndex + i) % team.length;
                const t = team[idx];
                return (
                  <Card key={idx} className="text-center group max-w-xs w-full transition-all duration-700">
              <CardContent className="pt-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={t.linkedin} className="text-white hover:text-white/80"><Linkedin className="h-5 w-5" /></Link>
                  </div>
                </div>
                      <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
                      <p className="text-muted-foreground mb-2">{t.role}</p>
              </CardContent>
            </Card>
                );
              })}
            </div>
            <Button variant="outline" size="icon" onClick={() => setTeamIndex((prev) => (prev + 3) % team.length)}><ChevronRight /></Button>
          </div>
        </div>

        {/* Contact CTA Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary/5 rounded-lg p-12 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-[600px] mx-auto">
            Join thousands of students who have transformed their careers with Rk Institution. Get in touch with our admissions team today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Apply Now</Button>
            <Button size="lg" variant="outline">Contact Us</Button>
      </div>
        </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
          <div className="max-w-[800px] mx-auto">
            <div className="glass-card-improved p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                <Quote className="w-8 h-8 text-primary" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10 rounded-lg overflow-hidden">
                    <AccordionTrigger className="text-lg font-semibold hover:bg-primary/5 transition-colors px-4 py-3 flex items-center">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-4 pb-4">
                      {faq.answer}
                    </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}