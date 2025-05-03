"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCsrf, validateCsrfToken } from "@/hooks/useCsrf"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Profile {
  id: string
  full_name: string
  student_id: string
  email: string
  avatar_url: string
}

export default function ProfilePage() {
  const { supabase, session } = useSupabase()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const { csrfToken, loading: csrfLoading, error: csrfError } = useCsrf()

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user.id) return

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()

      if (data) setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [session, supabase])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!profile) return

    if (!csrfToken) {
      toast({
        title: "Error",
        description: "Unable to verify security token. Please try again.",
        variant: "destructive",
      })
      return
    }

    setUpdating(true)
    const formData = new FormData(event.currentTarget)
    const updates = {
      full_name: formData.get("full_name") as string,
      updated_at: new Date().toISOString(),
    }

    try {
      // First validate the CSRF token
      const isValidToken = await validateCsrfToken(csrfToken)
      if (!isValidToken) {
        throw new Error('Invalid security token')
      }

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", profile.id)

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Your profile has been updated.",
      })
      setProfile({ ...profile, ...updates })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div>Loading...</div>

  if (csrfError) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load security token. Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{profile?.full_name}</h2>
                <p className="text-sm text-muted-foreground">
                  Student ID: {profile?.student_id}
                </p>
              </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  defaultValue={profile?.full_name}
                  disabled={updating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email}
                  disabled
                />
              </div>
              <Button 
                type="submit" 
                disabled={updating || csrfLoading}
              >
                {updating || csrfLoading ? "Please wait..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}