"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Mail, Lock, Loader2, LogIn, ShieldCheck, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import ErrorBoundary from '@/components/ui/error-boundary'

export default function LoginPage() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const emailInputRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus()
    }
  }, [error])

  if (status === "authenticated") {
    router.replace("/dashboard")
    return null
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!result?.ok) {
      setError(result?.error || "Invalid email or password")
      toast({
        title: "Error",
        description: result?.error || "Invalid email or password",
        variant: "destructive",
      })
    } else {
      router.push("/dashboard")
    }
    setIsLoading(false)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-background px-4">
        <div className="w-full max-w-md bg-card/90 shadow-xl rounded-2xl p-8 md:p-10 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <ShieldCheck className="h-12 w-12 text-primary mb-2 animate-bounce" />
            <h1 className="text-3xl font-bold tracking-tight mb-1">Login</h1>
            <p className="text-muted-foreground text-base">Sign in to your account</p>
          </div>
          <form onSubmit={onSubmit} className="w-full space-y-6" role="form" aria-label="Login form" aria-busy={isLoading}>
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="pl-10 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40"
                  ref={emailInputRef}
                />
              </div>
              <div className="relative">
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="pl-10 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>
            </div>
            {error && (
              <div
                className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-2 flex items-center gap-2"
                tabIndex={-1}
                ref={errorRef}
                aria-live="polite"
                role="alert"
              >
                <LogIn className="h-4 w-4" /> {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-150"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <User className="mr-2 h-5 w-5" />
              )}
              Sign In
            </Button>
          </form>
          <div className="w-full flex flex-col items-center mt-8">
            <Button
              variant="outline"
              type="button"
              className="w-full h-12 text-base font-semibold rounded-lg flex items-center justify-center gap-2"
              disabled={isLoading}
              aria-label="Sign in with Google"
              onClick={async () => {
                setIsLoading(true)
                await signIn("google")
                setIsLoading(false)
              }}
            >
              <Loader2 className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              Google
            </Button>
            <span className="text-sm text-muted-foreground mt-4">Don&apos;t have an account?</span>
            <a
              href="/signup"
              className="text-primary font-medium hover:underline mt-1"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}