import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | ReactNode;
  delta?: string;
  deltaPositive?: boolean;
  sparkline?: ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  delta,
  deltaPositive,
  sparkline,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-2xl font-semibold">{value}</div>
            {delta && (
              <p
                className={cn(
                  "text-xs mt-1",
                  deltaPositive ? "text-red-600" : "text-green-600"
                )}
              >
                {delta}
              </p>
            )}
          </div>
          {sparkline && <div className="ml-4 h-12 w-24">{sparkline}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

