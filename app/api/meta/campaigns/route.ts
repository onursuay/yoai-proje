import { NextRequest, NextResponse } from "next/server";
import { metaFetch, formatMetaError } from "@/lib/metaFetch";

const API_VERSION = process.env.META_API_VERSION || "v24.0";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const adAccountId = searchParams.get("ad_account_id");

    if (!adAccountId) {
      return NextResponse.json(
        { error: "ad_account_id is required" },
        { status: 400 }
      );
    }

    const baseUrl = `https://graph.facebook.com/${API_VERSION}/${adAccountId}/campaigns`;
    const params: Record<string, string> = {
      fields: "id,name,status,effective_status,daily_budget,created_time",
      limit: "100",
    };

    const data = await metaFetch<{
      data: Array<{
        id: string;
        name: string;
        status: string;
        effective_status: string[];
        daily_budget?: string;
        created_time: string;
      }>;
      paging?: {
        cursors?: {
          after?: string;
        };
        next?: string;
      };
    }>(baseUrl, params, { ttl: 60000 }); // 1 minute cache

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Meta campaigns error:", error);
    return NextResponse.json(
      { error: formatMetaError(error) },
      { status: error?.status || 500 }
    );
  }
}

