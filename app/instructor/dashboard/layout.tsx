import { ReactNode } from "react";
import { InstructorNav } from "@/components/instructor/nav";

interface InstructorDashboardLayoutProps {
  children: ReactNode;
}

export default function InstructorDashboardLayout({
  children,
}: InstructorDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <InstructorNav />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 