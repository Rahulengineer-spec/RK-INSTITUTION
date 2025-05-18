"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import ErrorBoundary from '@/components/ui/error-boundary'

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handler = () => setIsOpen(prev => !prev)
    document.addEventListener('toggle-mobile-nav', handler)
    return () => document.removeEventListener('toggle-mobile-nav', handler)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Focus management: focus first nav link when menu opens, return focus to trigger when closed
  useEffect(() => {
    if (isOpen && firstNavLinkRef.current) {
      firstNavLinkRef.current.focus()
    } else if (!isOpen && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [isOpen])

  const navigation = [
    {
      title: "Home",
      href: "/",
      icon: Icons.home,
      ariaLabel: "Navigate to home page"
    },
    {
      title: "Courses",
      items: [
        {
          title: "All Courses",
          href: "/courses",
          description: "Browse all available courses",
          ariaLabel: "View all courses"
        },
        {
          title: "My Learning",
          href: "/dashboard/courses",
          description: "Access your enrolled courses",
          ariaLabel: "Access your enrolled courses"
        },
        {
          title: "Categories",
          href: "/courses/categories",
          description: "Browse courses by category",
          ariaLabel: "Browse course categories"
        }
      ]
    },
    {
      title: "Instructors",
      href: "/instructor",
      icon: Icons.users,
      ariaLabel: "View instructors page"
    },
    {
      title: "Blog",
      href: "/blog",
      icon: Icons.fileText,
      ariaLabel: "Read our blog"
    }
  ]

  return (
    <ErrorBoundary>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-full max-w-xs p-0"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
        >
          <ScrollArea className="h-full py-6">
            <div className="flex flex-col space-y-4 px-4">
              <nav className="flex flex-col space-y-4" role="navigation">
                {navigation.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No navigation items available.</div>
                ) : (
                  navigation.map((item, index) =>
                    item.items ? (
                      <div key={item.title} className="flex flex-col space-y-2">
                        <h4 className="font-medium" role="heading" aria-level={2}>
                          {item.title}
                        </h4>
                        <div className="flex flex-col space-y-2 pl-4">
                          {item.items.map((subItem, subIndex) => (
                            <Button
                              key={subItem.href}
                              variant="ghost"
                              asChild
                              className={cn(
                                "justify-start",
                                "focus:outline-2 focus:outline-offset-2 focus:outline-primary",
                                pathname === subItem.href && "font-medium text-primary"
                              )}
                            >
                              <Link 
                                href={subItem.href}
                                aria-label={subItem.ariaLabel}
                                aria-current={pathname === subItem.href ? "page" : undefined}
                                ref={index === 0 && subIndex === 0 ? firstNavLinkRef : undefined}
                              >
                                <div className="flex flex-col items-start">
                                  <span>{subItem.title}</span>
                                  {subItem.description && (
                                    <span className="text-sm text-muted-foreground">
                                      {subItem.description}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Button
                        key={item.title}
                        variant="ghost"
                        asChild
                        className={cn(
                          "justify-start",
                          "focus:outline-2 focus:outline-offset-2 focus:outline-primary",
                          pathname === item.href && "font-medium text-primary"
                        )}
                      >
                        <Link 
                          href={item.href}
                          aria-label={item.ariaLabel}
                          aria-current={pathname === item.href ? "page" : undefined}
                          ref={index === 0 ? firstNavLinkRef : undefined}
                        >
                          {item.icon && <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />}
                          {item.title}
                        </Link>
                      </Button>
                    )
                  )
                )}
              </nav>
            </div>
          </ScrollArea>
          <Button
            className="absolute right-4 top-4 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            ref={triggerRef}
          >
            <Icons.close className="h-4 w-4" aria-hidden="true" />
          </Button>
        </SheetContent>
      </Sheet>
    </ErrorBoundary>
  )
} 