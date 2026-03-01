import { AIInsight, InsightType } from "@/types";
import InsightCard from "./InsightCard";

const TYPE_ORDER: InsightType[] = ["flag", "goal_warning", "pattern"];

const TYPE_LABELS: Record<InsightType, string> = {
  flag: "Flags",
  goal_warning: "Goal Warnings",
  pattern: "Patterns",
};

interface InsightGroupProps {
  date: string;
  insights: AIInsight[];
}

export default function InsightGroup({ date, insights }: InsightGroupProps) {
  const byType = TYPE_ORDER.reduce<Record<string, AIInsight[]>>((acc, type) => {
    const matching = insights.filter((i) => i.type === type);
    if (matching.length > 0) acc[type] = matching;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-muted-foreground">{date}</h2>
      {Object.entries(byType).map(([type, items]) => (
        <div key={type} className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground/60 pl-1">
            {TYPE_LABELS[type as InsightType]}
          </p>
          {items.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ))}
    </div>
  );
}
