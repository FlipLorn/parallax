import { NextResponse } from "next/server";
import { prepareBuyTransaction } from "@/lib/aggregator/client";
import type { BuyPrepareInput } from "@/lib/aggregator/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BuyPrepareInput;
    if (!body.buyer || !body.tokenMint) {
      return NextResponse.json(
        { error: { message: "buyer and tokenMint are required." } },
        { status: 400 },
      );
    }

    const result = await prepareBuyTransaction(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to prepare buy transaction.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
