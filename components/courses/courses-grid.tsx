"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

export function CoursesGrid() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
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
    // Add more courses as needed...
  ])

  // Enhanced filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

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

  // Enhanced search with debounce
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Course Card Component
  const CourseCard = ({ course }: { course: Course }) => (
    <Card className={cn(
      "h-full transition-all hover:shadow-lg",
      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
    )}>
      <div className={cn(
        "relative",
        viewMode === 'list' ? 'w-1/3' : 'w-full'
      )}>
        <Image
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-48 rounded-t-lg"
          width={400}
          height={192}
          loading="lazy"
        />
        {course.bestSeller && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
            Bestseller
          </Badge>
        )}
      </div>

      <div className="flex-1">
        <CardHeader>
          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Icons.star className="w-4 h-4 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span>({course.students} students)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icons.clock className="w-4 h-4" />
              <span>{course.duration}</span>
              <Icons.graduationCap className="w-4 h-4 ml-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">${course.price}</span>
              {course.originalPrice && (
                <span className="text-sm line-through text-muted-foreground">
                  ${course.originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="space-x-2">
          <Button
            onClick={() => handleAddToCart(course)}
            disabled={cart.some(c => c.id === course.id)}
            className="flex-1"
          >
            {cart.some(c => c.id === course.id) ? (
              <>
                <Icons.check className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <Icons.cart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCourse(course);
              setShowPreview(true);
            }}
          >
            <Icons.eye className="w-4 h-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCourse.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
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
      </Dialog>
    );
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 w-full sm:w-[300px]"
              onChange={handleSearch}
              aria-label="Search courses"
              role="searchbox"
            />
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy} aria-label="Sort courses">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2" role="group" aria-label="View mode">
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
        </div>
        <div
          className={cn(
            "grid gap-6",
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