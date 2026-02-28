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
import { User } from "@/types";

interface SidebarProps {
  pathname: string;
  onClose?: () => void;
  user?: User;
}

const NAV_ITEMS = [
  { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Goals",        href: "/goals",        icon: Target },
];

function getInitials(user?: User): string {
  if (!user) return "?";
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
}

// The sidebar is ALWAYS a dark surface (#04040a) in both light and dark mode.
// Never use text-background or text-foreground here — those flip with the theme.
// Always use explicit white/white-opacity values for text on this surface.
export default function SidebarContent({ pathname, onClose, user }: SidebarProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-sidebar text-white">

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
        <h1 className="text-3xl font-bebas text-white my-3">
          <span className="text-primary">MONEY</span>HANA
        </h1>
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
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-all duration-150 group
                ${active
                  ? "bg-primary/10 text-primary"
                  : "text-white/50 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon
                size={18}
                className={`transition-colors ${active ? "text-primary" : "text-white/40 group-hover:text-white/70"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
            {getInitials(user)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </p>
            <p className="text-xs text-white/40 truncate">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

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