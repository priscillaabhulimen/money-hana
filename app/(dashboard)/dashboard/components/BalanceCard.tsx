import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export default function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardContent>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">

          {/* Balance */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">Total Balance</p>
              <Wallet className="text-muted-foreground" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6">${balance.toFixed(2)}</h2>
          </div>

          <div className="w-full h-px lg:w-px lg:h-16 lg:my-auto bg-border" />

          {/* Expenses */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">Total Expenses</p>
              <ArrowUpRight className="text-red-500/85" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6 text-red-500/85">${expenses.toFixed(2)}</h2>
          </div>

          <div className="w-full h-px lg:w-px lg:h-16 lg:my-auto bg-border" />

          {/* Income */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-muted-foreground">Total Income</p>
              <ArrowDownLeft className="text-green-500" size={16} />
            </div>
            <h2 className="text-3xl font-bold pt-6 text-green-500">${income.toFixed(2)}</h2>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}