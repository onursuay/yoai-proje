import { NextRequest, NextResponse } from "next/server";
import { metaFetch, formatMetaError } from "@/lib/metaFetch";
import { normalizeInsights, calculateKPIs, type MetaInsight } from "@/lib/metaNormalize";

const API_VERSION = process.env.META_API_VERSION || "v24.0";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const adAccountId = searchParams.get("ad_account_id");
    const since = searchParams.get("since");
    const until = searchParams.get("until");

    if (!adAccountId || !since || !until) {
      return NextResponse.json(
        { error: "ad_account_id, since, and until are required" },
        { status: 400 }
      );
    }

    const baseUrl = `https://graph.facebook.com/${API_VERSION}/${adAccountId}/insights`;
    const params: Record<string, string> = {
      level: "campaign",
      time_range: JSON.stringify({ since, until }),
      fields:
        "campaign_id,campaign_name,spend,impressions,reach,clicks,ctr,cpc,cpm,actions,action_values,purchase_roas",
      limit: "100",
    };

    const data = await metaFetch<{
      data: Array<{
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
      }>;
    }>(baseUrl, params, { ttl: 60000 }); // 1 minute cache

    const normalized = normalizeInsights(data.data);
    const kpis = calculateKPIs(normalized);

    return NextResponse.json({
      kpis,
      insights: normalized,
    });
  } catch (error: any) {
    console.error("Meta insights error:", error);
    return NextResponse.json(
      { error: formatMetaError(error) },
      { status: error?.status || 500 }
    );
  }
}

