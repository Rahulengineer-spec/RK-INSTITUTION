import { z } from 'zod';
import { createError } from '@/middleware/error-handler';

// User schemas
export const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Course schemas
export const courseSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  duration: z.number().min(1),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().optional(),
});

// Lesson schemas
export const lessonSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  content: z.string().min(10),
  courseId: z.string().uuid(),
  order: z.number().min(0),
  duration: z.number().min(1),
  type: z.enum(['video', 'text', 'quiz']),
});

// Quiz schemas
export const quizQuestionSchema = z.object({
  question: z.string().min(3),
  options: z.array(z.string()).min(2),
  correctAnswer: z.number().min(0),
  explanation: z.string().optional(),
});

export const quizSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  lessonId: z.string().uuid(),
  timeLimit: z.number().min(1),
  passingScore: z.number().min(0).max(100),
  questions: z.array(quizQuestionSchema).min(1),
});

// Profile schemas
export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  socialLinks: z
    .object({
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});

// Review schemas
export const reviewSchema = z.object({
  courseId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(500),
});

// Payment schemas
export const paymentIntentSchema = z.object({
  courseId: z.string().uuid(),
  paymentMethodId: z.string(),
});

// Validation helper function
export async function validateRequest<T>(
  schema: z.Schema<T>,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError.validation('Validation failed', {
        errors: error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    throw error;
  }
}

// Type inference helper
export type InferValidation<T extends z.Schema> = z.infer<T>; 