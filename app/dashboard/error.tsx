"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-destructive mb-4">
        <AlertCircle className="h-16 w-16" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Dashboard Error</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        We couldn't load your dashboard information. This could be due to a network issue or a problem with our servers.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={() => reset()}
        >
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  )
}
