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
      <div className="container grid flex-1 gap-10 md:grid-cols-[240px_1fr] py-10">
        <aside className="hidden md:flex flex-col w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="card mb-6 flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-accent/10">
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || 'User'} />
              <AvatarFallback>{session.user?.name ? session.user.name[0] : 'U'}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg gradient-text">Welcome, {session.user?.name || 'User'}!</span>
          </div>
          <div className="card p-8 bg-card/90 shadow-xl">
            {children}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}