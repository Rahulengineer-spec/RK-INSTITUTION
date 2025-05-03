"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useCsrf } from "@/lib/hooks/use-csrf"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, LogIn, Loader2, Lock, Mail, ShieldCheck, User, RefreshCw } from "lucide-react"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { csrfToken, isLoading: csrfLoading, error: csrfError, validateToken, retry: retryCsrf } = useCsrf()
  const [error, setError] = React.useState("")

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    if (!csrfToken) {
      setError("Security token not available. Please wait or refresh the page.")
      setIsLoading(false)
      return
    }

    try {
      const isValidToken = await validateToken(csrfToken)
      if (!isValidToken) {
        throw new Error("Invalid security token. Please refresh and try again.")
      }

      const target = event.target as typeof event.target & {
        email: { value: string }
        password: { value: string }
      }

      const signInResult = await signIn("credentials", {
        email: target.email.value.toLowerCase(),
        password: target.password.value,
        csrfToken,
        redirect: false,
      })

      if (!signInResult?.ok) {
        throw new Error("Your sign in request failed. Please try again.")
      }

      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-background px-4">
      <div className="w-full max-w-md bg-card/90 shadow-xl rounded-2xl p-8 md:p-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <ShieldCheck className="h-12 w-12 text-primary mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold tracking-tight mb-1">Login</h1>
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
                disabled={isLoading || csrfLoading}
                className="pl-10 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40"
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
                disabled={isLoading || csrfLoading}
                className="pl-10 h-12 text-base rounded-lg border-input focus-visible:ring-2 focus-visible:ring-primary/40"
              />
            </div>
          </div>

          {(error || csrfError) && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <div className="flex-1">
                {csrfError ? "Security verification failed." : error}
              </div>
              {csrfError && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-destructive/20"
                  onClick={retryCsrf}
                  disabled={csrfLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${csrfLoading ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-150"
            disabled={isLoading || csrfLoading}
          >
            {isLoading || csrfLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {csrfLoading ? "Verifying..." : "Signing in..."}
              </>
            ) : (
              <>
                <User className="mr-2 h-5 w-5" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="relative my-6 w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full h-12 text-base font-semibold rounded-lg flex items-center justify-center gap-2"
          disabled={isLoading || csrfLoading}
          onClick={async () => {
            try {
              if (!csrfToken) {
                throw new Error("Security token not available. Please wait or refresh the page.")
              }

              const isValidToken = await validateToken(csrfToken)
              if (!isValidToken) {
                throw new Error("Invalid security token. Please refresh and try again.")
              }

              await signIn("google", { csrfToken })
            } catch (error) {
              setError(error instanceof Error ? error.message : "An error occurred")
              toast.error(error instanceof Error ? error.message : "An error occurred")
            }
          }}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-5 w-5" />
          )}
          Google
        </Button>

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