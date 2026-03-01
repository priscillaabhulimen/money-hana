'use client';

// import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { User } from "@/types";

interface AppShellProps {
  children: React.ReactNode;
}

// Stub user — replace with real auth context / session in Week 3
const STUB_USER: User = {
  id: "1",
  firstName: "Priscilla",
  lastName: "A",
  email: "priscilla@email.com",
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar pathname={pathname} user={STUB_USER} />

      <SidebarInset className="bg-background">
        {/* Mobile top bar — SidebarTrigger replaces the manual hamburger */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-sidebar">
          <SidebarTrigger className="text-white/60 hover:text-white hover:bg-white/10" />
          <h1 className="text-3xl font-bebas text-white">
            <span className="text-primary">MONEY</span>HANA
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}