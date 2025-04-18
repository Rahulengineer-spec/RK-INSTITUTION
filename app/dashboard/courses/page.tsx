"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
}

interface Enrollment {
  course_id: string
  progress: number
}

export default function CoursesPage() {
  const { supabase, session } = useSupabase()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      if (!session?.user.id) return

      const [coursesResponse, enrollmentsResponse] = await Promise.all([
        supabase.from("courses").select("*"),
        supabase
          .from("enrollments")
          .select("*")
          .eq("student_id", session.user.id),
      ])

      if (coursesResponse.data) setCourses(coursesResponse.data)
      if (enrollmentsResponse.data) setEnrollments(enrollmentsResponse.data)
      setLoading(false)
    }

    loadCourses()
  }, [session, supabase])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const enrollment = enrollments.find(e => e.course_id === course.id)
          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Instructor: {course.instructor}</span>
                      <span>Duration: {course.duration}</span>
                    </div>
                    {enrollment && (
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Progress: {enrollment.progress}%
                        </div>
                        <Progress value={enrollment.progress} />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}