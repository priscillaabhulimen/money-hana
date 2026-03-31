'use client';

import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
  const { data: notifications } = useNotifications();
  const pendingCount = notifications?.length ?? 0;

  return (
    <button className="relative hover:bg-accent/65 p-2 rounded-sm">
      <Bell height={16} width={16} />
      {pendingCount > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
      )}
    </button>
  );
}