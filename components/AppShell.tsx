'use client';

// import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import NotificationBell from "./NotificationBell";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      router.replace("/login");
    }
  }, [isError, isLoading, router]);

  useEffect(() => {
    if (isLoading) return;
    if (data?.data && !data.data.isVerified) {
      router.replace("/verify-email");
    }
  }, [data, isLoading, router]);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  if (data?.data && !data.data.isVerified) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar pathname={pathname} user={data?.data} />

      <SidebarInset className="bg-background flex flex-col h-screen">
        <header className="lg:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-sidebar shrink-0">
          <SidebarTrigger className="text-white/60 hover:text-white hover:bg-white/10" />
          <h1 className="text-3xl font-bebas text-white flex-1">
            <span className="text-primary">MONEY</span>HANA
          </h1>
          <NotificationBell />
        </header>
        <header className="hidden lg:flex sticky top-0 z-10 items-center justify-end px-6 py-2 border-b border-border bg-background shrink-0">
          <NotificationBell />
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}