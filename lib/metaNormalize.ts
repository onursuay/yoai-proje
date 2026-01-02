export interface MetaInsight {
  campaign_id: string;
  campaign_name: string;
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  purchase_value: number;
  purchase_roas: number;
  message_starts: number;
}

export interface MetaInsightRaw {
  campaign_id?: string;
  campaign_name?: string;
  spend?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  actions?: Array<{ action_type: string; value?: string }>;
  action_values?: Array<{ action_type: string; value?: string }>;
  purchase_roas?: Array<{ value?: string }>;
}

export function normalizeInsights(raw: MetaInsightRaw[]): MetaInsight[] {
  return raw.map((item) => {
    const parseNumber = (val: string | undefined): number => {
      if (!val) return 0;
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    };

    const purchaseValue =
      item.action_values?.find((a) => a.action_type === "purchase")?.value || "0";
    const messageStarts =
      item.actions?.find((a) => a.action_type === "messaging_conversation_started_7d")
        ?.value || "0";
    const roas = item.purchase_roas?.[0]?.value || "0";

    return {
      campaign_id: item.campaign_id || "",
      campaign_name: item.campaign_name || "",
      spend: parseNumber(item.spend),
      impressions: parseNumber(item.impressions),
      reach: parseNumber(item.reach),
      clicks: parseNumber(item.clicks),
      ctr: parseNumber(item.ctr),
      cpc: parseNumber(item.cpc),
      cpm: parseNumber(item.cpm),
      purchase_value: parseNumber(purchaseValue),
      purchase_roas: parseNumber(roas),
      message_starts: parseNumber(messageStarts),
    };
  });
}

export interface KPIMetrics {
  totalSpend: number;
  totalPurchaseValue: number;
  roas: number;
  purchaseConversion: number;
}

export function calculateKPIs(insights: MetaInsight[]): KPIMetrics {
  const totalSpend = insights.reduce((sum, item) => sum + item.spend, 0);
  const totalPurchaseValue = insights.reduce((sum, item) => sum + item.purchase_value, 0);
  const roas = totalSpend > 0 ? totalPurchaseValue / totalSpend : 0;
  return {
    totalSpend,
    totalPurchaseValue,
    roas,
    purchaseConversion: totalPurchaseValue,
  };
}

