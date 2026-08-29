import { NextResponse } from "next/server";
import { listCollectionListings } from "@/lib/aggregator/client";

export async function GET(
  request: Request,
  context: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await context.params;
    const limitParam = new URL(request.url).searchParams.get("limit");
    const limit = limitParam ? Math.min(Math.max(Number(limitParam) || 20, 1), 100) : 48;
    const listings = await listCollectionListings(symbol, limit);
    return NextResponse.json({ data: listings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load listings.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
