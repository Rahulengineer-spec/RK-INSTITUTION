import React from 'react'
import { CourseCard } from "./Course/CourseCard"

interface Course {
  id: string
  title: string
  description: string
  image: string
  price: number
  slug: string
}

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">      {courses.map((course) => (
        <div key={course.id}>
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
            image={course.image}
            price={course.price}
            slug={course.slug}
          />
        </div>
      ))}
    </div>
  )
}