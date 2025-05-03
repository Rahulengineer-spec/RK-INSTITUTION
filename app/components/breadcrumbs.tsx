import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {segments.map((segment, index) => (
        <span key={segment} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/${segments.slice(0, index + 1).join("/")}`}
            className="ml-2 hover:text-foreground capitalize"
          >
            {segment.replace(/-/g, " ")}
          </Link>
        </span>
      ))}
    </nav>
  )
} 