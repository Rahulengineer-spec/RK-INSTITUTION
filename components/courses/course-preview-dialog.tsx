"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Course, CourseWithInstructor } from "@/types/course"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import Image from "next/image"

interface CoursePreviewDialogProps {
  course: CourseWithInstructor | null
  isOpen: boolean
  onClose: () => void
}

export function CoursePreviewDialog({ course, isOpen, onClose }: CoursePreviewDialogProps) {
  if (!course) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{course.level}</Badge>
            <Badge variant="outline">{course.duration}</Badge>
            {course.bestSeller && <Badge variant="secondary">Bestseller</Badge>}
            <div className="flex items-center gap-1">
              <StarRating rating={course.rating} />
              <span className="text-sm text-muted-foreground">({course.students} students)</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
            {course.previewVideo ? (
              <iframe
                src={course.previewVideo}
                title={`${course.title} preview`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={course.image || "/placeholder-course.jpg"}
                  alt={course.title}
                  width={640}
                  height={360}
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <Image 
                src={course.instructorUser.image || "/placeholder-avatar.jpg"} 
                alt={course.instructorUser.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{course.instructorUser.name}</h4>
                {course.instructorUser.bio && (
                  <p className="text-sm text-muted-foreground">{course.instructorUser.bio}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Course Description</h3>
              <p className="text-sm text-muted-foreground">{course.fullDescription || course.description}</p>
            </div>
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">What You&apos;ll Learn</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="text-lg font-bold">
              ${course.price.toFixed(2)}
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${course.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                <Icons.cart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 