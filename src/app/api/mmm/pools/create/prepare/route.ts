import { NextResponse } from "next/server";
import { prepareMmmPoolCreate } from "@/lib/aggregator/client";
import type { MmmPoolCreateInput } from "@/lib/aggregator/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MmmPoolCreateInput;
    if (!body.owner || !body.collectionSymbol || !body.spotPrice) {
      return NextResponse.json(
        { error: { message: "owner, collectionSymbol, and spotPrice are required." } },
        { status: 400 },
      );
    }

    const result = await prepareMmmPoolCreate(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to prepare MMM pool transaction.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
