import { Subscription, getCategoryLabel } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Trash, FlaskConical } from "lucide-react";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

function formatFrequency(frequency: string): string {
  return frequency.charAt(0).toUpperCase() + frequency.slice(1);
}

function formatBillingType(billing_type: string): string {
  return billing_type === "fixed_date" ? "Fixed date" : "Periodic";
}

function formatDueDate(dateStr: string): string {
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
  const amount = parseFloat(subscription.amount);

  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm p-0 pb-6">
      <CardContent className="pt-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{subscription.name}</p>
              {subscription.is_trial && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-sm">
                  <FlaskConical size={10} />
                  Trial
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{getCategoryLabel(subscription.category)}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1.5 hover:bg-muted rounded-sm transition-colors cursor-pointer"
              >
                <MoreVertical size={16} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(subscription)}>
                <Edit2 size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(subscription.id)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Amount + Due date */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="text-lg font-semibold">${amount.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Next due</p>
            <p className="text-sm font-medium">{formatDueDate(subscription.next_due_date)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {formatFrequency(subscription.frequency)} · {formatBillingType(subscription.billing_type)}
          </p>
          {subscription.is_trial && subscription.trial_ends_at && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Trial ends {formatDueDate(subscription.trial_ends_at)}
            </p>
          )}
        </div>

      </CardContent>
    </Card>
  );
}