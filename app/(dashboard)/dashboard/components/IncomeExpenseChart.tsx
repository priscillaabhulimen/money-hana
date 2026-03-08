'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Transaction } from "@/types";
import { FilterPeriod } from "../page";

interface IncomeExpenseChartProps {
  transactions: Transaction[];
  period: FilterPeriod;
}

interface ChartEntry {
  label: string;
  Income: number;
  Expenses: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function getWeekNumber(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

function groupByWeek(transactions: Transaction[]): ChartEntry[] {
  const now = new Date();
  const filtered = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const weeks: Record<string, { income: number; expenses: number }> = {
    "Week 1": { income: 0, expenses: 0 },
    "Week 2": { income: 0, expenses: 0 },
    "Week 3": { income: 0, expenses: 0 },
    "Week 4": { income: 0, expenses: 0 },
  };
  filtered.forEach((t) => {
    const week = `Week ${getWeekNumber(new Date(t.date))}`;
    if (!weeks[week]) return;
    if (t.transaction_type === "income") weeks[week].income += t.amount;
    else weeks[week].expenses += t.amount;
  });
  return Object.entries(weeks).map(([label, v]) => ({
    label,
    Income: parseFloat(v.income.toFixed(2)),
    Expenses: parseFloat(v.expenses.toFixed(2)),
  }));
}

function groupByDay(transactions: Transaction[]): ChartEntry[] {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  const buckets: Record<string, { income: number; expenses: number }> = {};
  days.forEach((d) => (buckets[d] = { income: 0, expenses: 0 }));
  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d < startOfWeek || d > endOfWeek) return;
    const day = days[d.getDay()];
    if (t.transaction_type === "income") buckets[day].income += t.amount;
    else buckets[day].expenses += t.amount;
  });
  return days.map((day) => ({
    label: day,
    Income: parseFloat(buckets[day].income.toFixed(2)),
    Expenses: parseFloat(buckets[day].expenses.toFixed(2)),
  }));
}

function groupByMonth(transactions: Transaction[]): ChartEntry[] {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const now = new Date();
  const filtered = transactions.filter(
    (t) => new Date(t.date).getFullYear() === now.getFullYear()
  );
  const buckets: Record<string, { income: number; expenses: number }> = {};
  months.forEach((m) => (buckets[m] = { income: 0, expenses: 0 }));
  filtered.forEach((t) => {
    const month = months[new Date(t.date).getMonth()];
    if (t.transaction_type === "income") buckets[month].income += t.amount;
    else buckets[month].expenses += t.amount;
  });
  return months.map((month) => ({
    label: month,
    Income: parseFloat(buckets[month].income.toFixed(2)),
    Expenses: parseFloat(buckets[month].expenses.toFixed(2)),
  }));
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background shadow-sm rounded-sm px-3 py-2 text-sm">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  );
}

export default function IncomeExpenseChart({ transactions, period }: IncomeExpenseChartProps) {
  const data = useMemo(() => {
    if (period === "week") return groupByDay(transactions);
    if (period === "month") return groupByWeek(transactions);
    return groupByMonth(transactions);
  }, [period, transactions]);

  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-light text-muted-foreground">
          Income vs. Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="30%" barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={55} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
            <Bar dataKey="Income" fill="#22c55e" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Expenses" fill="rgb(239 68 68 / 0.85)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
