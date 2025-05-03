import { Metadata } from "next"
import { CoursesGrid } from "@/components/courses/courses-grid"

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Browse Courses | RK Institution',
  description: 'Explore our wide range of courses in development, data science, mathematics, and more.',
}

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Browse Our Courses
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover a wide range of courses designed to help you achieve your learning goals.
        </p>
      </div>
      <CoursesGrid />
    </div>
  )
}