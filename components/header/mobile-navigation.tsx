import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"
import { cn } from '@/lib/utils'
import { navigationItems } from './navigation-items'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Icons } from '@/components/icons'

interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname?.startsWith(path)
  }

  // Close mobile menu on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item: any) =>
              item.megaMenu ? (
                <div key={item.title} className="flex flex-col space-y-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item.title}
                  </div>
                  {/* Featured Programs */}
                  <div className="ml-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Featured Programs</div>
                    <div className="flex flex-col gap-2 mb-2">
                      {item.megaMenu.featured.map((program: any, i: number) => (
                        <Link key={i} href={program.href} className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/30 transition group" onClick={onClose}>
                          <img src={program.image} alt={program.title} className="w-10 h-10 rounded object-cover border border-muted" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground group-hover:text-primary transition text-sm">{program.title}</span>
                              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{program.badge}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{program.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Categories */}
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1 mt-2">Categories</div>
                    <div className="flex flex-col gap-1 mb-2">
                      {item.megaMenu.categories.map((cat: any, i: number) => (
                        <Link key={i} href={cat.href} className="block px-2 py-1 rounded hover:bg-accent/30 text-sm text-foreground hover:text-primary transition" onClick={onClose}>
                          {cat.title}
                        </Link>
                      ))}
                    </div>
                    {/* Quick Links */}
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1 mt-2">Quick Links</div>
                    <div className="flex flex-col gap-1">
                      {item.megaMenu.quickLinks
                        .filter((link: any) => !link.requiresAuth || session)
                        .map((link: any, i: number) => (
                          <Link key={i} href={link.requiresAuth && !session ? "/login" : link.href} className="block px-2 py-1 rounded hover:bg-accent/30 text-sm text-foreground hover:text-primary transition" onClick={onClose}>
                            {link.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              ) : item.children ? (
                <div key={item.title} className="flex flex-col space-y-3">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item.title}
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    {item.children
                      .filter((child: any) => !child.requiresAuth || session)
                      .map((child: any) => (
                        <Link
                          key={child.title}
                          href={child.requiresAuth && !session ? "/login" : child.href}
                          className={cn(
                            "text-sm transition-colors hover:text-primary",
                            isActive(child.href)
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          )}
                          onClick={onClose}
                        >
                          {child.title}
                        </Link>
                      ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={onClose}
                >
                  <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {item.title}
                </Link>
              )
            )}
          </div>
        </ScrollArea>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="flex items-center justify-between">
            {!session ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="w-[48%]"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild
                  className="w-[48%]"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="w-full"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 