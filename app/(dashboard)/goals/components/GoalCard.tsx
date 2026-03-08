import { Goal, getCategoryLabel } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Trash } from "lucide-react";
import GoalProgressBar from "./GoalProgressBar";

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

function getStatusLabel(percentage: number): { label: string; color: string } {
  if (percentage >= 100) return { label: "Over budget", color: "text-red-500/85" };
  if (percentage >= 90) return { label: "Critical", color: "text-red-500/85" };
  if (percentage >= 70) return { label: "Watch out", color: "text-amber-500" };
  return { label: "On track", color: "text-green-500" };
}

export default function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const percentage = Math.round((goal.current_spend / goal.monthly_limit) * 100);
  const remaining = Math.max(goal.monthly_limit - goal.current_spend, 0);
  const status = getStatusLabel(percentage);

  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm p-0 pb-6">
      <CardContent className="pt-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium">{getCategoryLabel(goal.category)}</p>
            <p className={`text-xs mt-0.5 ${status.color}`}>{status.label}</p>
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
              <DropdownMenuItem onClick={() => onEdit(goal)}>
                <Edit2 size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(goal.id)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Progress bar */}
        <GoalProgressBar percentage={percentage} />

        {/* Stats */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Spent</p>
            <p className="text-sm font-semibold">${goal.current_spend.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Limit</p>
            <p className="text-sm font-semibold">${goal.monthly_limit.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-sm font-semibold">${remaining.toFixed(2)}</p>
          </div>
        </div>

        {/* Percentage */}
        <p className="text-xs text-muted-foreground text-right mt-5 font-bold">
          {percentage}% used
        </p>

      </CardContent>
    </Card>
  );
}
