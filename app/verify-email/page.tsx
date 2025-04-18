"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { StatisticsCounter } from "@/components/statistics-counter"

export default function VerifyEmailPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        router.push("/dashboard")
      }
    }
    checkSession()
  }, [router, supabase.auth])

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-10 text-white lg:flex dark:border-r">
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
            <Icons.mail className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent you a verification link. Please check your email and click the link to verify your account.
            </p>
          </div>
          <div className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/login">
                Back to login
              </Link>
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Didn&apos;t receive the email?{" "}
              <Link
                href="/resend-verification"
                className="underline underline-offset-4 hover:text-primary"
              >
                Resend verification
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 