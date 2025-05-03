"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"

export function Breadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return null

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      title: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: `/${segment}`,
      segment
    }))

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb">
      <ol 
        className="flex items-center space-x-2" 
        role="list"
      >
        <li className="flex items-center">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Home"
          >
            <Icons.home className="h-4 w-4" aria-hidden="true" />
          </Link>
        </li>
        {segments.map((segment, index) => (
          <li key={segment.href} className="flex items-center">
            <Icons.chevronRight 
              className="h-4 w-4 text-muted-foreground" 
              aria-hidden="true"
            />
            <Link
              href={segment.href}
              className="ml-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-current={index === segments.length - 1 ? "page" : undefined}
            >
              {segment.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 