import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Target, ArrowUpRight } from "lucide-react";
import { AIInsight, InsightType } from "@/types";
import Link from "next/link";

interface AIInsightsPanelProps {
  insights: AIInsight[];
}

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

export default function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <p className="text-sm font-light text-muted-foreground">Recent Transactions</p>
          <Link
            href="/insights"
            className="text-muted-foreground hover:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
          >
            <span className="sr-only">View all insights</span>
            <ArrowUpRight size={28} className="text-muted-foreground p-1 rounded-sm" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
          {insights.map((insight) => {
            const config = getInsightConfig(insight.type);
            return (
              <li key={insight.id} className={`flex gap-3 p-3 rounded-sm ${config.bg}`}>

                {/* Icon */}
                <div className={`shrink-0 mt-0.5 ${config.accent}`}>
                  {config.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-0.5">
                  <p className={`text-xs font-semibold uppercase tracking-wide ${config.accent}`}>
                    {config.label}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {insight.message}
                  </p>
                </div>

              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
