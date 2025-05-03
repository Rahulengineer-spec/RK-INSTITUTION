import { Icons } from "@/components/icons"

export const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Icons.home,
    ariaLabel: "Navigate to home page"
  },
  {
    title: "Courses",
    href: "/courses",
    icon: Icons.graduationCap,
    ariaLabel: "Browse courses menu",
    children: [
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
        ariaLabel: "Access your enrolled courses",
        requiresAuth: true
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
    title: "Verify Certificate",
    href: "/verify-certificate",
    icon: Icons.certificate,
    ariaLabel: "Verify a certificate",
    description: "Verify the authenticity of a certificate"
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