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
  const [scrolled, setScrolled] = useState(false)

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

  // Sticky/adaptive header on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        "header-container z-50 w-full top-0 left-0 sticky transition-all duration-300",
        scrolled ? "bg-white/90 shadow-xl backdrop-blur dark:bg-gray-900/90" : "bg-transparent shadow-none"
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