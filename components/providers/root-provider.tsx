"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from '@/components/site-header'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import Loading from '@/components/ui/loading'
import { SessionProvider } from "next-auth/react";

export function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <SupabaseProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <div className="relative flex min-h-screen flex-col">
                <Suspense fallback={<div className="h-16" />}>
                  <SiteHeader />
                </Suspense>
                <main className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
                      <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-y-[30%] translate-x-[20%] rounded-full bg-primary/5 blur-[80px] dark:bg-primary/10" />
                      <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] -translate-y-[30%] -translate-x-[20%] rounded-full bg-primary/5 blur-[80px] dark:bg-primary/10" />
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                      <Suspense fallback={<Loading />}>
                        {children}
                      </Suspense>
                    </div>
                  </div>
                </main>
                <Suspense fallback={<div className="h-16" />}>
                  <Footer />              </Suspense>
              </div>
          </ThemeProvider>
        </SupabaseProvider>
      </TooltipProvider>
    </SessionProvider>
  )
} 