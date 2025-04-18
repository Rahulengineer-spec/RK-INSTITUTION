import { metadata } from './metadata'

export { metadata }

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
} 