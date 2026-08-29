import type {
  AggregatorEnvelope,
  AggregatorErrorEnvelope,
  BuyPrepareInput,
  MmmPoolCreateInput,
  NftListing,
  NftToken,
  PrepareTransactionData,
  SellPrepareInput,
} from "./types";

const DEFAULT_BASE_URL = "https://aggregator-public.vercel.app";

function getBaseUrl() {
  return process.env.AGGREGATOR_API_URL ?? DEFAULT_BASE_URL;
}

function getApiKey() {
  const key = process.env.API_KEY ?? process.env.AGGREGATOR_API_KEY;
  if (!key) {
    throw new Error("API_KEY is not configured on the server.");
  }
  return key;
}

async function aggregatorFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<AggregatorEnvelope<T>> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const body = (await response.json()) as AggregatorEnvelope<T> | AggregatorErrorEnvelope;

  if (!response.ok || "error" in body) {
    const message =
      "error" in body
        ? body.error.message
        : `Aggregator request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body;
}

export async function listCollectionListings(symbol: string, limit = 20) {
  const result = await aggregatorFetch<{ symbol: string; listings: NftListing[] }>(
    `/api/v1/collections/${encodeURIComponent(symbol)}/listings?limit=${limit}`,
  );
  return result.data.listings;
}

export async function getWalletTokens(wallet: string, limit = 50) {
  const result = await aggregatorFetch<NftToken[]>(
    `/api/v1/wallets/${encodeURIComponent(wallet)}/tokens?limit=${limit}`,
  );
  return result.data;
}

export async function prepareBuyTransaction(input: BuyPrepareInput) {
  const result = await aggregatorFetch<PrepareTransactionData>(
    "/api/v1/marketplace/buy/prepare",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return result;
}

export async function prepareSellTransaction(input: SellPrepareInput) {
  const result = await aggregatorFetch<PrepareTransactionData>(
    "/api/v1/marketplace/sell/prepare",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return result;
}

export async function prepareMmmPoolCreate(input: MmmPoolCreateInput) {
  const body = {
    ...input,
    paymentMint: input.paymentMint ?? "So11111111111111111111111111111111111111112",
    expiry: input.expiry ?? 0,
  };

  const result = await aggregatorFetch<PrepareTransactionData>(
    "/api/v1/mmm/pools/create/prepare",
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
  return result;
}

export function extractTransactionBase64(data: PrepareTransactionData): string | null {
  if (data.transactionBase64) return data.transactionBase64;
  if (typeof data.transaction === "string") return data.transaction;
  if (data.transaction && typeof data.transaction === "object") {
    return data.transaction.serializedTransaction ?? data.transaction.tx ?? null;
  }
  return null;
}
