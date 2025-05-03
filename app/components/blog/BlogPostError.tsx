"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function BlogPostError({
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="container max-w-md text-center">
        <div className="mb-8 text-red-500 dark:text-red-400">
          <Icons.warning className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-gray-100">Post not found!</h2>
        <p className="text-muted-foreground dark:text-gray-300 mb-8">
          We couldn't find the blog post you're looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button asChild>
            <a href="/components/blog">Return to blog</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
