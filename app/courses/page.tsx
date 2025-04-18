"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Clock, Users, BookOpen, Star, GraduationCap, Search, Filter, ChevronDown, X, ShoppingCart, Eye, Check, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import Script from 'next/script'

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

export default function CoursesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
  const [cart, setCart] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [purchaseStep, setPurchaseStep] = useState(0)

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
    {
      id: "ml101",
      title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
      description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
      category: "Data Science",
      subcategory: "Machine Learning",
      duration: "15 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 3000,
      instructor: "Dr. David Kim",
      price: 149.99,
      originalPrice: 249.99,
      image: "/courses/ml101.jpg",
      syllabus: [
        "Data Preprocessing",
        "Regression",
        "Classification",
        "Clustering",
        "Deep Learning",
        "Natural Language Processing"
      ],
      prerequisites: ["Python Programming", "Linear Algebra", "Probability"],
      language: "English",
      lastUpdated: "2024-02-20",
      lectures: 60,
      totalHours: 40,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Master machine learning algorithms",
        "Build predictive models",
        "Work with real-world datasets",
        "Implement deep learning solutions",
        "Deploy ML models in production"
      ],
      requirements: [
        "Basic Python programming knowledge",
        "Understanding of statistics",
        "Familiarity with linear algebra",
        "A computer with Python installed"
      ],
      targetAudience: [
        "Data scientists",
        "Software engineers",
        "Analysts",
        "Students interested in ML"
      ]
    },
    {
      id: "math101",
      title: "Class 10 Mathematics - Complete Course",
      description: "Master Class 10 Mathematics with comprehensive coverage of all topics including Algebra, Geometry, Trigonometry, and Statistics.",
      category: "Mathematics",
      subcategory: "Class 10",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 4500,
      instructor: "Prof. Rajesh Kumar",
      price: 99.99,
      originalPrice: 199.99,
      image: "/courses/math101.jpg",
      syllabus: [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Triangles",
        "Coordinate Geometry",
        "Trigonometry",
        "Mensuration",
        "Statistics and Probability"
      ],
      prerequisites: ["Class 9 Mathematics"],
      language: "English",
      lastUpdated: "2024-03-01",
      lectures: 50,
      totalHours: 60,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Solve complex mathematical problems",
        "Understand mathematical concepts thoroughly",
        "Apply mathematical knowledge to real-world situations",
        "Develop problem-solving skills",
        "Prepare for board examinations"
      ],
      requirements: [
        "Basic knowledge of Class 9 Mathematics",
        "Scientific calculator",
        "Notebook for practice"
      ],
      targetAudience: [
        "Class 10 students",
        "Students preparing for board exams",
        "Anyone interested in learning mathematics"
      ]
    },
    {
      id: "science101",
      title: "Class 10 Science - Physics, Chemistry & Biology",
      description: "Comprehensive course covering all three branches of Science for Class 10 students with practical demonstrations and experiments.",
      category: "Science",
      subcategory: "Class 10",
      duration: "15 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 3800,
      instructor: "Dr. Priya Sharma",
      price: 129.99,
      originalPrice: 249.99,
      image: "/courses/science101.jpg",
      syllabus: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and its Compounds",
        "Life Processes",
        "Control and Coordination",
        "Light - Reflection and Refraction",
        "Human Eye and Colorful World",
        "Electricity",
        "Magnetic Effects of Electric Current"
      ],
      prerequisites: ["Class 9 Science"],
      language: "English",
      lastUpdated: "2024-02-15",
      lectures: 60,
      totalHours: 75,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Understand scientific concepts through experiments",
        "Learn practical applications of scientific principles",
        "Develop scientific thinking and reasoning",
        "Master problem-solving in Physics, Chemistry, and Biology",
        "Prepare for practical examinations"
      ],
      requirements: [
        "Basic knowledge of Class 9 Science",
        "Access to basic laboratory equipment",
        "Notebook for recording observations"
      ],
      targetAudience: [
        "Class 10 students",
        "Science enthusiasts",
        "Students preparing for competitive exams"
      ]
    },
    {
      id: "english101",
      title: "Class 10 English - Language & Literature",
      description: "Master English language skills and literature analysis for Class 10 with comprehensive grammar, writing, and reading comprehension modules.",
      category: "English",
      subcategory: "Class 10",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 3200,
      instructor: "Ms. Ananya Singh",
      price: 89.99,
      originalPrice: 179.99,
      image: "/courses/english101.jpg",
      syllabus: [
        "Reading Comprehension",
        "Writing Skills",
        "Grammar and Vocabulary",
        "Literature Analysis",
        "Speaking and Listening Skills",
        "Creative Writing",
        "Letter and Essay Writing",
        "Story and Poetry Analysis"
      ],
      prerequisites: ["Basic English knowledge"],
      language: "English",
      lastUpdated: "2024-03-10",
      lectures: 40,
      totalHours: 50,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Improve reading and writing skills",
        "Master English grammar",
        "Develop creative writing abilities",
        "Enhance communication skills",
        "Analyze literature effectively"
      ],
      requirements: [
        "Basic understanding of English",
        "Access to study materials",
        "Regular practice time"
      ],
      targetAudience: [
        "Class 10 students",
        "English language learners",
        "Students preparing for language exams"
      ]
    },
    {
      id: "math201",
      title: "Class 12 Mathematics - Advanced Course",
      description: "Advanced mathematics course for Class 12 students covering Calculus, Algebra, and Vectors with detailed problem-solving techniques.",
      category: "Mathematics",
      subcategory: "Class 12",
      duration: "16 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 2800,
      instructor: "Prof. Amit Verma",
      price: 149.99,
      originalPrice: 299.99,
      image: "/courses/math201.jpg",
      syllabus: [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        "Continuity and Differentiability",
        "Applications of Derivatives",
        "Integrals",
        "Applications of Integrals",
        "Differential Equations",
        "Vector Algebra",
        "Three Dimensional Geometry",
        "Probability"
      ],
      prerequisites: ["Class 11 Mathematics"],
      language: "English",
      lastUpdated: "2024-02-20",
      lectures: 65,
      totalHours: 80,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Master advanced mathematical concepts",
        "Solve complex calculus problems",
        "Understand vector algebra applications",
        "Develop analytical thinking",
        "Prepare for competitive exams"
      ],
      requirements: [
        "Strong foundation in Class 11 Mathematics",
        "Scientific calculator",
        "Graph paper and mathematical tools"
      ],
      targetAudience: [
        "Class 12 students",
        "Engineering aspirants",
        "Students preparing for competitive exams"
      ]
    },
    // Add more courses here...
  ])

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "data-science", name: "Data Science" },
  ]

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ]

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "newest", name: "Newest" },
    { id: "highest-rated", name: "Highest Rated" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
  ]

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(course => course.category.toLowerCase() === selectedCategory)
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      result = result.filter(course => course.level.toLowerCase() === selectedLevel)
    }

    // Apply price filter
    result = result.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    )

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case "highest-rated":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      default: // popular
        result.sort((a, b) => b.students - a.students)
    }

    return result
  }, [courses, searchQuery, selectedCategory, selectedLevel, priceRange, sortBy])

  const handleAddToCart = (course: Course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course])
      toast({
        title: "Course added to cart",
        description: `${course.title} has been added to your cart.`,
      })
    } else {
      toast({
        title: "Course already in cart",
        description: `${course.title} is already in your cart.`,
        variant: "destructive",
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

  const totalPrice = cart.reduce((sum, course) => sum + course.price, 0)

  const handlePurchase = () => {
    setPurchaseStep(1)
    toast({
      title: "Proceeding to checkout",
      description: "Please enter your payment information to complete the purchase.",
    })
  }

  const handlePaymentComplete = () => {
    setPurchaseStep(2)
    setCart([])
    toast({
      title: "Purchase Complete",
      description: "You have successfully purchased the course. You can now access it in your dashboard.",
      variant: "default",
    })
  }

  const structuredData = {
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
          "name": "EduLearn",
          "sameAs": "https://edulearn.com"
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
  }

  return (
    <>
      <Script
        id="courses-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <div className="w-full py-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Find Your Perfect Course</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Learn from industry experts with practical, hands-on courses designed to boost your career.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="w-full mb-8 px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")} />
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-4 mb-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => setSelectedCategory(category.id)}
                      />
                      <Label htmlFor={category.id}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={level.id}
                        checked={selectedLevel === level.id}
                        onCheckedChange={() => setSelectedLevel(level.id)}
                      />
                      <Label htmlFor={level.id}>{level.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={10}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Course Grid */}
      <div className="w-full px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  {/* Replace with actual image */}
                  <div className="w-full h-full bg-primary/10" />
                </div>
                {course.bestSeller && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-500">
                    Bestseller
                  </Badge>
                )}
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.totalHours} total hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lectures} lectures</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">${course.price}</div>
                  {course.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${course.originalPrice}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <DialogTitle>Course Preview</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          {course.previewVideo ? (
                            <video
                              src={course.previewVideo}
                              controls
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <span className="text-muted-foreground">Preview not available</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">What you&apos;ll learn</h3>
                          <ul className="grid grid-cols-2 gap-2">
                            {course.whatYouWillLearn.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Requirements</h3>
                          <ul className="space-y-2">
                            {course.requirements.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Who this course is for</h3>
                          <ul className="space-y-2">
                            {course.targetAudience.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" onClick={() => handleAddToCart(course)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart and Purchase Flow */}
      {cart.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-4 right-4">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cart.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Your Shopping Cart</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {purchaseStep === 0 && (
                <>
                  <div className="space-y-4">
                    {cart.map((course) => (
                      <div key={course.id} className="flex items-start gap-4">
                        <div className="w-24 h-16 bg-muted rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">${course.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromCart(course.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
                    <Button onClick={handlePurchase}>Proceed to Checkout</Button>
                  </div>
                </>
              )}
              {purchaseStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Payment Information</h3>
                    <div className="grid gap-4">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Expiry Date" />
                        <Input placeholder="CVV" />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handlePaymentComplete}>Complete Purchase</Button>
                </div>
              )}
              {purchaseStep === 2 && (
                <div className="text-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold">Purchase Complete!</h3>
                  <p className="text-muted-foreground">
                    Thank you for your purchase. You can now access your courses in your dashboard.
                  </p>
                  <Button>Go to Dashboard</Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}