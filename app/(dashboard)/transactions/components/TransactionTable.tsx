import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";
import { format, parseISO } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
  runningBalances: Map<number, number>;
}

export default function TransactionTable({ transactions, runningBalances }: TransactionTableProps) {
  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Date</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Note</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Category</th>
                <th className="text-right text-sm font-medium text-muted-foreground px-5 py-3">Amount</th>
                <th className="text-right text-sm font-medium text-muted-foreground px-5 py-3">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted-foreground py-12 text-sm">
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      {format(parseISO(t.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-5 py-3.5 max-w-xs truncate">
                      {t.note ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-sm">
                        {t.category}
                      </span>
                    </td>
                    <td className={`px-5 py-3.5 text-right font-medium whitespace-nowrap ${
                      t.type === "income" ? "text-green-500" : "text-red-500/85"
                    }`}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground whitespace-nowrap">
                      ${runningBalances.get(t.id)?.toFixed(2) ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
