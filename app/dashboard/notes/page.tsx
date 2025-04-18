"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"

interface Note {
  id: string
  title: string
  file_url: string
  lecture_id: string
  created_at: string
}

interface Lecture {
  id: string
  title: string
  course_id: string
}

export default function NotesPage() {
  const { supabase, session } = useSupabase()
  const [notes, setNotes] = useState<Note[]>([])
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNotes() {
      if (!session?.user.id) return

      const [notesResponse, lecturesResponse] = await Promise.all([
        supabase
          .from("notes")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("lectures")
          .select("id, title, course_id"),
      ])

      if (notesResponse.data) setNotes(notesResponse.data)
      if (lecturesResponse.data) setLectures(lecturesResponse.data)
      setLoading(false)
    }

    loadNotes()
  }, [session, supabase])

  const handleDownload = async (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Course Notes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => {
          const lecture = lectures.find((l) => l.id === note.lecture_id)
          return (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Lecture: {lecture?.title}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownload(note.file_url)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Notes
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}