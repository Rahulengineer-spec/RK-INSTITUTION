"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Video,
  Receipt,
} from "lucide-react"
import ErrorBoundary from '@/components/ui/error-boundary'

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Fee Payment",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Timetable",
    href: "/dashboard/timetable",
    icon: Calendar,
  },
  {
    title: "Notes",
    href: "/dashboard/notes",
    icon: FileText,
  },
  {
    title: "Video Lectures",
    href: "/dashboard/lectures",
    icon: Video,
  },
  {
    title: "Receipts",
    href: "/dashboard/receipts",
    icon: Receipt,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <ErrorBoundary>
      <nav className="grid items-start gap-2" role="navigation" aria-label="Dashboard Navigation">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">No navigation items available.</div>
        ) : (
          items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
              role="menuitem"
              aria-current={pathname === item.href ? 'page' : undefined}
              aria-label={item.title}
            >
              <Link href={item.href} tabIndex={0}>
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {item.title}
              </Link>
            </Button>
          ))
        )}
      </nav>
    </ErrorBoundary>
  )
} 