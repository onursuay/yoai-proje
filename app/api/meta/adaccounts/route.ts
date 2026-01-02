import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function GET() {
  try {
    const token = getEnv("META_ACCESS_TOKEN");
    const version = process.env.META_API_VERSION || "v24.0";

    const url = new URL(`https://graph.facebook.com/${version}/me/adaccounts`);
    url.searchParams.set("fields", "name,account_id,account_status,currency");
    url.searchParams.set("limit", "100");
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const json = await res.json();

    if (!res.ok || json?.error) {
      return NextResponse.json(
        { ok: false, source: "meta", status: res.status, error: json?.error ?? json },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: json.data ?? [], paging: json.paging ?? null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}

