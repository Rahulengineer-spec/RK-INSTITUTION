"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, FileText } from "lucide-react"

interface Lecture {
  id: string
  title: string
  description: string
  video_url: string
  duration: number
  course_id: string
}

interface Course {
  id: string
  title: string
}

export default function LecturesPage() {
  const { supabase, session } = useSupabase()
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLectures() {
      if (!session?.user.id) return

      const [lecturesResponse, coursesResponse] = await Promise.all([
        supabase
          .from("lectures")
          .select("*")
          .order("sequence_number"),
        supabase
          .from("courses")
          .select("id, title"),
      ])

      if (lecturesResponse.data) setLectures(lecturesResponse.data)
      if (coursesResponse.data) setCourses(coursesResponse.data)
      setLoading(false)
    }

    loadLectures()
  }, [session, supabase])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Video Lectures</h1>
      <Tabs defaultValue={courses[0]?.id} className="space-y-4">
        <TabsList>
          {courses.map((course) => (
            <TabsTrigger key={course.id} value={course.id}>
              {course.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {courses.map((course) => (
          <TabsContent key={course.id} value={course.id}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lectures
                .filter((lecture) => lecture.course_id === course.id)
                .map((lecture) => (
                  <Card key={lecture.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        {lecture.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {lecture.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration: {lecture.duration} min</span>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}