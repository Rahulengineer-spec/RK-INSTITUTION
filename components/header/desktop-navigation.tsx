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
        {navigationItems.map((item) => 
          item.children ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger 
                className={cn(
                  navigationMenuTriggerStyle(),
                  "dark:text-gray-100",
                  isActive(item.href) && "text-primary dark:text-primary"
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
                    .filter(child => !child.requiresAuth || session)
                    .map((child) => (
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
          ) : (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "dark:text-gray-100",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive(item.href) && "text-primary dark:text-primary"
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
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
} 