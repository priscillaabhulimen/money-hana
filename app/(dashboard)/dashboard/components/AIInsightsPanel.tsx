'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, TrendingUp, Target, RefreshCw } from "lucide-react";
import { AIInsight, InsightType } from "@/types";
import Link from "next/link";

interface AIInsightsPanelProps {
  insights: AIInsight[];
  isLoading?: boolean;
  onRefresh?: () => void;
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

export default function AIInsightsPanel({ insights, isLoading, onRefresh }: AIInsightsPanelProps) {
  const displayed = insights.slice(0, 3);
  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <p className="text-sm font-light text-muted-foreground">Recent Insights</p>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            title="Refresh insights"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-sm" />
            ))}
          </div>
        ) : (
          <>
          <ul className="flex flex-col gap-3 overflow-y-auto pr-1">
            {displayed.map((insight) => {
              const config = getInsightConfig(insight.type);
              
              return (
                <li key={insight.id} className={`flex gap-3 p-3 rounded-sm ${config.bg}`}>
                  <div className={`shrink-0 mt-0.5 ${config.accent}`}>
                    {config.icon}
                  </div>
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

          {insights.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <Link
                href="/insights"
                className="text-xs text-primary hover:underline"
              >
                View all insights
              </Link>
            </div>
          )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
