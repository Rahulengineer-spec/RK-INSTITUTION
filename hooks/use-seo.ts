import { useEffect } from 'react'
import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
  structuredData?: Record<string, any>
}

export function useSEO({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ]

    // Remove existing meta tags
    const existingMetaTags = document.querySelectorAll('meta[name], meta[property]')
    existingMetaTags.forEach(tag => tag.remove())

    // Add new meta tags
    metaTags.forEach(tag => {
      const meta = document.createElement('meta')
      if (tag.name) meta.setAttribute('name', tag.name)
      if (tag.property) meta.setAttribute('property', tag.property)
      meta.setAttribute('content', tag.content)
      document.head.appendChild(meta)
    })

    // Update title
    document.title = title

    // Add structured data if provided
    if (structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup
      const addedMetaTags = document.querySelectorAll('meta[name], meta[property]')
      addedMetaTags.forEach(tag => tag.remove())
      const addedScripts = document.querySelectorAll('script[type="application/ld+json"]')
      addedScripts.forEach(script => script.remove())
    }
  }, [title, description, keywords, image, url, type, structuredData])
} 