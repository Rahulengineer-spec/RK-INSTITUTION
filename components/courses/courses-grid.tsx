"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { debounce } from "lodash"
import Script from 'next/script'
import Image from 'next/image'
import ErrorBoundary from '@/components/ui/error-boundary'

interface Course {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  students: number
  instructor: string
  price: number
  originalPrice?: number
  image: string
  syllabus: string[]
  prerequisites: string[]
  language: string
  lastUpdated: string
  lectures: number
  totalHours: number
  certificate: boolean
  bestSeller: boolean
  previewVideo?: string
  whatYouWillLearn: string[]
  requirements: string[]
  targetAudience: string[]
}

interface CoursesGridProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLevel: string;
  selectedPrice: string;
  selectedLanguage: string;
  sortBy: string;
}

export function CoursesGrid({
  searchQuery,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  selectedLanguage,
  sortBy,
}: CoursesGridProps) {
  const { toast } = useToast()
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [purchaseStep, setPurchaseStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  const [courses] = useState<Course[]>([
    {
      id: "cs101",
      title: "Complete Python Bootcamp: From Zero to Hero",
      description: "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
      category: "Development",
      subcategory: "Programming Languages",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 2500,
      instructor: "Dr. Sarah Johnson",
      price: 99.99,
      originalPrice: 199.99,
      image: "/courses/cs101.jpg",
      syllabus: [
        "Python Basics",
        "Object-Oriented Programming",
        "Data Structures",
        "Web Development",
        "Game Development",
        "Data Science"
      ],
      prerequisites: ["Basic Mathematics", "No prior programming experience required"],
      language: "English",
      lastUpdated: "2024-03-15",
      lectures: 45,
      totalHours: 24,
      certificate: true,
      bestSeller: true,
      previewVideo: "https://example.com/preview.mp4",
      whatYouWillLearn: [
        "Master Python programming fundamentals",
        "Build real-world applications",
        "Create games using Python",
        "Work with databases and APIs",
        "Develop web applications"
      ],
      requirements: [
        "Basic computer knowledge",
        "No prior programming experience needed",
        "A computer with internet access"
      ],
      targetAudience: [
        "Beginners who want to learn programming",
        "Students looking to start a career in tech",
        "Professionals wanting to add Python to their skillset"
      ]
    },
    // Academic Courses for 6th to 12th
    {
      id: "math-6-8",
      title: "Mathematics (Class 6-8)",
      description: "Comprehensive math course covering numbers, algebra, geometry, and more for classes 6 to 8.",
      category: "Academics",
      subcategory: "Mathematics",
      duration: "36 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 1200,
      instructor: "Mr. Raghav Mehta",
      price: 0,
      image: "/courses/math-6-8.jpg",
      syllabus: ["Numbers & Operations", "Algebra Basics", "Geometry", "Data Handling", "Mensuration"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 60,
      totalHours: 40,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Master basic math concepts", "Solve real-life problems", "Prepare for higher classes"],
      requirements: ["Interest in math"],
      targetAudience: ["Students of class 6-8"]
    },
    {
      id: "science-6-8",
      title: "Science (Class 6-8)",
      description: "Explore the fundamentals of Physics, Chemistry, and Biology for classes 6 to 8.",
      category: "Academics",
      subcategory: "Science",
      duration: "36 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 1100,
      instructor: "Ms. Priya Sharma",
      price: 0,
      image: "/courses/science-6-8.jpg",
      syllabus: ["Physics Basics", "Chemistry in Daily Life", "Introduction to Biology", "Experiments"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 55,
      totalHours: 38,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Understand scientific concepts", "Perform simple experiments", "Build curiosity"],
      requirements: ["Curiosity about science"],
      targetAudience: ["Students of class 6-8"]
    },
    {
      id: "english-6-8",
      title: "English (Class 6-8)",
      description: "Improve grammar, vocabulary, and writing skills for classes 6 to 8.",
      category: "Academics",
      subcategory: "English",
      duration: "36 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 900,
      instructor: "Ms. Anjali Patel",
      price: 0,
      image: "/courses/english-6-8.jpg",
      syllabus: ["Grammar", "Vocabulary", "Reading Comprehension", "Writing Skills"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 50,
      totalHours: 35,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Improve English language skills", "Write better essays", "Expand vocabulary"],
      requirements: ["Interest in English"],
      targetAudience: ["Students of class 6-8"]
    },
    {
      id: "math-9-10",
      title: "Mathematics (Class 9-10)",
      description: "In-depth math course for classes 9 and 10, covering algebra, geometry, trigonometry, and more.",
      category: "Academics",
      subcategory: "Mathematics",
      duration: "40 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1500,
      instructor: "Mr. Manish Kumar",
      price: 0,
      image: "/courses/math-9-10.jpg",
      syllabus: ["Algebra", "Geometry", "Trigonometry", "Statistics", "Probability"],
      prerequisites: ["Class 8 Math"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 70,
      totalHours: 50,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Excel in board exams", "Master advanced math topics", "Problem-solving skills"],
      requirements: ["Class 8 math knowledge"],
      targetAudience: ["Students of class 9-10"]
    },
    {
      id: "science-9-10",
      title: "Science (Class 9-10)",
      description: "Detailed science course for classes 9 and 10, including Physics, Chemistry, and Biology.",
      category: "Academics",
      subcategory: "Science",
      duration: "40 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 1400,
      instructor: "Dr. Rahul Verma",
      price: 0,
      image: "/courses/science-9-10.jpg",
      syllabus: ["Physics: Motion & Force", "Chemistry: Atoms & Molecules", "Biology: Life Processes"],
      prerequisites: ["Class 8 Science"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 65,
      totalHours: 48,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Score high in science exams", "Understand key concepts", "Apply science in daily life"],
      requirements: ["Class 8 science knowledge"],
      targetAudience: ["Students of class 9-10"]
    },
    {
      id: "english-9-10",
      title: "English (Class 9-10)",
      description: "Advanced English course for classes 9 and 10, focusing on literature, grammar, and writing.",
      category: "Academics",
      subcategory: "English",
      duration: "40 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 1000,
      instructor: "Ms. Sonia Mehra",
      price: 0,
      image: "/courses/english-9-10.jpg",
      syllabus: ["Literature", "Advanced Grammar", "Essay Writing", "Comprehension"],
      prerequisites: ["Class 8 English"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 60,
      totalHours: 42,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Master English literature", "Write advanced essays", "Improve comprehension"],
      requirements: ["Class 8 English knowledge"],
      targetAudience: ["Students of class 9-10"]
    },
    {
      id: "physics-11-12",
      title: "Physics (Class 11-12)",
      description: "Comprehensive Physics course for classes 11 and 12, covering mechanics, electricity, optics, and more.",
      category: "Academics",
      subcategory: "Physics",
      duration: "48 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 900,
      instructor: "Dr. Vikas Jain",
      price: 0,
      image: "/courses/physics-11-12.jpg",
      syllabus: ["Mechanics", "Waves & Oscillations", "Electricity & Magnetism", "Optics", "Modern Physics"],
      prerequisites: ["Class 10 Science"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 80,
      totalHours: 60,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Crack competitive exams", "Deep understanding of physics", "Problem-solving"],
      requirements: ["Class 10 science knowledge"],
      targetAudience: ["Students of class 11-12"]
    },
    {
      id: "chemistry-11-12",
      title: "Chemistry (Class 11-12)",
      description: "In-depth Chemistry course for classes 11 and 12, including organic, inorganic, and physical chemistry.",
      category: "Academics",
      subcategory: "Chemistry",
      duration: "48 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 850,
      instructor: "Dr. Pooja Sinha",
      price: 0,
      image: "/courses/chemistry-11-12.jpg",
      syllabus: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Practical Chemistry"],
      prerequisites: ["Class 10 Science"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 75,
      totalHours: 58,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Excel in board & entrance exams", "Master chemistry concepts", "Lab skills"],
      requirements: ["Class 10 science knowledge"],
      targetAudience: ["Students of class 11-12"]
    },
    {
      id: "biology-11-12",
      title: "Biology (Class 11-12)",
      description: "Detailed Biology course for classes 11 and 12, covering cell biology, genetics, ecology, and more.",
      category: "Academics",
      subcategory: "Biology",
      duration: "48 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 800,
      instructor: "Dr. Neha Gupta",
      price: 0,
      image: "/courses/biology-11-12.jpg",
      syllabus: ["Cell Biology", "Genetics", "Human Physiology", "Ecology", "Biotechnology"],
      prerequisites: ["Class 10 Science"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 70,
      totalHours: 55,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Prepare for NEET & board exams", "Understand biology deeply", "Lab & field skills"],
      requirements: ["Class 10 science knowledge"],
      targetAudience: ["Students of class 11-12"]
    },
    {
      id: "computer-11-12",
      title: "Computer Science (Class 11-12)",
      description: "Modern Computer Science course for classes 11 and 12, including programming, algorithms, and data structures.",
      category: "Academics",
      subcategory: "Computer Science",
      duration: "48 weeks",
      level: "Advanced",
      rating: 4.7,
      students: 700,
      instructor: "Mr. Ravi Kumar",
      price: 0,
      image: "/courses/computer-11-12.jpg",
      syllabus: ["Programming in Python/Java", "Data Structures", "Algorithms", "Database Basics", "Project Work"],
      prerequisites: ["Class 10 Math/Science"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 65,
      totalHours: 50,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Learn to code", "Build projects", "Prepare for CS exams"],
      requirements: ["Class 10 math/science knowledge"],
      targetAudience: ["Students of class 11-12"]
    },
    {
      id: "prog-python",
      title: "Programming with Python",
      description: "Learn Python programming from scratch. Ideal for beginners and those looking to automate tasks or build applications.",
      category: "Vocational",
      subcategory: "Programming",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1800,
      instructor: "Ms. Neha Gupta",
      price: 49.99,
      image: "/courses/prog-python.jpg",
      syllabus: ["Python Basics", "Control Structures", "Functions", "Modules", "File Handling", "Projects"],
      prerequisites: ["Basic computer knowledge"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 40,
      totalHours: 30,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Write Python code", "Automate tasks", "Build simple apps"],
      requirements: ["Laptop or PC"],
      targetAudience: ["Anyone interested in programming"]
    },
    {
      id: "fullstack-dev",
      title: "Full Stack Web Development",
      description: "Become a full stack developer by learning HTML, CSS, JavaScript, React, Node.js, and databases. Build real-world web applications.",
      category: "Vocational",
      subcategory: "Web Development",
      duration: "24 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 1600,
      instructor: "Mr. Amit Singh",
      price: 99.99,
      image: "/courses/fullstack-dev.jpg",
      syllabus: ["HTML & CSS", "JavaScript", "React.js", "Node.js", "Express", "MongoDB", "Deployment"],
      prerequisites: ["Basic programming knowledge"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 80,
      totalHours: 60,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Build full stack apps", "Deploy web projects", "Work with databases"],
      requirements: ["Laptop or PC"],
      targetAudience: ["Aspiring web developers"]
    },
    {
      id: "ai-intro",
      title: "Introduction to Artificial Intelligence",
      description: "Explore the basics of AI, machine learning, and neural networks. Hands-on projects and real-world applications included.",
      category: "Vocational",
      subcategory: "Artificial Intelligence",
      duration: "16 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 1200,
      instructor: "Dr. Sonia Mehra",
      price: 79.99,
      image: "/courses/ai-intro.jpg",
      syllabus: ["AI Concepts", "Machine Learning", "Neural Networks", "Projects"],
      prerequisites: ["Basic programming", "Math fundamentals"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 50,
      totalHours: 40,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Understand AI basics", "Build simple ML models", "Apply AI in projects"],
      requirements: ["Laptop or PC"],
      targetAudience: ["Students, professionals"]
    },
    {
      id: "video-editing",
      title: "Video Editing Masterclass",
      description: "Master video editing using popular tools like Adobe Premiere Pro and DaVinci Resolve. Create professional-quality videos.",
      category: "Vocational",
      subcategory: "Video Editing",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 900,
      instructor: "Mr. Rahul Verma",
      price: 59.99,
      image: "/courses/video-editing.jpg",
      syllabus: ["Editing Basics", "Transitions", "Effects", "Color Grading", "Exporting"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 30,
      totalHours: 25,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Edit videos", "Add effects", "Export for YouTube/social media"],
      requirements: ["PC with editing software"],
      targetAudience: ["Content creators, students"]
    },
    {
      id: "basic-computer",
      title: "Basic Computer Skills",
      description: "Essential computer skills for beginners: Windows, MS Office, internet, email, and digital safety.",
      category: "Vocational",
      subcategory: "Computer Basics",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 2000,
      instructor: "Ms. Pooja Sinha",
      price: 29.99,
      image: "/courses/basic-computer.jpg",
      syllabus: ["Windows Basics", "MS Word", "Excel", "PowerPoint", "Internet & Email", "Digital Safety"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 25,
      totalHours: 20,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Use a computer", "Create documents", "Browse safely"],
      requirements: ["Access to a computer"],
      targetAudience: ["Absolute beginners"]
    },
    {
      id: "ethical-hacking",
      title: "Ethical Hacking & Cybersecurity",
      description: "Learn ethical hacking, penetration testing, and cybersecurity fundamentals. Protect systems and networks.",
      category: "Vocational",
      subcategory: "Cybersecurity",
      duration: "14 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 800,
      instructor: "Mr. Vikas Jain",
      price: 89.99,
      image: "/courses/ethical-hacking.jpg",
      syllabus: ["Ethical Hacking Basics", "Penetration Testing", "Network Security", "Tools & Techniques"],
      prerequisites: ["Basic networking"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 45,
      totalHours: 35,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: ["Test and secure systems", "Understand cyber threats", "Use hacking tools ethically"],
      requirements: ["Laptop or PC"],
      targetAudience: ["IT students, professionals"]
    },
    {
      id: "networking-basics",
      title: "Networking Basics",
      description: "Understand computer networks, protocols, and devices. Ideal for IT beginners and aspiring network engineers.",
      category: "Vocational",
      subcategory: "Networking",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 950,
      instructor: "Ms. Priya Sharma",
      price: 39.99,
      image: "/courses/networking-basics.jpg",
      syllabus: ["Network Types", "Protocols", "IP Addressing", "Routers & Switches", "Network Security"],
      prerequisites: ["Basic computer knowledge"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 28,
      totalHours: 22,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Understand networks", "Configure devices", "Troubleshoot issues"],
      requirements: ["Laptop or PC"],
      targetAudience: ["IT beginners, students"]
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering for AI",
      description: "Master the art of prompt engineering for AI models like ChatGPT. Learn to craft effective prompts for better results.",
      category: "Vocational",
      subcategory: "AI & ML",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 600,
      instructor: "Dr. Neha Gupta",
      price: 59.99,
      image: "/courses/prompt-engineering.jpg",
      syllabus: ["Prompt Basics", "Prompt Patterns", "Advanced Techniques", "Real-world Use Cases"],
      prerequisites: ["Basic AI knowledge"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 18,
      totalHours: 12,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Write effective prompts", "Boost AI productivity", "Apply prompt engineering in projects"],
      requirements: ["Interest in AI"],
      targetAudience: ["AI enthusiasts, professionals"]
    },
    {
      id: "trending-tech",
      title: "Trending Technologies 2024",
      description: "Stay ahead with an overview of trending technologies: Blockchain, IoT, Cloud Computing, AR/VR, and more.",
      category: "Vocational",
      subcategory: "Trending Tech",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 700,
      instructor: "Mr. Ravi Kumar",
      price: 69.99,
      image: "/courses/trending-tech.jpg",
      syllabus: ["Blockchain", "Internet of Things", "Cloud Computing", "AR/VR", "Future Trends"],
      prerequisites: ["None"],
      language: "English",
      lastUpdated: "2024-04-01",
      lectures: 20,
      totalHours: 16,
      certificate: true,
      bestSeller: false,
      whatYouWillLearn: ["Understand new tech", "Explore career opportunities", "Hands-on projects"],
      requirements: ["Curiosity about technology"],
      targetAudience: ["Students, tech enthusiasts"]
    },
    // Add more courses as needed...
  ])

  // Enhanced filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesPrice = selectedPrice === 'all' ||
        (selectedPrice === 'Free' && course.price === 0) ||
        (selectedPrice === 'Paid' && course.price > 0) ||
        (selectedPrice === 'Bestseller' && course.bestSeller);
      const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesLanguage;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice, selectedLanguage]);

  // Enhanced sorting logic
  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });
  }, [filteredCourses, sortBy]);

  // Udemy-style Course Card
  const CourseCard = ({ course }: { course: Course }) => (
    <div className={cn(
      "relative group bg-white rounded-2xl border border-primary/10 shadow-lg overflow-hidden transition-all duration-200 hover:shadow-2xl hover:border-primary cursor-pointer flex flex-col h-full min-h-[420px]",
      viewMode === 'list' ? 'flex-row h-48' : ''
    )}>
      {/* Course Image */}
      <div className={cn(
        "relative flex-shrink-0",
        viewMode === 'list' ? 'w-64 h-full' : 'w-full h-48'
      )}>
        <Image
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full"
          width={400}
          height={225}
          loading="lazy"
        />
        {/* Badges */}
        {course.bestSeller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">Bestseller</span>
        )}
        {course.rating >= 4.7 && !course.bestSeller && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Highest Rated</span>
        )}
      </div>
      {/* Card Content */}
      <div className={cn(
        "flex flex-col flex-1 p-4 gap-2 min-h-[180px] justify-between",
        viewMode === 'list' ? 'justify-between' : ''
      )}>
        <div>
          <h3 className="font-bold text-lg line-clamp-2 mb-1 text-gray-900">{course.title}</h3>
          <div className="text-xs text-muted-foreground mb-1">{course.instructor}</div>
          <div className="flex items-center gap-2 text-sm mb-1">
            <Icons.star className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{course.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({course.students.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Icons.clock className="w-4 h-4" />
            <span>{course.duration}</span>
            <Icons.graduationCap className="w-4 h-4 ml-2" />
            <span>{course.level}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm line-through text-muted-foreground">${course.originalPrice}</span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90 flex-1"
              onClick={() => {
                setSelectedCourse(course);
                setShowPreview(true);
              }}
            >
              <Icons.eye className="w-4 h-4 mr-1" /> Preview
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-primary hover:bg-primary/10 flex-1"
              onClick={() => handleAddToCart(course)}
              disabled={cart.some(c => c.id === course.id)}
            >
              <Icons.cart className="w-4 h-4 mr-1" />
              {cart.some(c => c.id === course.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        {/* List view: show more details */}
        {viewMode === 'list' && (
          <div className="mt-2 text-xs text-muted-foreground line-clamp-2">{course.description}</div>
        )}
      </div>
    </div>
  );

  const handleAddToCart = (course: Course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course])
      toast({
        title: "Course added to cart",
        description: `${course.title} has been added to your cart.`,
      })
    }
  }

  const handleRemoveFromCart = (courseId: string) => {
    const course = cart.find(item => item.id === courseId)
    setCart(cart.filter(item => item.id !== courseId))
    if (course) {
      toast({
        title: "Course removed",
        description: `${course.title} has been removed from your cart.`,
      })
    }
  }

  // Course Preview Dialog
  const CoursePreview = () => {
    if (!selectedCourse) return null;

    return (
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="max-w-2xl w-full mx-auto my-8 rounded-xl shadow-2xl bg-white p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowPreview(false)}
              aria-label="Close preview"
            >
              &times;
            </button>
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="text-base text-muted-foreground mb-2">{selectedCourse.description}</div>
              {selectedCourse.previewVideo && (
                <div className="aspect-video">
                  <iframe
                    src={selectedCourse.previewVideo}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What you&apos;ll learn</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCourse.whatYouWillLearn.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCourse.prerequisites.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => {
                    handleAddToCart(selectedCourse);
                    setShowPreview(false);
                  }}
                  disabled={cart.some(c => c.id === selectedCourse.id)}
                  className="w-full"
                >
                  {cart.some(c => c.id === selectedCourse.id) ? (
                    'In Cart'
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* View mode toggle only */}
          <div className="flex items-center gap-2 ml-auto" role="group" aria-label="View mode">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Icons.grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <Icons.list className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "grid gap-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-background",
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          )}
          role="list"
          aria-label="Course list"
        >
          {sortedCourses.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">No courses found.</div>
          ) : (
            sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>
        <div aria-live="polite" className="sr-only">
          {cart.length > 0 && `${cart.length} course${cart.length > 1 ? 's' : ''} in cart.`}
        </div>
        <CoursePreview />
        {/* Structured Data for SEO */}
        <Script
          id="courses-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": courses.map((course, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Course",
                  "name": course.title,
                  "description": course.description,
                  "provider": {
                    "@type": "Organization",
                    "name": "RK Institution",
                    "sameAs": "https://rkinstitution.com"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": course.price,
                    "priceCurrency": "USD"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": course.rating,
                    "ratingCount": course.students
                  }
                }
              }))
            })
          }}
        />
      </div>
    </ErrorBoundary>
  )
} 