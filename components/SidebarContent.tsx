"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  LogOut,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  pathname: string,
  onClose?: () => void
}

// ── Nav items ──────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Goals",        href: "/goals",        icon: Target },
];

// ── Sidebar content (shared between desktop + mobile) ──────
export default function SidebarContent({ pathname, onClose }: SidebarProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full bg-[#04040a] text-white">

      {/* Logo */}
      <div className="flex items-start gap-2 px-6 py-4 border-b border-white/10">
        <h1 className="text-3xl font-bebas text-white my-3"><span className="text-[#1919bc]">MONEY</span>HANA</h1>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-md hover:bg-white/10 transition-colors lg:hidden"
          >
            <X size={22} />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 group
                ${active
                  ? "bg-[#7c3aed]/20 text-[#c084fc] border border-[#7c3aed]/40"
                  : "text-white/50 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon
                size={18}
                className={`
                  transition-colors
                  ${active ? "text-[#a855f7]" : "text-white/40 group-hover:text-white/70"}
                `}
              />
              {label}
              {/* Active indicator dot */}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-xs font-bold shrink-0">
            PA
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Priscilla A.</p>
            <p className="text-xs text-white/40 truncate">priscilla@email.com</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150 group"
        >
          <LogOut size={18} className="text-white/40 group-hover:text-white/70 transition-colors" />
          Log out
        </button>
      </div>
    </div>
  );
}