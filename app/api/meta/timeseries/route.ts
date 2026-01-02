import { NextRequest, NextResponse } from "next/server";
import { metaFetch, formatMetaError } from "@/lib/metaFetch";

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
      level: "account",
      time_increment: "1",
      time_range: JSON.stringify({ since, until }),
      fields: "date_start,spend",
      limit: "100",
    };

    const data = await metaFetch<{
      data: Array<{
        date_start: string;
        spend?: string;
      }>;
    }>(baseUrl, params, { ttl: 60000 }); // 1 minute cache

    const timeseries = data.data.map((item) => ({
      date: item.date_start,
      spend: parseFloat(item.spend || "0"),
    }));

    return NextResponse.json({ data: timeseries });
  } catch (error: any) {
    console.error("Meta timeseries error:", error);
    return NextResponse.json(
      { error: formatMetaError(error) },
      { status: error?.status || 500 }
    );
  }
}

