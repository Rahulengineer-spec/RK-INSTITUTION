export type BlogCategory = 'Technology' | 'Education' | 'Career' | 'Development' | 'Design' | 'Business';

export interface BlogPost {
    id: string;
    title: string;
    excerpt?: string;
    description?: string;
    content: string;
    category: BlogCategory;
    publishedAt: Date;
    author: {
        name: string;
        image?: string;
        avatar?: string;
        role?: string;
        id?: string;
    };
    slug: string;
    coverImage?: string;
    imageUrl?: string;
    tags?: string[];
    readingTime?: number; // in minutes
    featured?: boolean;
}