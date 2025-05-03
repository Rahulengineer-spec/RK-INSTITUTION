import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorBoundary from '@/components/ui/error-boundary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DashboardNav } from "@/components/dashboard/nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;
  if (!session) {
    router.replace("/auth/login");
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b mb-4">
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || 'User'} />
              <AvatarFallback>{session.user?.name ? session.user.name[0] : 'U'}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg">Welcome, {session.user?.name || 'User'}!</span>
          </div>
          {children}
        </main>
      </div>
    </ErrorBoundary>
  );
}