import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://edutech-institute.com"),
  title: {
    default: "Blog - EduTech Institute",
    template: "%s | EduTech Institute Blog"
  },
  description: "Explore our latest articles, tutorials, and educational resources. Stay updated with the latest trends in online learning and education technology.",
  keywords: [
    "online education",
    "e-learning",
    "educational resources",
    "study tips",
    "learning technology",
    "career development",
    "student resources",
    "educational blog",
    "EduTech Institute blog",
    "online learning tips"
  ],
  authors: [{ name: "EduTech Institute Team" }],
  creator: "EduTech Institute",
  publisher: "EduTech Institute",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://edutech-institute.com/components/blog",
    title: "Blog - EduTech Institute",
    description: "Explore the latest insights, tutorials, and updates in education technology and professional development.",
    siteName: "EduTech Institute",
    images: [
      {
        url: "https://edutech-institute.com/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "EduTech Institute Blog"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - EduTech Institute",
    description: "Explore the latest insights, tutorials, and updates in education technology and professional development.",
    creator: "@edutechinst",
    images: ["https://edutech-institute.com/images/blog-twitter.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}
