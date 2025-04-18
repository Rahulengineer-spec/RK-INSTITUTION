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
    <nav className="grid items-start gap-2">
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}