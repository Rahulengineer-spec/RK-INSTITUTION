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
  Bell,
  ChevronDown,
  Home,
  Info,
  Shield,
  User,
  HelpCircle,
} from 'lucide-react';
import { useSession } from "next-auth/react";
import ErrorBoundary from '@/components/ui/error-boundary';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
      section: 'Main',
      items: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen },
        { name: 'Users', href: '/admin/users', icon: Users },
      ],
    },
    {
      section: 'Settings',
      items: [
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ],
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
    <div className="min-h-screen bg-background dark:bg-gray-900/95 flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-card/80 dark:bg-gray-900/80 border-b dark:border-gray-800 flex items-center px-4 lg:pl-64 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        {/* Sidebar toggle for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        {/* Search bar */}
        <div className="flex-1 max-w-md">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>
        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="ml-2">
          <Bell className="h-5 w-5" />
        </Button>
        {/* User avatar dropdown */}
        <div className="relative ml-4">
          <Button variant="ghost" size="icon" onClick={() => setIsUserMenuOpen((v) => !v)}>
            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'Admin'} />
              <AvatarFallback>{session?.user?.name ? session.user.name[0] : 'A'}</AvatarFallback>
            </Avatar>
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border dark:border-gray-700 rounded shadow-lg z-50">
              <Link href="/admin/profile" className="block px-4 py-2 hover:bg-muted/60 dark:hover:bg-gray-700/30">Profile</Link>
              <Link href="/admin/settings" className="block px-4 py-2 hover:bg-muted/60 dark:hover:bg-gray-700/30">Settings</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card dark:bg-gray-900 border-r dark:border-gray-800 transition-transform duration-200 ease-in-out flex flex-col shadow-lg lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-800">
          <span className="text-2xl font-bold tracking-tight text-primary">Admin<span className="text-accent">Dash</span></span>
        </div>
        {/* User Info */}
        {session?.user && (
          <div className="flex items-center gap-3 p-4 border-b dark:border-gray-800">
            <Avatar>
              <AvatarImage src={session.user.image || undefined} alt={session.user.name || 'Admin'} />
              <AvatarFallback>{session.user.name ? session.user.name[0] : 'A'}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{session.user.name || 'Admin'}</span>
          </div>
        )}
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
          {navigation.map((section) => (
            <div key={section.section}>
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{section.section}</div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? 'outline' : 'ghost'}
                      className={`w-full justify-start rounded-lg ${
                        isActive
                          ? 'bg-muted dark:bg-gray-800/70 font-semibold'
                          : 'hover:bg-muted/60 dark:hover:bg-gray-800/40'
                      }`}
                      onClick={() => router.push(item.href)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        {/* Sidebar Footer */}
        <div className="mt-auto border-t dark:border-gray-800 p-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>v1.0.0</span>
          <Link href="/admin/support" className="hover:underline flex items-center gap-1"><HelpCircle className="h-4 w-4" />Support</Link>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen pt-20 transition-all duration-200 ease-in-out ${
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