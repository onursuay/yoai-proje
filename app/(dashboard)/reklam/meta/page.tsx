"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { MetaKpiCards } from "@/components/meta/MetaKpiCards";
import { MetaTabs } from "@/components/meta/MetaTabs";
import { MetaToolbar } from "@/components/meta/MetaToolbar";
import { MetaCampaignTable } from "@/components/meta/MetaCampaignTable";
import { MetaAccountGate } from "@/components/meta/MetaAccountGate";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import { formatDateRange } from "@/lib/format";
import { MetaIcon } from "@/components/icons/MetaIcon";

interface KPIMetrics {
  totalSpend: number;
  totalPurchaseValue: number;
  roas: number;
  purchaseConversion: number;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  daily_budget?: string;
  created_time: string;
}

export default function ReklamMetaPage() {
  const selectedAdAccountId = useAppStore((state) => state.selectedAdAccountId);
  const selectedDateRange = useAppStore((state) => state.selectedDateRange);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [kpis, setKpis] = useState<KPIMetrics | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [sparklineData, setSparklineData] = useState<
    Array<{ date: string; spend: number }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateRangeLabel = formatDateRange(
    selectedDateRange.since,
    selectedDateRange.until
  );

  const fetchData = async () => {
    if (!selectedAdAccountId) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch campaigns
      const campaignsRes = await fetch(
        `/api/meta/campaigns?ad_account_id=${selectedAdAccountId}`
      );
      const campaignsData = await campaignsRes.json();
      if (campaignsData.error) {
        throw new Error(campaignsData.error);
      }
      setCampaigns(campaignsData.data || []);

      // Fetch insights
      const insightsRes = await fetch(
        `/api/meta/insights?ad_account_id=${selectedAdAccountId}&since=${selectedDateRange.since}&until=${selectedDateRange.until}`
      );
      const insightsData = await insightsRes.json();
      if (insightsData.error) {
        throw new Error(insightsData.error);
      }
      setKpis(insightsData.kpis);
      setInsights(insightsData.insights || []);

      // Fetch timeseries for sparkline
      const timeseriesRes = await fetch(
        `/api/meta/timeseries?ad_account_id=${selectedAdAccountId}&since=${selectedDateRange.since}&until=${selectedDateRange.until}`
      );
      const timeseriesData = await timeseriesRes.json();
      if (!timeseriesData.error) {
        setSparklineData(timeseriesData.data || []);
      }
    } catch (err: any) {
      setError(err.message || "Veri yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAdAccountId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAdAccountId, selectedDateRange]);

  if (!selectedAdAccountId) {
    return (
      <PageShell
        icon={<MetaIcon className="h-5 w-5" />}
        title="Reklam Yöneticisi"
        subtitle="Meta reklam kampanyalarınızı yönetin"
      >
        <MetaAccountGate />
      </PageShell>
    );
  }

  return (
    <PageShell
      icon={<MetaIcon className="h-5 w-5" />}
      title="Reklam Yöneticisi"
      subtitle="Meta reklam kampanyalarınızı yönetin"
      action={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Kampanya Oluştur
        </Button>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-4"
              onClick={fetchData}
            >
              Tekrar Dene
            </Button>
          </div>
        )}

        {kpis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{dateRangeLabel}</span>
            </div>
            <MetaKpiCards kpis={kpis} sparklineData={sparklineData} />
          </div>
        )}

        <MetaTabs activeTab={activeTab} onTabChange={setActiveTab}>
          <TabsContent value="campaigns" className="space-y-4">
            <MetaToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showInactive={showInactive}
              onShowInactiveChange={setShowInactive}
              dateRange="last-30"
              onDateRangeChange={() => {}}
              onRefresh={fetchData}
            />
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">Yükleniyor...</p>
              </div>
            ) : (
              <MetaCampaignTable data={insights} campaigns={campaigns} />
            )}
          </TabsContent>
          <TabsContent value="adsets">
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Yakında...</p>
            </div>
          </TabsContent>
          <TabsContent value="ads">
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Yakında...</p>
            </div>
          </TabsContent>
        </MetaTabs>
      </div>
    </PageShell>
  );
}

