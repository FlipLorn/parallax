export interface MagicEdenCollectionIndexItem {
  symbol: string;
  name: string;
  description?: string;
  image?: string;
  floorPrice?: number;
  listedCount?: number;
}

export interface MagicEdenCollectionStats {
  symbol: string;
  floorPrice: number;
  listedCount: number;
  avgPrice24hr?: number;
  volume7d?: number;
}

export interface NftCollectionSummary {
  symbol: string;
  name: string;
  image?: string;
  floorPrice?: number;
  listedCount?: number;
}
