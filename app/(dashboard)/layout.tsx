import AppShell from "@/components/AppShell";
import NotificationBell from "@/components/NotificationBell";

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashLayoutProps) {
  return (
    <AppShell>
      <div className="h-12 bg-accent/40 py-2 px-8 flex justify-end">
        <NotificationBell />
      </div>
      {children}
    </AppShell>
  );
}