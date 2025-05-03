'use client';

import { useEffect } from 'react';
import { BlogPost } from '@/lib/types/blog';

interface StructuredDataProps {
  type: 'article' | 'breadcrumb' | 'faq' | 'product';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Skip execution in development
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');

    let jsonLD;

    switch (type) {
      case 'article':
        jsonLD = generateArticleSchema(data);
        break;
      case 'breadcrumb':
        jsonLD = generateBreadcrumbSchema(data);
        break;
      case 'faq':
        jsonLD = generateFAQSchema(data);
        break;
      case 'product':
        jsonLD = generateProductSchema(data);
        break;
    }

    script.textContent = JSON.stringify(jsonLD);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  // This component doesn't render anything
  return null;
}

function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'image': post.imageUrl || post.coverImage,
    'datePublished': post.publishedAt.toISOString(),
    'dateModified': post.publishedAt.toISOString(),
    'author': {
      '@type': 'Person',
      'name': post.author.name
    }
  };
}

function generateBreadcrumbSchema(items: Array<{ name: string, url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

function generateFAQSchema(questions: Array<{ question: string, answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer
      }
    }))
  };
}

function generateProductSchema(product: {
  name: string, 
  description: string, 
  price: number,
  currency: string,
  image: string,
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.image,
    'offers': {
      '@type': 'Offer',
      'price': product.price,
      'priceCurrency': product.currency,
      'url': product.url
    }
  };
}
