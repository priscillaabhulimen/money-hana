import AppShell from "@/components/AppShell";

interface DashLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashLayoutProps) {
  return <AppShell>{children}</AppShell>;
}