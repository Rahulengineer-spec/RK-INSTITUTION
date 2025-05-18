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
    megaMenu: {
      featured: [
        {
          title: "AI & Machine Learning",
          href: "/courses/ai-ml",
          image: "/courses/ai-ml.jpg",
          description: "Learn AI, ML, and Data Science from top instructors.",
          badge: "Trending"
        },
        {
          title: "Full Stack Development",
          href: "/courses/full-stack",
          image: "/courses/full-stack.jpg",
          description: "Become a full stack developer with hands-on projects.",
          badge: "New"
        },
        {
          title: "Cloud Computing",
          href: "/courses/cloud",
          image: "/courses/cloud.jpg",
          description: "Master AWS, Azure, and Google Cloud platforms.",
          badge: "Popular"
        }
      ],
      categories: [
        { title: "Data Science", href: "/courses/categories/data-science" },
        { title: "AI & Machine Learning", href: "/courses/categories/ai-ml" },
        { title: "Cloud Computing", href: "/courses/categories/cloud" },
        { title: "Software Development", href: "/courses/categories/software-dev" },
        { title: "Cyber Security", href: "/courses/categories/cyber-security" },
        { title: "Design", href: "/courses/categories/design" },
        { title: "Business Analytics", href: "/courses/categories/business-analytics" },
        { title: "Digital Marketing", href: "/courses/categories/digital-marketing" }
      ],
      quickLinks: [
        { title: "All Courses", href: "/courses" },
        { title: "My Learning", href: "/dashboard/courses", requiresAuth: true },
        { title: "Categories", href: "/courses/categories" }
      ]
    },
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