// components/skeletons/RecentTransactionsSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentTransactionsSkeleton() {
  return (
    <Card className="flex-1 border-0 shadow-sm bg-card rounded-sm">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-center gap-4 py-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-16 ml-auto" />
                <Skeleton className="h-3 w-10 ml-auto" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}