'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BlogCategory } from '@/lib/types/blog';

const categories: BlogCategory[] = [
  'Technology',
  'Education',
  'Career',
  'Development',
  'Design',
  'Business',
];

export function BlogCategories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryClick = (category: BlogCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === category) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryClick(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
} 