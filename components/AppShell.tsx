'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import SidebarContent from "./SidebarContent";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Desktop sidebar — onClose intentionally omitted (undefined), hides the X button */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/10">
        <SidebarContent pathname={pathname} user={STUB_USER} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer — onClose provided so X button renders */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
          user={STUB_USER}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-sidebar">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-3xl font-bebas text-white">
            <span className="text-primary">MONEY</span>HANA
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}