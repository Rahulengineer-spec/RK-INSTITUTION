import { Level, Status } from '@prisma/client'

/**
 * Represents a course in the learning platform
 */
export interface Course {
  /** Unique identifier for the course */
  id: string
  /** Title of the course */
  title: string
  /** Short description for course preview/listing */
  description: string
  /** Detailed course description */
  fullDescription?: string
  /** Current price of the course */
  price: number
  /** Original price before any discounts */
  originalPrice?: number
  /** Name of the course instructor */
  instructor: string
  /** Primary category of the course */
  category: string
  /** Optional subcategory for more specific classification */
  subcategory?: string
  /** Duration of the course (e.g., "2h 30m") */
  duration: string
  /** Difficulty level of the course */
  level: Level
  /** Average rating of the course (0-5) */
  rating: number
  /** Number of enrolled students */
  students: number
  /** URL to the course thumbnail image */
  image?: string
  /** URL to the preview video */
  previewVideo?: string
  /** Current status of the course */
  status: Status
  /** List of topics covered in the course */
  syllabus: string[]
  /** List of prerequisites for taking the course */
  prerequisites?: string[]
  /** Learning outcomes of the course */
  whatYouWillLearn?: string[]
  /** Technical or other requirements for the course */
  requirements?: string[]
  /** Description of ideal students for this course */
  targetAudience: string[]
  /** Language the course is taught in */
  language: string
  /** Date when the course was last updated */
  lastUpdated: Date
  /** Total number of lectures in the course */
  lectures: number
  /** Total duration of the course in hours */
  totalHours: number
  /** Whether a certificate is provided upon completion */
  certificate: boolean
  /** Whether the course is marked as a bestseller */
  bestSeller: boolean
  /** Creation timestamp */
  createdAt: Date
  /** Last update timestamp */
  updatedAt: Date
  /** Deletion timestamp if course is soft-deleted */
  deletedAt?: Date
  /** ID of user who created the course */
  createdBy: string
  /** ID of user who last updated the course */
  updatedBy?: string
  /** Version number for optimistic concurrency */
  version: number
}

/**
 * Extends Course with instructor user details
 */
export interface CourseWithInstructor extends Course {
  instructorUser: {
    /** Instructor's user ID */
    id: string
    /** Instructor's display name */
    name: string
    /** URL to instructor's profile image */
    image?: string
    /** Instructor's biography */
    bio?: string
  }
} 