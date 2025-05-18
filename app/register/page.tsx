"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculateStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value })
    setPasswordStrength(calculateStrength(e.target.value))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: ""
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors(prev => ({ ...prev, submit: "" }))

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role === "instructor" ? "INSTRUCTOR" : "USER",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to register")
      }

      // Redirect to login page on success
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Registration error:", error)
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : "Failed to register"
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-blue-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Icons.logo className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            </div>
            <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent className="space-y-4">
              <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2 mb-2" disabled={isLoading}>
                <Icons.google className="h-5 w-5" /> Sign up with Google
              </Button>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
                <span className="mx-2 text-xs text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
              </div>
              {errors.submit && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-400" />
                  {errors.submit}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                  disabled={isLoading}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><Lock className="h-3 w-3" /> {errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><Lock className="h-3 w-3" /> {errors.email}</p>
                )}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900 pr-10"
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`h-2 w-24 rounded transition-all duration-300 ${passwordStrength === 0 ? 'bg-gray-200' : passwordStrength === 1 ? 'bg-red-400' : passwordStrength === 2 ? 'bg-yellow-400' : passwordStrength === 3 ? 'bg-blue-400' : 'bg-green-500'}`}></div>
                  <span className="text-xs text-gray-400">
                    {passwordStrength === 0 ? '' : passwordStrength === 1 ? 'Weak' : passwordStrength === 2 ? 'Fair' : passwordStrength === 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Use 8+ chars, uppercase, number, symbol</p>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><Lock className="h-3 w-3" /> {errors.password}</p>
                )}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900 pr-10"
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><Lock className="h-3 w-3" /> {errors.confirmPassword}</p>
                )}
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="role">I am a</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    id="role"
                    className="border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed((v) => !v)}
                  disabled={isLoading}
                  className="accent-blue-600 h-4 w-4 rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 select-none">
                  I agree to the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 mx-1">Terms of Service</a>
                  and
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 mx-1">Privacy Policy</a>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                disabled={isLoading || !agreed}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
} 