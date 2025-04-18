"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export default function TestimonialsPage() {
  const { supabase } = useSupabase()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) setTestimonials(data)
      setLoading(false)
    }

    loadTestimonials()
  }, [supabase])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container py-12">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Student Testimonials</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          See what our students have to say about their learning experience at EduTech Institute
        </p>
      </div>
      <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <blockquote className="space-y-2">
                <p className="text-muted-foreground">{testimonial.content}</p>
                <footer className="text-sm">
                  <cite className="font-medium not-italic">
                    {testimonial.name}
                  </cite>
                  {testimonial.role && (
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  )}
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}