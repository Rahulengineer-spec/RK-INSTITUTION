export type BlogCategory = 
  | 'Technology'
  | 'Education'
  | 'Career'
  | 'Development'
  | 'Design'
  | 'Business';

export interface BlogAuthor {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  imageUrl: string;
}

export interface BlogComment {
  id: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  postId: string;
} 