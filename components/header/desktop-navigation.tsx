import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigationItems } from "./navigation-items"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"

export function DesktopNavigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname?.startsWith(path)
  }

  return (
    <NavigationMenu aria-label="Main navigation">
      <NavigationMenuList>
        {navigationItems.map((item: any): React.ReactNode => {
          // Mega menu for Courses
          if (item.megaMenu) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive(item.href) && "text-primary"
                  )}
                  aria-label={item.ariaLabel}
                  aria-expanded={isActive(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-card shadow-xl rounded-xl p-6 min-w-[800px] max-w-[1100px]">
                  <div className="flex gap-8">
                    {/* Featured Programs */}
                    <div className="flex-1 min-w-[320px]">
                      <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Featured Programs</div>
                      <div className="grid gap-4">
                        {item.megaMenu.featured.map((program: any, i: number) => (
                          <Link key={i} href={program.href} className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent/30 transition group">
                            <img src={program.image} alt={program.title} className="w-16 h-16 rounded-lg object-cover border border-muted" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground group-hover:text-primary transition">{program.title}</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{program.badge}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{program.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Categories */}
                    <div className="flex-1 min-w-[200px]">
                      <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</div>
                      <ul className="grid gap-2">
                        {item.megaMenu.categories.map((cat: any, i: number) => (
                          <li key={i}>
                            <Link href={cat.href} className="block px-2 py-1 rounded hover:bg-accent/30 text-sm text-foreground hover:text-primary transition">
                              {cat.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Quick Links */}
                    <div className="flex-1 min-w-[180px]">
                      <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Links</div>
                      <ul className="grid gap-2">
                        {item.megaMenu.quickLinks
                          .filter((link: any) => !link.requiresAuth || session)
                          .map((link: any, i: number) => (
                            <li key={i}>
                              <Link href={link.requiresAuth && !session ? "/login" : link.href} className="block px-2 py-1 rounded hover:bg-accent/30 text-sm text-foreground hover:text-primary transition">
                                {link.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }
          // Standard dropdown for other items with children
          if (item.children) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive(item.href) && "text-primary"
                  )}
                  aria-label={item.ariaLabel}
                  aria-expanded={isActive(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-card">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" role="menu">
                    {item.children
                      .filter((child: any) => !child.requiresAuth || session)
                      .map((child: any) => (
                        <li key={child.title} role="none">
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.requiresAuth && !session ? "/login" : child.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                isActive(child.href) && "bg-accent text-accent-foreground"
                              )}
                              aria-label={child.ariaLabel}
                              role="menuitem"
                            >
                              <div className="text-sm font-medium leading-none text-foreground">{child.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }
          // Simple link for items without children
          return (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive(item.href) && "text-primary"
                  )}
                  aria-label={item.ariaLabel}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
} 