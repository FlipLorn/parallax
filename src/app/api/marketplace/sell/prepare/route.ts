import { NextResponse } from "next/server";
import { prepareSellTransaction } from "@/lib/aggregator/client";
import { resolveTokenAccountForMint } from "@/lib/solana/token-account";
import type { SellPrepareInput } from "@/lib/aggregator/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SellPrepareInput;
    if (!body.seller || !body.tokenMint || !body.price) {
      return NextResponse.json(
        { error: { message: "seller, tokenMint, and price are required." } },
        { status: 400 },
      );
    }

    let tokenAccount = body.tokenAccount;
    if (!tokenAccount) {
      tokenAccount = (await resolveTokenAccountForMint(body.seller, body.tokenMint)) ?? undefined;
    }

    if (!tokenAccount) {
      return NextResponse.json(
        { error: { message: "Could not find an SPL token account for this NFT in the connected wallet." } },
        { status: 400 },
      );
    }

    const result = await prepareSellTransaction({
      ...body,
      tokenAccount,
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to prepare sell transaction.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
