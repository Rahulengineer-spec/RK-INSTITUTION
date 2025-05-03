'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  slug: string
}

export function CourseCard({
  id,
  title,
  description,
  image,
  price,
  slug,
}: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold line-clamp-2 mb-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-bold">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <Button asChild>
            <Link href={`/courses/${slug}`}>Learn More</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 