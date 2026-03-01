'use client';

import { useState } from "react";
import { getTransactions } from "@/services/transactions";
import BalanceCard from "./components/BalanceCard";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import SpendingBreakdownChart from "./components/SpendingBreakdownChart";
import { AIInsight, Transaction } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentTransactions from "./components/RecentTransactions";
import AIInsightsPanel from "./components/AIInsightsPanel";
import { getInsights } from "@/services/insights";

export type FilterPeriod = "week" | "month" | "year";

export default function DashboardPage() {
  const transactions: Transaction[] = getTransactions();
  const insights: AIInsight[] = getInsights();
  const [period, setPeriod] = useState<FilterPeriod>("month");

  let balance = 0, income = 0, expenses = 0;
  transactions.forEach((t) => {
    if (t.type === "income") { income += t.amount; balance += t.amount; }
    else { expenses += t.amount; balance -= t.amount; }
  });

  return (
    <div className="flex flex-col gap-6 px-8 py-10">
      {/* Balance */}
      <BalanceCard balance={balance} income={income} expenses={expenses} />

      <div className="h-px w-[90%] mx-auto bg-muted mb-3"></div>

      {/* Chart header row */}
      <div className="flex items-center justify-between ">
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

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-6">
        <IncomeExpenseChart transactions={transactions} period={period} />
        <SpendingBreakdownChart transactions={transactions} period={period} />
      </div>

      <div className="h-px w-[90%] mx-auto bg-muted mt-8"></div>

      {/* Insights and Transactions */}
      <div className="flex flex-col lg:flex-row gap-6">
        <RecentTransactions transactions={transactions} />
        <AIInsightsPanel insights={insights} />
      </div>
    </div>
  );
}