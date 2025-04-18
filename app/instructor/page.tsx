"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, GraduationCap, BookOpen, Users, Award, Clock, MessageSquare, ArrowRight, Search, Filter, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Instructor {
  id: string
  name: string
  title: string
  image: string
  rating: number
  reviews: number
  students: number
  courses: number
  experience: string
  expertise: string[]
  bio: string
  achievements: string[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  social: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

const instructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    title: "Mathematics Expert",
    image: "/instructors/rajesh.jpg",
    rating: 4.9,
    reviews: 1250,
    students: 15000,
    courses: 8,
    experience: "15+ years",
    expertise: ["Mathematics", "Physics", "Problem Solving"],
    bio: "Dr. Rajesh Kumar is a renowned mathematics educator with over 15 years of experience. He has helped thousands of students achieve their academic goals and has been recognized for his innovative teaching methods.",
    achievements: [
      "Best Teacher Award 2023",
      "Published 5 research papers in mathematics education",
      "Mentored 100+ students to IIT entrance"
    ],
    education: [
      {
        degree: "Ph.D. in Mathematics",
        institution: "IIT Delhi",
        year: "2010"
      },
      {
        degree: "M.Sc. in Mathematics",
        institution: "University of Delhi",
        year: "2005"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/rajeshkumar",
      twitter: "https://twitter.com/rajeshkumar"
    }
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    title: "Science Specialist",
    image: "/instructors/priya.jpg",
    rating: 4.8,
    reviews: 980,
    students: 12000,
    courses: 6,
    experience: "12+ years",
    expertise: ["Physics", "Chemistry", "Biology"],
    bio: "Dr. Priya Sharma brings science to life with her engaging teaching style. Her ability to simplify complex concepts has made her one of the most sought-after science educators.",
    achievements: [
      "National Science Teacher Award 2022",
      "Author of 3 popular science books",
      "Developed innovative lab experiments"
    ],
    education: [
      {
        degree: "Ph.D. in Physics",
        institution: "IIT Bombay",
        year: "2012"
      },
      {
        degree: "M.Sc. in Physics",
        institution: "University of Mumbai",
        year: "2007"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/priyasharma",
      website: "https://priyasharma.com"
    }
  },
  {
    id: "3",
    name: "Prof. Amit Verma",
    title: "English Language Expert",
    image: "/instructors/amit.jpg",
    rating: 4.7,
    reviews: 850,
    students: 10000,
    courses: 5,
    experience: "10+ years",
    expertise: ["English Literature", "Creative Writing", "Communication Skills"],
    bio: "Prof. Amit Verma is a passionate English educator who has transformed the way students learn language and literature. His interactive teaching methods make learning enjoyable and effective.",
    achievements: [
      "Cambridge Certified English Teacher",
      "Published 2 books on language learning",
      "Conducted 50+ workshops on creative writing"
    ],
    education: [
      {
        degree: "M.A. in English Literature",
        institution: "University of Oxford",
        year: "2013"
      },
      {
        degree: "B.A. in English",
        institution: "University of Delhi",
        year: "2010"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/amitverma",
      twitter: "https://twitter.com/amitverma"
    }
  },
  {
    id: "4",
    name: "Dr. Neha Patel",
    title: "Computer Science Expert",
    image: "/instructors/neha.jpg",
    rating: 4.9,
    reviews: 1100,
    students: 14000,
    courses: 7,
    experience: "8+ years",
    expertise: ["Programming", "Data Structures", "Algorithms"],
    bio: "Dr. Neha Patel combines her industry experience with academic expertise to deliver practical and engaging computer science courses. Her students consistently achieve top placements in tech companies.",
    achievements: [
      "Google Certified Developer",
      "Microsoft MVP Award",
      "Created popular coding tutorials"
    ],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2015"
      },
      {
        degree: "M.Tech in Computer Science",
        institution: "IIT Bombay",
        year: "2012"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/nehapatel",
      website: "https://nehapatel.com"
    }
  },
  {
    id: "5",
    name: "Prof. Ravi Singh",
    title: "Chemistry Specialist",
    image: "/instructors/ravi.jpg",
    rating: 4.8,
    reviews: 920,
    students: 11000,
    courses: 6,
    experience: "14+ years",
    expertise: ["Organic Chemistry", "Physical Chemistry", "Chemical Reactions"],
    bio: "Prof. Ravi Singh's unique approach to teaching chemistry has helped students overcome their fear of the subject. His practical demonstrations and real-world applications make learning chemistry fun and engaging.",
    achievements: [
      "National Chemistry Teacher Award",
      "Published research in chemical education",
      "Developed innovative teaching methods"
    ],
    education: [
      {
        degree: "Ph.D. in Chemistry",
        institution: "IIT Kanpur",
        year: "2009"
      },
      {
        degree: "M.Sc. in Chemistry",
        institution: "University of Delhi",
        year: "2004"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/ravisingh",
      twitter: "https://twitter.com/ravisingh"
    }
  },
  {
    id: "6",
    name: "Dr. Ananya Gupta",
    title: "Biology Expert",
    image: "/instructors/ananya.jpg",
    rating: 4.7,
    reviews: 780,
    students: 9500,
    courses: 5,
    experience: "11+ years",
    expertise: ["Botany", "Zoology", "Human Physiology"],
    bio: "Dr. Ananya Gupta's passion for biology is infectious. Her detailed explanations and visual teaching methods help students understand complex biological concepts with ease.",
    achievements: [
      "Best Biology Teacher Award",
      "Published research in biology education",
      "Conducted field studies in biodiversity"
    ],
    education: [
      {
        degree: "Ph.D. in Biology",
        institution: "University of Cambridge",
        year: "2012"
      },
      {
        degree: "M.Sc. in Biology",
        institution: "University of Delhi",
        year: "2008"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/ananyagupta",
      website: "https://ananyagupta.com"
    }
  },
  {
    id: "7",
    name: "Prof. Vikram Malhotra",
    title: "Physics Expert",
    image: "/instructors/vikram.jpg",
    rating: 4.9,
    reviews: 1050,
    students: 13000,
    courses: 7,
    experience: "13+ years",
    expertise: ["Mechanics", "Electromagnetism", "Modern Physics"],
    bio: "Prof. Vikram Malhotra's ability to simplify complex physics concepts has made him one of the most popular physics educators. His students consistently achieve top scores in competitive exams.",
    achievements: [
      "National Physics Teacher Award",
      "Published physics textbooks",
      "Developed innovative teaching aids"
    ],
    education: [
      {
        degree: "Ph.D. in Physics",
        institution: "IIT Madras",
        year: "2010"
      },
      {
        degree: "M.Sc. in Physics",
        institution: "University of Delhi",
        year: "2005"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/vikrammalhotra",
      twitter: "https://twitter.com/vikrammalhotra"
    }
  },
  {
    id: "8",
    name: "Dr. Meera Kapoor",
    title: "History Expert",
    image: "/instructors/meera.jpg",
    rating: 4.8,
    reviews: 890,
    students: 10500,
    courses: 6,
    experience: "9+ years",
    expertise: ["World History", "Indian History", "Political Science"],
    bio: "Dr. Meera Kapoor brings history to life with her storytelling approach. Her engaging teaching style and in-depth knowledge make history interesting and relevant to students.",
    achievements: [
      "Best History Teacher Award",
      "Published historical research",
      "Conducted heritage walks"
    ],
    education: [
      {
        degree: "Ph.D. in History",
        institution: "JNU",
        year: "2014"
      },
      {
        degree: "M.A. in History",
        institution: "University of Delhi",
        year: "2010"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/meerakapoor",
      website: "https://meerakapoor.com"
    }
  },
  {
    id: "9",
    name: "Prof. Arjun Reddy",
    title: "Economics Expert",
    image: "/instructors/arjun.jpg",
    rating: 4.7,
    reviews: 820,
    students: 9800,
    courses: 5,
    experience: "10+ years",
    expertise: ["Microeconomics", "Macroeconomics", "Economic Policy"],
    bio: "Prof. Arjun Reddy's practical approach to teaching economics helps students understand real-world economic concepts. His interactive teaching methods make complex economic theories accessible.",
    achievements: [
      "Economic Education Award",
      "Published economic research",
      "Consulted for government agencies"
    ],
    education: [
      {
        degree: "Ph.D. in Economics",
        institution: "London School of Economics",
        year: "2013"
      },
      {
        degree: "M.A. in Economics",
        institution: "University of Delhi",
        year: "2009"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/arjunreddy",
      twitter: "https://twitter.com/arjunreddy"
    }
  },
  {
    id: "10",
    name: "Dr. Sneha Joshi",
    title: "Geography Expert",
    image: "/instructors/sneha.jpg",
    rating: 4.8,
    reviews: 910,
    students: 10800,
    courses: 6,
    experience: "12+ years",
    expertise: ["Physical Geography", "Human Geography", "Environmental Studies"],
    bio: "Dr. Sneha Joshi's passion for geography and environmental studies is evident in her teaching. Her field-based approach helps students understand geographical concepts through real-world examples.",
    achievements: [
      "Geography Education Award",
      "Published environmental research",
      "Conducted field studies"
    ],
    education: [
      {
        degree: "Ph.D. in Geography",
        institution: "University of Oxford",
        year: "2011"
      },
      {
        degree: "M.Sc. in Geography",
        institution: "University of Delhi",
        year: "2007"
      }
    ],
    social: {
      linkedin: "https://linkedin.com/in/snehajoshi",
      website: "https://snehajoshi.com"
    }
  }
]

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)

  const expertiseOptions = Array.from(new Set(instructors.flatMap(instructor => instructor.expertise)))

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExpertise = selectedExpertise.length === 0 ||
      selectedExpertise.some(expertise => instructor.expertise.includes(expertise))
    return matchesSearch && matchesExpertise
  })

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Meet Our Expert Instructors</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Learn from the best educators who are passionate about teaching and have years of experience in their fields.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search instructors by name or expertise..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter by expertise:</span>
            {expertiseOptions.map((expertise) => (
              <Badge
                key={expertise}
                variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => {
                  setSelectedExpertise(prev =>
                    prev.includes(expertise)
                      ? prev.filter(e => e !== expertise)
                      : [...prev, expertise]
                  )
                }}
              >
                {expertise}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Instructor Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {instructor.rating}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{instructor.name}</CardTitle>
              <CardDescription className="line-clamp-1">{instructor.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{instructor.experience} experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{instructor.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{instructor.courses} courses</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {instructor.expertise.length > 2 && (
                  <Badge variant="secondary">+{instructor.expertise.length - 2} more</Badge>
                )}
              </div>
            </CardContent>
            <div className="p-4 pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedInstructor(instructor)}>
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                {selectedInstructor && (
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{selectedInstructor.name}</DialogTitle>
                      <CardDescription>{selectedInstructor.title}</CardDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                            src={selectedInstructor.image}
                            alt={selectedInstructor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-500 mr-1" />
                              <span className="font-semibold">{selectedInstructor.rating}</span>
                              <span className="text-muted-foreground ml-1">
                                ({selectedInstructor.reviews.toLocaleString()} reviews)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-primary mr-1" />
                              <span className="text-muted-foreground">
                                {selectedInstructor.students.toLocaleString()} students
                              </span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-primary mr-1" />
                              <span className="text-muted-foreground">
                                {selectedInstructor.courses} courses
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedInstructor.expertise.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-muted-foreground">{selectedInstructor.bio}</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <div className="space-y-2">
                          {selectedInstructor.education.map((edu, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <GraduationCap className="h-5 w-5 text-primary mt-1" />
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground">{edu.year}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Achievements</h3>
                        <div className="space-y-2">
                          {selectedInstructor.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Award className="h-5 w-5 text-primary mt-1" />
                              <p className="text-muted-foreground">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedInstructor.social && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Connect</h3>
                          <div className="flex gap-4">
                            {selectedInstructor.social.linkedin && (
                              <a
                                href={selectedInstructor.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                LinkedIn
                              </a>
                            )}
                            {selectedInstructor.social.twitter && (
                              <a
                                href={selectedInstructor.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Twitter
                              </a>
                            )}
                            {selectedInstructor.social.website && (
                              <a
                                href={selectedInstructor.social.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
