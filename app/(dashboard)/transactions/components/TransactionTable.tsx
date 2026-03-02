import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";
import { format, parseISO } from "date-fns";
import { Edit2, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionTableProps {
  transactions: Transaction[];
  runningBalances: Map<string, number>;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionTable({
  transactions,
  runningBalances,
  onEdit,
  onDelete,
}: TransactionTableProps) {
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
                <th className="text-right text-sm font-medium text-muted-foreground px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground py-12 text-sm">
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id}>
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
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-muted rounded-sm transition-colors cursor-pointer"
                          >
                            <MoreVertical size={16} className="text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(t)}>
                            <Edit2 size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(t.id)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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