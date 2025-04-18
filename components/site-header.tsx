"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Menu, X, BookOpen, User, GraduationCap, Phone } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const { session } = useSupabase()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "/about", label: "About", icon: <User className="h-4 w-4" /> },
    { href: "/courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/instructor", label: "Instructors", icon: <GraduationCap className="h-4 w-4" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="h-4 w-4" /> },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                RK INSTITUTION
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {mounted && <ModeToggle />}
            {session ? (
              <Button asChild variant="default" className="hidden md:flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="hidden md:flex">
                <Link href="/login">Get Started</Link>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            {session ? (
              <Button asChild variant="default" className="w-full justify-start">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="w-full justify-start">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}