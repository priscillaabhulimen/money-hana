import { AIInsight, InsightType } from "@/types";
import { AlertTriangle, TrendingUp, Target } from "lucide-react";
import { format, parseISO } from "date-fns";

interface InsightConfig {
  icon: React.ReactNode;
  label: string;
  accent: string;
  bg: string;
}

function getInsightConfig(type: InsightType): InsightConfig {
  switch (type) {
    case "flag":
      return {
        icon: <AlertTriangle size={15} />,
        label: "Spending Flag",
        accent: "text-red-500/85",
        bg: "bg-red-500/8",
      };
    case "pattern":
      return {
        icon: <TrendingUp size={15} />,
        label: "Pattern",
        accent: "text-[#1919bc]",
        bg: "bg-[#1919bc]/8",
      };
    case "goal_warning":
      return {
        icon: <Target size={15} />,
        label: "Goal Warning",
        accent: "text-amber-500",
        bg: "bg-amber-500/8",
      };
  }
}

interface InsightCardProps {
  insight: AIInsight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const config = getInsightConfig(insight.type);

  return (
    <div className={`flex gap-3 p-4 rounded-sm ${config.bg}`}>
      <div className={`shrink-0 mt-0.5 ${config.accent}`}>
        {config.icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className={`text-xs font-semibold uppercase tracking-wide ${config.accent}`}>
            {config.label}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(parseISO(insight.created_at), "MMM d, yyyy · h:mm a")}
          </p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {insight.message}
        </p>
      </div>
    </div>
  );
}
