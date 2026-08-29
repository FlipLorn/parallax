import { listCollectionListings } from "@/lib/aggregator/client";
import type {
  MagicEdenCollectionIndexItem,
  MagicEdenCollectionStats,
  NftCollectionSummary,
} from "@/lib/magiceden/types";

const ME_BASE = "https://api-mainnet.magiceden.dev/v2";
const LAMPORTS_PER_SOL = 1_000_000_000;
const CACHE_TTL_MS = 15 * 60 * 1000;
const INDEX_PAGE_SIZE = 500;
const INDEX_PAGE_OFFSETS = [0, 500, 1000, 1500];

let indexCache: { collections: MagicEdenCollectionIndexItem[]; fetchedAt: number } | null = null;

function slugCandidates(query: string): string[] {
  const trimmed = query.trim().toLowerCase();
  const variants = new Set<string>([
    trimmed,
    trimmed.replace(/\s+/g, "_"),
    trimmed.replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    trimmed.replace(/[^a-z0-9]/g, ""),
  ]);

  return [...variants].filter(Boolean);
}

function relevanceScore(query: string, collection: { symbol: string; name: string }): number {
  const q = query.trim().toLowerCase();
  const symbol = collection.symbol.toLowerCase();
  const name = collection.name.toLowerCase();

  if (symbol === q || name === q) return 100;
  if (symbol.startsWith(q) || name.startsWith(q)) return 80;
  if (symbol.includes(q) || name.includes(q)) return 60;
  return 0;
}

async function fetchCollectionStats(symbol: string): Promise<MagicEdenCollectionStats | null> {
  try {
    const response = await fetch(`${ME_BASE}/collections/${encodeURIComponent(symbol)}/stats`, {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const data = (await response.json()) as MagicEdenCollectionStats;
    if (!data.symbol || typeof data.listedCount !== "number") return null;
    return data;
  } catch {
    return null;
  }
}

async function getCollectionsIndex(): Promise<MagicEdenCollectionIndexItem[]> {
  if (indexCache && Date.now() - indexCache.fetchedAt < CACHE_TTL_MS) {
    return indexCache.collections;
  }

  const pages = await Promise.all(
    INDEX_PAGE_OFFSETS.map(async (offset) => {
      try {
        const response = await fetch(
          `${ME_BASE}/collections?offset=${offset}&limit=${INDEX_PAGE_SIZE}`,
          { cache: "no-store" },
        );
        if (!response.ok) return [] as MagicEdenCollectionIndexItem[];
        return (await response.json()) as MagicEdenCollectionIndexItem[];
      } catch {
        return [] as MagicEdenCollectionIndexItem[];
      }
    }),
  );

  const seen = new Set<string>();
  const collections = pages.flat().filter((collection) => {
    if (!collection.symbol || seen.has(collection.symbol)) return false;
    seen.add(collection.symbol);
    return true;
  });

  indexCache = { collections, fetchedAt: Date.now() };
  return collections;
}

async function enrichCollection(
  symbol: string,
  stats: MagicEdenCollectionStats,
  indexItem?: MagicEdenCollectionIndexItem,
): Promise<NftCollectionSummary> {
  let name = indexItem?.name ?? symbol;
  let image = indexItem?.image;

  if (!indexItem?.name || !indexItem?.image) {
    try {
      const listings = await listCollectionListings(symbol, 1);
      const token = listings[0]?.token;
      if (token?.collectionName) name = token.collectionName;
      if (token?.image) image = token.image;
    } catch {
      // Keep index/symbol fallbacks.
    }
  }

  const floorFromIndex = indexItem?.floorPrice;
  const floorFromStats = stats.floorPrice > 0 ? stats.floorPrice / LAMPORTS_PER_SOL : undefined;

  return {
    symbol,
    name,
    image,
    floorPrice: floorFromIndex ?? floorFromStats,
    listedCount: stats.listedCount,
  };
}

export async function searchMagicEdenCollections(query: string, limit = 20): Promise<NftCollectionSummary[]> {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];

  const index = await getCollectionsIndex();
  const indexBySymbol = new Map(index.map((collection) => [collection.symbol, collection]));

  const indexMatches = index
    .filter(
      (collection) =>
        collection.name.toLowerCase().includes(normalized) ||
        collection.symbol.toLowerCase().includes(normalized),
    )
    .sort((a, b) => relevanceScore(normalized, b) - relevanceScore(normalized, a))
    .slice(0, limit);

  const candidateSymbols = slugCandidates(query);
  const statsMatches = (
    await Promise.all(candidateSymbols.map((symbol) => fetchCollectionStats(symbol)))
  ).filter((stats): stats is MagicEdenCollectionStats => stats !== null);

  const merged = new Map<string, { stats: MagicEdenCollectionStats; indexItem?: MagicEdenCollectionIndexItem }>();

  for (const stats of statsMatches) {
    merged.set(stats.symbol, { stats, indexItem: indexBySymbol.get(stats.symbol) });
  }

  for (const indexItem of indexMatches) {
    if (merged.has(indexItem.symbol)) continue;
    const stats = await fetchCollectionStats(indexItem.symbol);
    if (stats) merged.set(indexItem.symbol, { stats, indexItem });
  }

  const ranked = [...merged.entries()]
    .map(([symbol, value]) => ({
      symbol,
      score: relevanceScore(normalized, {
        symbol,
        name: value.indexItem?.name ?? symbol,
      }),
      ...value,
    }))
    .filter(({ stats }) => stats.listedCount > 0 || stats.floorPrice > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return Promise.all(
    ranked.map(({ symbol, stats, indexItem }) => enrichCollection(symbol, stats, indexItem)),
  );
}
