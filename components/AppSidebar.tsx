'use client';

import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { User } from "@/types";

interface AppSidebarProps {
  pathname: string;
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

// This component owns the visual styling — bg-sidebar, text-white etc.
// SidebarContent/SidebarHeader etc. are layout primitives from shadcn,
// we override their colours via the CSS token --sidebar in globals.css.
export default function AppSidebar({ pathname, user }: AppSidebarProps) {
  const router = useRouter();

  return (
    <Sidebar >

      {/* Logo */}
      <SidebarHeader className="px-6 py-4 border-b border-white/10">
        <h1 className="text-3xl font-bebas text-white my-3">
          <span className="text-primary">MONEY</span>HANA
        </h1>
      </SidebarHeader>

      {/* Nav links */}
      <SidebarContent className="px-3 py-4">
        <SidebarMenu>
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`
                    rounded-md text-sm font-medium transition-all duration-150 py-3
                    ${active
                      ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Link href={href}>
                    <Icon
                      size={18}
                      className={`transition-colors ${active ? "text-primary" : "text-white/40 group-hover:text-white/70"}`}
                    />
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User + Logout */}
      <SidebarFooter className="px-3 py-4 border-t border-white/10">
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

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <LogOut size={18} className="text-white/40 group-hover:text-white/70 transition-colors" />
              Log out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  );
}