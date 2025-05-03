'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useSession } from "next-auth/react";
import ErrorBoundary from '@/components/ui/error-boundary';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.replace("/login");
    }
  }, [session, status, router]);

  // Persist sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('adminSidebarOpen');
    if (saved !== null) setIsSidebarOpen(saved === 'true');
  }, []);
  useEffect(() => {
    localStorage.setItem('adminSidebarOpen', String(isSidebarOpen));
  }, [isSidebarOpen]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Courses',
      href: '/admin/courses',
      icon: BookOpen,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900/95">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-card dark:bg-gray-800/90 border-r dark:border-gray-700 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* User Info */}
          {session?.user && (
            <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
              <Avatar>
                <AvatarImage src={session.user.image || undefined} alt={session.user.name || 'Admin'} />
                <AvatarFallback>{session.user.name ? session.user.name[0] : 'A'}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{session.user.name || 'Admin'}</span>
            </div>
          )}
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b dark:border-gray-700">
            <h1 className="text-xl font-bold tracking-tight dark:text-gray-100">
              Admin Panel
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'outline' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive
                      ? 'bg-muted dark:bg-gray-700/50'
                      : 'hover:bg-muted/60 dark:hover:bg-gray-700/30'
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="border-t dark:border-gray-700 p-4">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`min-h-screen transition-all duration-200 ease-in-out ${
          isSidebarOpen ? 'lg:pl-64' : ''
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
} 