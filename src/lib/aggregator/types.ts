export interface AggregatorMeta {
  requestId: string;
}

export interface AggregatorError {
  code: string;
  message: string;
  requestId?: string;
}

export interface AggregatorEnvelope<T> {
  data: T;
  meta: AggregatorMeta;
}

export interface AggregatorErrorEnvelope {
  error: AggregatorError;
}

export interface NftListing {
  tokenMint: string;
  tokenAddress?: string;
  price: number;
  seller: string;
  listingSource?: string;
  token?: {
    mintAddress: string;
    name: string;
    collection?: string;
    collectionName?: string;
    image?: string;
    listStatus?: string;
  };
}

export interface NftToken {
  mintAddress: string;
  owner: string;
  name: string;
  collection?: string;
  collectionName?: string;
  image?: string;
  price?: number;
  listStatus?: string;
}

export interface PrepareListingSummary {
  tokenMint: string;
  tokenAccount?: string;
  priceSol: number;
  seller?: string;
  auctionHouse?: string;
  expiry?: number;
  listingSource?: string;
}

export interface PrepareDiagnostics {
  simulation?: {
    err?: string | null;
    logs?: string[];
  };
  signatureState?: string;
}

export interface PrepareTransactionData {
  operation: string;
  walletReady: boolean;
  transactionBase64?: string;
  transaction?: string | { serializedTransaction?: string; tx?: string };
  listing?: PrepareListingSummary;
  pool?: Record<string, unknown>;
  diagnostics?: PrepareDiagnostics;
}

export interface MmmPoolCreateInput {
  owner: string;
  collectionSymbol: string;
  poolType: "buy" | "sell" | "two_sided";
  spotPrice: number;
  curveType: "linear" | "exp";
  curveDelta: number;
  reinvestBuy: boolean;
  reinvestSell: boolean;
  expiry?: number;
  lpFeeBp: number;
  buysideCreatorRoyaltyBp: number;
  paymentMint?: string;
  solDeposit?: number;
}

export interface SellPrepareInput {
  seller: string;
  tokenMint: string;
  tokenAccount?: string;
  price: number;
  expiry?: number;
}

export interface BuyPrepareInput {
  buyer: string;
  tokenMint: string;
}
