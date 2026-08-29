import { NextResponse } from "next/server";
import { searchMagicEdenCollections } from "@/lib/magiceden/collections";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  try {
    const collections = await searchMagicEdenCollections(query);
    return NextResponse.json({ data: collections });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to search collections.";
    return NextResponse.json({ error: { message } }, { status: 502 });
  }
}
