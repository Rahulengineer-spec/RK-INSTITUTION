"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Search, Filter, SortAsc, SortDesc, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  category: string
  verified: boolean
  created_at: string
}

const ITEMS_PER_PAGE = 9

export default function TestimonialsPage() {
  const { supabase } = useSupabase()
  const { data: session } = useSession()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">("latest")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    content: "",
    rating: 5,
    category: "general",
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true)
        let query = supabase.from("testimonials").select("*")

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory)
        }

        if (searchTerm) {
          query = query.ilike("content", `%${searchTerm}%`)
        }

        switch (sortBy) {
          case "latest":
            query = query.order("created_at", { ascending: false })
            break
          case "highest":
            query = query.order("rating", { ascending: false })
            break
          case "lowest":
            query = query.order("rating", { ascending: true })
            break
        }

        const { data, error } = await query
          .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

        if (error) throw error
        if (data) setTestimonials(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [supabase, page, searchTerm, selectedCategory, sortBy])

  const handleAddTestimonial = async () => {
    if (!session?.user) return

    try {
      const { error } = await supabase.from("testimonials").insert({
        ...newTestimonial,
        name: session.user.name,
        verified: true,
      })

      if (error) throw error

      setShowAddDialog(false)
      setNewTestimonial({ content: "", rating: 5, category: "general" })
      // Refresh testimonials
      setPage(1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add testimonial")
    }
  }

  const categories = ["all", "general", "course", "instructor", "platform"]

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      </div>
    )
  }

  const filteredTestimonials = testimonials.filter((t) =>
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-center"
      >
        <h1 className="text-4xl font-bold">Student Testimonials</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          See what our students have to say about their learning experience at Rk Institution
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {testimonials.length}+ Reviews
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {Math.round(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length * 10) / 10} Average Rating
          </Badge>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: "latest" | "highest" | "lowest") => setSortBy(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>

          {session?.user && (
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>Add Review</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Experience</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your review..."
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  />
                  <Select
                    value={String(newTestimonial.rating)}
                    onValueChange={(value) => setNewTestimonial({ ...newTestimonial, rating: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={String(rating)}>
                          {rating} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newTestimonial.category}
                    onValueChange={(value) => setNewTestimonial({ ...newTestimonial, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c !== "all").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddTestimonial}>Submit Review</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-8 bg-muted rounded" />
              <CardContent>
                <div className="space-y-2">
                  <div className="h-20 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3" ref={ref}>
            <AnimatePresence>
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <Badge variant={testimonial.verified ? "default" : "secondary"}>
                          {testimonial.category}
                        </Badge>
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => p + 1)}
              disabled={testimonials.length < ITEMS_PER_PAGE}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}