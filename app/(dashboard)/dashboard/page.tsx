'use client';

import { useNotifications, useConfirmPayment, useDismissPayment } from "@/hooks/useNotifications";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState, useMemo, useEffect } from "react";
import BalanceCard from "./components/BalanceCard";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import SpendingBreakdownChart from "./components/SpendingBreakdownChart";
import RecentTransactions from "./components/RecentTransactions";
import AIInsightsPanel from "./components/AIInsightsPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/hooks/useTransactions";
import { getInsights } from "@/services/insights";
import { isWithinInterval, parseISO } from "date-fns";
import { Transaction, AIInsight, getCategoryLabel } from "@/types";


export type FilterPeriod = "week" | "month" | "year";

function filterByPeriod(transactions: Transaction[], period: FilterPeriod): Transaction[] {
  const now = new Date();
  return transactions.filter((t) => {
    const d = parseISO(t.date);
    if (period === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return isWithinInterval(d, { start: startOfWeek, end: endOfWeek });
    }
    if (period === "month") {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    return d.getFullYear() === now.getFullYear();
  });
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<FilterPeriod>("year");

  // Fetch all transactions for dashboard (no pagination — we need full data for charts)
  const { data, isLoading } = useTransactions(1, undefined, undefined);
  const transactions = useMemo(() => data?.data ?? [], [data]);

  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(false);

  async function loadInsights(forceRefresh = false) {
    setInsightsLoading(true);
    try {
      const data = await getInsights(forceRefresh);
      setInsights(data);
    } finally {
      setInsightsLoading(false);
    }
  }

  useEffect(() => {
    loadInsights();
  }, []);

  const balance = useMemo(() =>
    transactions.reduce((sum, t) =>
      t.transaction_type === "income" ? sum + t.amount : sum - t.amount, 0
    ), [transactions]);

  const { income, expenses } = useMemo(() => {
    const periodTransactions = filterByPeriod(transactions, period);
    return periodTransactions.reduce(
      (acc, t) => {
        if (t.transaction_type === "income") acc.income += t.amount;
        else acc.expenses += t.amount;
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  }, [transactions, period]);

  const { data: notifications } = useNotifications();
const { mutate: confirm } = useConfirmPayment();
const { mutate: dismiss } = useDismissPayment();
const [confirmingId, setConfirmingId] = useState<string | null>(null);
const [dismissingId, setDismissingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <Select value={period} onValueChange={(v) => setPeriod(v as FilterPeriod)}>
          <SelectTrigger className="w-36 text-xs bg-muted border-0 shadow-none focus:ring-0 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {notifications && notifications.length > 0 && (
        <div className="flex flex-col gap-2">
          {notifications.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-sm"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {sub.name} was due on{" "}
                  {(() => {
                    const [y, m, d] = sub.next_due_date.slice(0, 10).split("-").map(Number);
                    return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                  })()}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${Number(sub.amount).toFixed(2)} · {getCategoryLabel(sub.category)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDismissingId(sub.id)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setConfirmingId(sub.id)}
                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  I paid this
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmingId}
        title="Confirm payment"
        description="This will log the payment as an expense in your transactions."
        confirmLabel="Yes, I paid"
        onConfirm={() => { confirm(confirmingId!); setConfirmingId(null); }}
        onCancel={() => setConfirmingId(null)}
      />

      <ConfirmDialog
        open={!!dismissingId}
        title="Dismiss notification"
        description="The due date will advance to the next cycle. No transaction will be created."
        confirmLabel="Dismiss"
        onConfirm={() => { dismiss(dismissingId!); setDismissingId(null); }}
        onCancel={() => setDismissingId(null)}
      />

      {isLoading ? (
        <Skeleton className="h-32 w-full rounded-sm" />
      ) : (
        <BalanceCard balance={balance} income={income} expenses={expenses} period={period} />
      )}

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-6">
        {isLoading ? (
          <>
            <Skeleton className="flex-1 h-72 rounded-sm" />
            <Skeleton className="flex-1 h-72 rounded-sm" />
          </>
        ) : (
          <>
            <IncomeExpenseChart transactions={transactions} period={period} />
            <SpendingBreakdownChart transactions={transactions} period={period} />
          </>
        )}
      </div>

      <div className="h-px w-[90%] mx-auto bg-muted mt-4" />

      {/* Recent Transactions and Insights */}
      <div className="flex flex-col lg:flex-row gap-6">
        {isLoading ? (
          <Skeleton className="flex-1 h-64 rounded-sm" />
        ) : (
          <RecentTransactions transactions={transactions} />
        )}
        <AIInsightsPanel
          insights={insights}
          isLoading={insightsLoading}
          onRefresh={() => loadInsights(true)}
        />
      </div>

    </div>
  );
}