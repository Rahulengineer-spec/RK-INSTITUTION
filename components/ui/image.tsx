'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CustomImageProps extends React.ComponentProps<typeof Image> {
  containerClassName?: string
}

export default function CustomImage({
  src,
  alt,
  className,
  containerClassName,
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
} 