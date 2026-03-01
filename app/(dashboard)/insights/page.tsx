'use client';

import { useState, useMemo } from "react";
import { AIInsight, InsightType } from "@/types";
import { format, parseISO } from "date-fns";
import InsightTypeToggle from "./components/InsightTypeToggle";
import InsightGroup from "./components/InsightGroup";
import InsightPagination from "./components/InsightPagination";
import { getInsights } from "@/services/insights";

const ROWS_PER_PAGE = 30;

function groupByDate(insights: AIInsight[]): Record<string, AIInsight[]> {
  const sorted = [...insights].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return sorted.reduce<Record<string, AIInsight[]>>((acc, insight) => {
    const date = format(parseISO(insight.created_at), "MMMM d, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(insight);
    return acc;
  }, {});
}

export default function InsightsPage() {
  const insights: AIInsight[] = getInsights();

  const [activeType, setActiveType] = useState<InsightType | "All">("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeType === "All") return insights;
    return insights.filter((i) => i.type === activeType);
  }, [insights, activeType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const grouped = groupByDate(paginated);

  function handleTypeChange(value: InsightType | "All") {
    setActiveType(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Insights</h1>
      </div>

      <InsightTypeToggle active={activeType} onChange={handleTypeChange} />

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No insights for this filter.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([date, items]) => (
            <InsightGroup key={date} date={date} insights={items} />
          ))}
        </div>
      )}

      <InsightPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={setPage}
      />

    </div>
  );
}