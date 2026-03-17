'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction, getCategoryLabel } from "@/types";
import { FilterPeriod } from "../page";
import { parseISO } from "date-fns";

interface SpendingBreakdownChartProps {
  transactions: Transaction[];
  period: FilterPeriod;
}

interface ChartEntry {
  name: string;
  value: number;
  fill: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function filterByPeriod(transactions: Transaction[], period: FilterPeriod): Transaction[] {
  const now = new Date();
  return transactions.filter((t) => {
    if (t.transaction_type === "income") return false;
    const d = parseISO(t.date);
    if (period === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return d >= startOfWeek && d <= endOfWeek;
    }
    if (period === "month") {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    return d.getFullYear() === now.getFullYear();
  });
}

function groupByCategory(transactions: Transaction[]): ChartEntry[] {
  const totals: Record<string, number> = {};
  transactions.forEach((t) => {
    const label = getCategoryLabel(t.category);
    totals[label] = (totals[label] ?? 0) + t.amount;
  });
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value)
    .map((entry, i) => ({
      ...entry,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-background shadow-sm rounded-sm px-3 py-2 text-sm">
      <p className="font-medium mb-1">{item.name}</p>
      <p style={{ color: item.payload.fill }}>${item.value.toFixed(2)}</p>
    </div>
  );
}

function CustomLegend({ data }: { data: ChartEntry[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <ul className="flex flex-col gap-1.5 mt-3">
      {data.map((entry) => (
        <li key={entry.name} className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{((entry.value / total) * 100).toFixed(0)}%</span>
            <span className="font-medium w-20 text-right">${entry.value.toFixed(2)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function SpendingBreakdownChart({ transactions, period }: SpendingBreakdownChartProps) {
  const data = useMemo(() => {
    const filtered = filterByPeriod(transactions, period);
    return groupByCategory(filtered);
  }, [transactions, period]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (data.length === 0) {
    return (
      <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-light text-muted-foreground">
            Spending Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No expense data for this period.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-light text-muted-foreground">
          Spending Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">${total.toFixed(2)}</p>
          </div>
        </div>

        <CustomLegend data={data} />
      </CardContent>
    </Card>
  );
}
