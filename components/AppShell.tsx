'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, TrendingUp } from "lucide-react";
import SidebarContent from "./SidebarContent";

interface AppShellProps {
    children: React.ReactNode
}

// ── Root layout shell ──────────────────────────────────────
export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a14] overflow-hidden">

      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/10">
        <SidebarContent pathname={pathname} onClose={function (): void {} } />
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#04040a]">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
              <TrendingUp size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white">
              Bux<span className="text-[#a855f7]">aplenty</span>
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}