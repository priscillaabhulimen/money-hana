// components/skeletons/TransactionTableSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionTableSkeleton() {
  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Note", "Category", "Amount", "Balance", "Actions"].map((h) => (
                  <th key={h} className="text-left text-sm font-medium text-muted-foreground px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-40" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-16 ml-auto" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-16 ml-auto" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-6 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}