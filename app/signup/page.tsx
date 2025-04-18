"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { StatisticsCounter } from "@/components/statistics-counter"

interface PasswordRequirements {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [requirements, setRequirements] = useState<PasswordRequirements>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const newRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    setRequirements(newRequirements)

    const strength = Object.values(newRequirements).filter(Boolean).length
    setPasswordStrength((strength / 5) * 100)
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 100) {
      setError("Please meet all password requirements")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      router.push("/verify-email")
    } catch (error: any) {
      setError(error.message || "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">
              RK INSTITUTION
            </span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Empowering minds with cutting-edge education and innovative learning experiences. Shape your future with us.&rdquo;
            </p>
          </blockquote>
          <StatisticsCounter />
        </div>
      </div>
      <div className="lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="space-y-2">
                <Progress value={passwordStrength} className="h-2" />
                <div className="grid gap-2 text-sm">
                  <div className={cn("flex items-center", requirements.length ? "text-green-500" : "text-muted-foreground")}>
                    <Icons.check className="mr-2 h-4 w-4" />
                    At least 8 characters
                  </div>
                  <div className={cn("flex items-center", requirements.uppercase ? "text-green-500" : "text-muted-foreground")}>
                    <Icons.check className="mr-2 h-4 w-4" />
                    At least one uppercase letter
                  </div>
                  <div className={cn("flex items-center", requirements.lowercase ? "text-green-500" : "text-muted-foreground")}>
                    <Icons.check className="mr-2 h-4 w-4" />
                    At least one lowercase letter
                  </div>
                  <div className={cn("flex items-center", requirements.number ? "text-green-500" : "text-muted-foreground")}>
                    <Icons.check className="mr-2 h-4 w-4" />
                    At least one number
                  </div>
                  <div className={cn("flex items-center", requirements.special ? "text-green-500" : "text-muted-foreground")}>
                    <Icons.check className="mr-2 h-4 w-4" />
                    At least one special character
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 