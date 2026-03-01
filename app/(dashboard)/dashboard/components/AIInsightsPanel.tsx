import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Target } from "lucide-react";
import { AIInsight, InsightType } from "@/types";

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
        <CardTitle className="text-sm font-light text-muted-foreground">
          AI Insights
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
