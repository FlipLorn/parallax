import { NextResponse } from "next/server";
import { getWalletTokens } from "@/lib/aggregator/client";

export async function GET(
  _request: Request,
  context: { params: Promise<{ wallet: string }> },
) {
  try {
    const { wallet } = await context.params;
    const tokens = await getWalletTokens(wallet);
    return NextResponse.json({ data: tokens });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load wallet tokens.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
