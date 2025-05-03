"use client"

import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  className?: string
  showEmpty?: boolean
  size?: number
}

export function StarRating({ 
  rating, 
  className, 
  showEmpty = true,
  size = 16 
}: StarRatingProps) {
  // Convert rating to number of full and half stars
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = showEmpty ? 5 - Math.ceil(rating) : 0

  return (
    <div className={cn("flex items-center", className)}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="fill-yellow-400 text-yellow-400"
          size={size}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf
          className="fill-yellow-400 text-yellow-400"
          size={size}
        />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-muted-foreground/25"
          size={size}
        />
      ))}
    </div>
  )
} 