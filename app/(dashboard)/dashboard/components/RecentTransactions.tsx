import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <p className="text-sm font-light text-muted-foreground">Recent Transactions</p>
          <Link
            href="/transactions"
            className="text-muted-foreground hover:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
          >
            <span className="sr-only">View all transactions</span>
            <ArrowUpRight size={28} className="text-muted-foreground p-1 rounded-sm" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3 gap-4">

              {/* Icon */}
              <div className={`p-2 rounded-full shrink-0 ${
                t.type === "income"
                  ? "bg-green-500/10"
                  : "bg-red-500/10"
              }`}>
                {t.type === "income"
                  ? <ArrowDownLeft size={14} className="text-green-500" />
                  : <ArrowUpRight size={14} className="text-red-500/85" />
                }
              </div>

              {/* Note + category */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.note ?? t.category}</p>
                <p className="text-xs text-muted-foreground">{t.category}</p>
              </div>

              {/* Amount + date */}
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold ${
                  t.type === "income" ? "text-green-500" : "text-red-500/85"
                }`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(t.date), "MMM d")}
                </p>
              </div>

            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
