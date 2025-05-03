"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DesktopNavigation } from "@/components/header/desktop-navigation"
import { MobileNavigation } from "@/components/header/mobile-navigation"
import { UserActions } from "@/components/header/user-actions"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-200"
      )}
      role="banner"
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:space-x-4">
          <DesktopNavigation />
          <UserActions />
        </div>

        {/* Mobile Navigation Button */}
        <Button
          variant="ghost"
          className="ml-2 px-0 text-base hover:bg-transparent focus:ring-2 focus:ring-primary md:hidden dark:text-gray-100 dark:hover:bg-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <Icons.menu className="h-6 w-6" aria-hidden="true" />
        </Button>

        {/* Mobile Navigation Menu */}
        <MobileNavigation 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Breadcrumbs */}
      <div className="container py-2 text-sm text-muted-foreground dark:text-gray-400" role="navigation" aria-label="Breadcrumb">
        <Breadcrumbs />
      </div>
    </header>
  )
}