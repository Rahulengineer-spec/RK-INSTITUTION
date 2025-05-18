"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { supabase } from "@/lib/supabase/client"
import { Loader2, Lock, Mail, User, Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value.trim().toLowerCase()
    const password = target.password.value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      toast.error(error.message)
      setIsLoading(false)
      return
    }
    toast.success("Login successful!")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-background px-4">
      <div className="w-full max-w-md glass shadow-2xl rounded-2xl p-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <User className="h-12 w-12 text-primary mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold tracking-tight mb-1 gradient-text">Login</h1>
          <p className="text-muted-foreground text-base">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
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
                className="pl-12 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40 shadow-md"
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                className="pl-12 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40 shadow-md pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-lg button-primary shadow-lg hover:scale-105 transition-transform duration-150"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <User className="mr-2 h-5 w-5" />
                Sign In
              </>
            )}
          </Button>
        </form>
        <div className="w-full flex flex-col items-center mt-8">
          <span className="text-sm text-muted-foreground">Don&apos;t have an account?</span>
          <a
            href="/signup"
            className="text-primary font-medium hover:underline mt-1"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  )
} 