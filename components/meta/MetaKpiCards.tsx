"use client";

import { MetricCard } from "@/components/common/MetricCard";
import { formatCurrency, formatNumber } from "@/lib/format";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface KPIMetrics {
  totalSpend: number;
  totalPurchaseValue: number;
  roas: number;
  purchaseConversion: number;
}

interface MetaKpiCardsProps {
  kpis: KPIMetrics;
  sparklineData?: Array<{ date: string; spend: number }>;
  currency?: string;
}

export function MetaKpiCards({
  kpis,
  sparklineData = [],
  currency = "TRY",
}: MetaKpiCardsProps) {
  const sparklineChartData = sparklineData.map((item) => ({
    value: item.spend,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Harcanan Tutar"
        value={formatCurrency(kpis.totalSpend, currency)}
        delta="-6%"
        deltaPositive={true}
        sparkline={
          sparklineChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineChartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : undefined
        }
      />
      <MetricCard
        title="Alışveriş Dönüşümü"
        value={formatCurrency(kpis.purchaseConversion, currency)}
      />
      <MetricCard
        title="ROAS"
        value={kpis.roas > 0 ? formatNumber(kpis.roas) : "0"}
      />
    </div>
  );
}

