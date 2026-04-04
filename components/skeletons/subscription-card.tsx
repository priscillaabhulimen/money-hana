import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm p-0 pb-6">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-7 w-7 rounded-sm" />
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="space-y-1 flex flex-col items-end">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
