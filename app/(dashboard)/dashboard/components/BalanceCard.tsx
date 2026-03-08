import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { FilterPeriod } from "../page";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
  period: FilterPeriod;
}

const PERIOD_LABELS: Record<FilterPeriod, string> = {
  week: "This Week",
  month: "This Month",
  year: "This Year",
};

export default function BalanceCard({ balance, income, expenses, period }: BalanceCardProps) {
  const periodLabel = PERIOD_LABELS[period];

  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardContent>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">

          {/* Balance — always cumulative */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">Total Balance</p>
              <Wallet className="text-muted-foreground" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6">${balance.toFixed(2)}</h2>
          </div>

          <div className="w-full h-px lg:w-px lg:h-16 lg:my-auto bg-border" />

          {/* Expenses — period-aware */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">{periodLabel}{"'s"} Expenses</p>
              <ArrowUpRight className="text-red-500/85" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6 text-red-500/85">${expenses.toFixed(2)}</h2>
          </div>

          <div className="w-full h-px lg:w-px lg:h-16 lg:my-auto bg-border" />

          {/* Income — period-aware */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">{periodLabel}{"'s"} Income</p>
              <ArrowDownLeft className="text-green-500" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6 text-green-500">${income.toFixed(2)}</h2>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}