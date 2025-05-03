import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function UserActions() {
  return (
    <div className="flex items-center space-x-2">
      <ThemeToggle />
      <Button 
        variant="outline"
        size="sm"
        asChild
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
      >
        <Link 
          href="/login"
          aria-label="Sign in to your account"
        >
          Sign in
        </Link>
      </Button>
      <Button 
        size="sm"
        asChild
        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Link 
          href="/register"
          aria-label="Create a new account"
        >
          Register
        </Link>
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        asChild
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-gray-100 dark:hover:bg-gray-800"
      >
        <Link 
          href="/dashboard"
          aria-label="Go to dashboard"
        >
          <Icons.user className="h-5 w-5" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  )
} 