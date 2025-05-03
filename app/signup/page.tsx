"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle, CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"
import { useCsrf } from "@/lib/hooks/use-csrf"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { csrfToken, isLoading: csrfLoading, error: csrfError, retry: retryCsrf } = useCsrf()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
    acceptTerms: false,
  })

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
  })

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const validatePassword = (password: string) => {
    setPasswordRequirements({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData({ ...formData, password: newPassword })
    validatePassword(newPassword)
  }

  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every(Boolean)
  }

  // Add validation functions
  const validateFullName = (name: string) => {
    if (name.length < 2) return "Name must be at least 2 characters long"
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name)) {
      return "Name should only contain letters and spaces"
    }
    if (!/^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/.test(name)) {
      return "Each word should start with a capital letter"
    }
    return ""
  }

  const validateEmail = (email: string) => {
    if (!email) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address"
    }
    // Add allowed domains - customize this list as needed
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    const domain = email.split("@")[1]
    if (!allowedDomains.includes(domain)) {
      return "Please use a valid email domain"
    }
    return ""
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, fullName: value })
    setFormErrors({ ...formErrors, fullName: validateFullName(value) })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, email: value })
    setFormErrors({ ...formErrors, email: validateEmail(value) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!csrfToken) {
      toast({
        title: "Error",
        description: "Security token not available. Please wait or try again.",
        variant: "destructive",
      })
      return
    }

    // Validate all fields before submission
    const nameError = validateFullName(formData.fullName)
    const emailError = validateEmail(formData.email)
    const hasPasswordError = !isPasswordValid()

    setFormErrors({
      fullName: nameError,
      email: emailError,
      password: hasPasswordError ? "Please meet all password requirements" : "",
    })

    if (nameError || emailError || hasPasswordError || !formData.acceptTerms) {
      toast({
        title: "Validation Error",
        description: "Please correct all errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      })

      // Redirect to dashboard or login page based on your flow
      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (csrfError) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="error" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>Failed to load security token.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryCsrf}
                  disabled={csrfLoading}
                >
                  {csrfLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Retry"
                  )}
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {csrfError && (
            <div className="mb-6 bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <div className="flex-1">Security verification failed.</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-destructive/20"
                onClick={retryCsrf}
                disabled={csrfLoading}
              >
                <RefreshCw className={`h-4 w-4 ${csrfLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleFullNameChange}
                required
                className={formErrors.fullName ? "border-red-500" : ""}
              />
              {formErrors.fullName && (
                <p className="text-sm text-red-500">{formErrors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleEmailChange}
                required
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Password Requirements:</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    {passwordRequirements.minLength ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    {passwordRequirements.hasUppercase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    {passwordRequirements.hasNumber ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    One number
                  </li>
                  <li className="flex items-center gap-2">
                    {passwordRequirements.hasSpecial ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    One special character
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">I want to</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Learn as a Student</SelectItem>
                  <SelectItem value="instructor">Teach as an Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Alert variant="info" className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By signing up, you acknowledge that you have read and understood our
                data practices as described in our Privacy Policy.
              </AlertDescription>
            </Alert>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || csrfLoading || !formData.acceptTerms}
            >
              {loading || csrfLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {csrfLoading ? "Verifying..." : "Creating account..."}
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 