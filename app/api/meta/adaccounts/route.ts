import { NextRequest, NextResponse } from "next/server";
import { metaFetch, formatMetaError } from "@/lib/metaFetch";

const API_VERSION = process.env.META_API_VERSION || "v24.0";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = `https://graph.facebook.com/${API_VERSION}/me/adaccounts`;
    const params: Record<string, string> = {
      fields: "name,account_id,account_status,currency",
      limit: "100",
    };

    const data = await metaFetch<{
      data: Array<{
        name: string;
        account_id: string;
        account_status: number;
        currency: string;
      }>;
      paging?: {
        cursors?: {
          after?: string;
        };
        next?: string;
      };
    }>(baseUrl, params, { ttl: 300000 }); // 5 minutes cache

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Meta adaccounts error:", error);
    return NextResponse.json(
      { error: formatMetaError(error) },
      { status: error?.status || 500 }
    );
  }
}

