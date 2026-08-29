import { NextResponse } from "next/server";
import { listCollectionListings } from "@/lib/aggregator/client";

export async function GET(
  _request: Request,
  context: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await context.params;
    const listings = await listCollectionListings(symbol);
    return NextResponse.json({ data: listings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load listings.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
