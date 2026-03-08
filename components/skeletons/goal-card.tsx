import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GoalCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm bg-card rounded-sm p-0 pb-6">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-7 w-7 rounded-sm" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="space-y-1 items-center flex flex-col">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="space-y-1 items-end flex flex-col">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-14" />
          </div>
        </div>
        <Skeleton className="h-3 w-14 ml-auto mt-5" />
      </CardContent>
    </Card>
  );
}
