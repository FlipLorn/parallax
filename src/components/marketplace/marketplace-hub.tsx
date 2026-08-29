"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Search, ShoppingCart, Tag, Layers3, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button";
import { useSolanaWallet } from "@/components/wallet/solana-wallet-provider";
import { TxFlowDialog } from "@/components/marketplace/tx-flow-dialog";
import type { MmmPoolCreateInput, NftListing, NftToken, PrepareTransactionData } from "@/lib/aggregator/types";
import type { NftCollectionSummary } from "@/lib/magiceden/types";

const FEATURED_COLLECTIONS = [
  { symbol: "y00ts", name: "y00ts" },
  { symbol: "okay_bears", name: "Okay Bears" },
  { symbol: "degods", name: "DeGods" },
];

type TabId = "buy" | "sell" | "mmm";

export function MarketplaceHub() {
  const { publicKey, connected, connect, walletProvider } = useSolanaWallet();
  const [tab, setTab] = useState<TabId>("buy");

  const [collectionSymbol, setCollectionSymbol] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<NftCollectionSummary | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NftCollectionSummary[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [listings, setListings] = useState<NftListing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [listingsError, setListingsError] = useState<string | null>(null);

  const [walletTokens, setWalletTokens] = useState<NftToken[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);

  const [sellMint, setSellMint] = useState("");
  const [sellPrice, setSellPrice] = useState("1");

  const [mmmForm, setMmmForm] = useState<Omit<MmmPoolCreateInput, "owner">>({
    collectionSymbol: "y00ts",
    poolType: "buy",
    spotPrice: 0.5,
    curveType: "linear",
    curveDelta: 0.05,
    reinvestBuy: false,
    reinvestSell: false,
    lpFeeBp: 100,
    buysideCreatorRoyaltyBp: 500,
    solDeposit: 0.5,
  });

  const [txOpen, setTxOpen] = useState(false);
  const [txTitle, setTxTitle] = useState("");
  const [txSubtitle, setTxSubtitle] = useState<string | undefined>();
  const [preparing, setPreparing] = useState(false);
  const [prepareResult, setPrepareResult] = useState<PrepareTransactionData | null>(null);
  const [prepareError, setPrepareError] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);

  const loadListings = useCallback(async (symbol: string) => {
    setListingsLoading(true);
    setListingsError(null);
    try {
      const response = await fetch(
        `/api/marketplace/collections/${encodeURIComponent(symbol)}/listings?limit=48`,
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message ?? "Failed to load listings");
      setListings(json.data ?? []);
    } catch (error) {
      setListings([]);
      setListingsError(error instanceof Error ? error.message : "Failed to load listings");
    } finally {
      setListingsLoading(false);
    }
  }, []);

  const selectCollection = useCallback((collection: NftCollectionSummary) => {
    setSelectedCollection(collection);
    setCollectionSymbol(collection.symbol);
    setSearchQuery(collection.name);
    setSearchResults([]);
    setSearchError(null);
  }, []);

  const clearSelectedCollection = useCallback(() => {
    setSelectedCollection(null);
    setCollectionSymbol(null);
    setListings([]);
    setListingsError(null);
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const loadWalletTokens = useCallback(async (wallet: string) => {
    setTokensLoading(true);
    try {
      const response = await fetch(`/api/marketplace/wallets/${encodeURIComponent(wallet)}/tokens`);
      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message ?? "Failed to load wallet NFTs");
      setWalletTokens(json.data ?? []);
    } catch {
      setWalletTokens([]);
    } finally {
      setTokensLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab !== "buy" || !collectionSymbol) return;
    void loadListings(collectionSymbol);
  }, [tab, collectionSymbol, loadListings]);

  useEffect(() => {
    if (tab !== "buy") return;

    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    if (selectedCollection && query.toLowerCase() === selectedCollection.name.toLowerCase()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      void (async () => {
        setSearchLoading(true);
        setSearchError(null);
        try {
          const response = await fetch(
            `/api/marketplace/collections/search?q=${encodeURIComponent(query)}`,
            { signal: controller.signal },
          );
          const json = await response.json();
          if (!response.ok) throw new Error(json.error?.message ?? "Collection search failed");
          setSearchResults(json.data ?? []);
        } catch (error) {
          if (controller.signal.aborted) return;
          setSearchResults([]);
          setSearchError(error instanceof Error ? error.message : "Collection search failed");
        } finally {
          if (!controller.signal.aborted) setSearchLoading(false);
        }
      })();
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [searchQuery, selectedCollection, tab]);

  useEffect(() => {
    if (tab === "sell" && publicKey) void loadWalletTokens(publicKey);
  }, [tab, publicKey, loadWalletTokens]);

  const openTxFlow = (title: string, subtitle: string | undefined, action: () => void | Promise<void>) => {
    setTxTitle(title);
    setTxSubtitle(subtitle);
    setPrepareResult(null);
    setPrepareError(null);
    setTxOpen(true);
    setRetryAction(() => () => {
      void action();
    });
    void action();
  };

  const runPrepare = async (url: string, body: Record<string, unknown>, title: string, subtitle?: string) => {
    const execute = async () => {
      setPreparing(true);
      setPrepareError(null);
      setPrepareResult(null);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error?.message ?? "Prepare failed");
        setPrepareResult(json.data as PrepareTransactionData);
      } catch (error) {
        setPrepareError(error instanceof Error ? error.message : "Prepare failed");
      } finally {
        setPreparing(false);
      }
    };

    openTxFlow(title, subtitle, execute);
  };

  const handleBuy = async (listing: NftListing) => {
    let buyer = publicKey;
    if (!buyer) {
      await connect();
      buyer = walletProvider?.publicKey?.toBase58() ?? publicKey;
    }
    if (!buyer) return;

    await runPrepare(
      "/api/marketplace/buy/prepare",
      { buyer, tokenMint: listing.tokenMint },
      listing.token?.name ?? "Buy NFT",
      `Buy now for ${listing.price} SOL on Magic Eden`,
    );
  };

  const handleSell = async () => {
    if (!connected || !publicKey) {
      await connect();
      return;
    }
    if (!sellMint || !sellPrice) return;

    await runPrepare(
      "/api/marketplace/sell/prepare",
      {
        seller: publicKey,
        tokenMint: sellMint,
        price: Number(sellPrice),
        expiry: 0,
      },
      "List NFT for sale",
      `Listing at ${sellPrice} SOL`,
    );
  };

  const handleCreatePool = async () => {
    if (!connected || !publicKey) {
      await connect();
      return;
    }

    await runPrepare(
      "/api/mmm/pools/create/prepare",
      {
        owner: publicKey,
        ...mmmForm,
      },
      "Create MMM pool",
      `${mmmForm.poolType} pool on ${mmmForm.collectionSymbol}`,
    );
  };

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="ink">NFT MARKETPLACE</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Magic Eden Trading Desk
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Buy listed NFTs, list your own, or create an MMM liquidity pool — all through the Aggregator API with Phantom wallet signing.
            </p>
          </div>
          <WalletConnectButton />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton active={tab === "buy"} onClick={() => setTab("buy")} icon={ShoppingCart} label="Buy Now" />
          <TabButton active={tab === "sell"} onClick={() => setTab("sell")} icon={Tag} label="Sell NFT" />
          <TabButton active={tab === "mmm"} onClick={() => setTab("mmm")} icon={Layers3} label="Create MMM Pool" />
        </div>
      </section>

      {tab === "buy" ? (
        <section className="grid gap-4">
          <div className="rounded-lg border border-border bg-card/90 p-4">
            <label className="block font-mono text-[10px] uppercase text-muted-foreground">
              Search collection
            </label>
            <div className="relative mt-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    if (selectedCollection && event.target.value !== selectedCollection.name) {
                      setSelectedCollection(null);
                      setCollectionSymbol(null);
                      setListings([]);
                    }
                  }}
                  placeholder="Search by collection name (e.g. DeGods, Okay Bears)..."
                  className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={clearSelectedCollection}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </div>

              {searchLoading ? (
                <div className="absolute z-20 mt-2 flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-lg">
                  <Loader2 className="size-4 animate-spin" />
                  Searching Magic Eden collections…
                </div>
              ) : null}

              {!searchLoading && searchResults.length > 0 ? (
                <div className="absolute z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
                  {searchResults.map((collection) => (
                    <button
                      key={collection.symbol}
                      type="button"
                      onClick={() => selectCollection(collection)}
                      className="flex w-full items-center gap-3 border-b border-border/60 px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary/60"
                    >
                      {collection.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={collection.image} alt="" className="size-10 rounded object-cover" />
                      ) : (
                        <div className="size-10 rounded bg-background" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{collection.name}</p>
                        <p className="truncate font-mono text-[10px] text-muted-foreground">{collection.symbol}</p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-muted-foreground">
                        {collection.listedCount != null ? <p>{collection.listedCount} listed</p> : null}
                        {collection.floorPrice != null ? (
                          <p className="text-primary">{collection.floorPrice.toFixed(3)} SOL floor</p>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}

              {!searchLoading && searchError ? (
                <p className="mt-2 text-sm text-destructive">{searchError}</p>
              ) : null}

              {!searchLoading &&
              searchQuery.trim().length >= 2 &&
              searchResults.length === 0 &&
              !searchError &&
              !selectedCollection ? (
                <p className="mt-2 text-sm text-muted-foreground">No collections matched that search.</p>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-muted-foreground">Quick picks</span>
              {FEATURED_COLLECTIONS.map((collection) => (
                <button
                  key={collection.symbol}
                  type="button"
                  onClick={() =>
                    selectCollection({
                      symbol: collection.symbol,
                      name: collection.name,
                    })
                  }
                  className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                    collectionSymbol === collection.symbol
                      ? "border border-primary/40 bg-primary/15 text-primary"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>

          {selectedCollection ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/90 p-4">
              <div className="flex min-w-0 items-center gap-3">
                {selectedCollection.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedCollection.image} alt="" className="size-12 rounded object-cover" />
                ) : (
                  <div className="size-12 rounded bg-background" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold">{selectedCollection.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{selectedCollection.symbol}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                {selectedCollection.listedCount != null ? (
                  <span>{selectedCollection.listedCount} listed</span>
                ) : null}
                {selectedCollection.floorPrice != null ? (
                  <span className="text-primary">{selectedCollection.floorPrice.toFixed(3)} SOL floor</span>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/40 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Search for a collection by name, pick one from the results, then browse NFTs for sale.
              </p>
            </div>
          )}

          {listingsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading floor listings…
            </div>
          ) : null}
          {listingsError ? <p className="text-sm text-destructive">{listingsError}</p> : null}

          {!listingsLoading && selectedCollection && listings.length === 0 && !listingsError ? (
            <p className="text-sm text-muted-foreground">No active listings found for this collection.</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <article
                key={listing.tokenMint}
                className="overflow-hidden rounded-lg border border-border/80 bg-card/90 shadow-sm"
              >
                {listing.token?.image ? (
                  <div className="relative aspect-square bg-background/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={listing.token.image} alt={listing.token.name ?? "NFT"} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="font-semibold">{listing.token?.name ?? "Unnamed NFT"}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{listing.token?.collectionName}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-lg font-semibold text-primary">{listing.price} SOL</span>
                    <Button size="sm" onClick={() => void handleBuy(listing)}>
                      Buy Now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "sell" ? (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-lg border border-border bg-card/90 p-5">
            <h2 className="text-lg font-semibold">Your NFTs</h2>
            <p className="mt-1 text-sm text-muted-foreground">Connect Phantom to load NFTs from your wallet via Aggregator.</p>

            {!connected ? (
              <Button className="mt-4" onClick={() => void connect()}>
                Connect wallet to list
              </Button>
            ) : tokensLoading ? (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Loading wallet NFTs…
              </div>
            ) : (
              <div className="mt-4 grid max-h-[420px] gap-2 overflow-y-auto">
                {walletTokens.map((token) => (
                  <button
                    key={token.mintAddress}
                    type="button"
                    onClick={() => setSellMint(token.mintAddress)}
                    className={`flex items-center gap-3 rounded border p-3 text-left transition-colors ${
                      sellMint === token.mintAddress
                        ? "border-primary/50 bg-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {token.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={token.image} alt="" className="size-12 rounded object-cover" />
                    ) : (
                      <div className="size-12 rounded bg-background" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium">{token.name}</p>
                      <p className="truncate font-mono text-[10px] text-muted-foreground">{token.mintAddress}</p>
                      {token.listStatus === "listed" ? (
                        <Badge variant="lime" className="mt-1">
                          Already listed · {token.price} SOL
                        </Badge>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card/90 p-5">
            <h2 className="text-lg font-semibold">Listing details</h2>
            <label className="mt-4 block text-xs font-mono uppercase text-muted-foreground">Price (SOL)</label>
            <input
              type="number"
              min="0"
              step="0.001"
              value={sellPrice}
              onChange={(event) => setSellPrice(event.target.value)}
              className="mt-1 w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />
            <Button className="mt-6 w-full" disabled={!sellMint || !connected} onClick={() => void handleSell()}>
              Prepare listing transaction
            </Button>
          </div>
        </section>
      ) : null}

      {tab === "mmm" ? (
        <section className="rounded-lg border border-border bg-card/90 p-6">
          <h2 className="text-lg font-semibold">Create MMM liquidity pool</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure a Magic Eden MMM pool. You will sign the create transaction in Phantom.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Collection symbol">
              <input
                value={mmmForm.collectionSymbol}
                onChange={(event) => setMmmForm((prev) => ({ ...prev, collectionSymbol: event.target.value }))}
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
                placeholder="y00ts"
              />
            </Field>
            <Field label="Pool type">
              <select
                value={mmmForm.poolType}
                onChange={(event) =>
                  setMmmForm((prev) => ({
                    ...prev,
                    poolType: event.target.value as MmmPoolCreateInput["poolType"],
                  }))
                }
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              >
                <option value="buy">Buy-side (bid pool)</option>
                <option value="sell">Sell-side (ask pool)</option>
                <option value="two_sided">Two-sided</option>
              </select>
            </Field>
            <Field label="Spot price (SOL)">
              <input
                type="number"
                min="0"
                step="0.01"
                value={mmmForm.spotPrice}
                onChange={(event) => setMmmForm((prev) => ({ ...prev, spotPrice: Number(event.target.value) }))}
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="SOL deposit (optional)">
              <input
                type="number"
                min="0"
                step="0.01"
                value={mmmForm.solDeposit ?? 0}
                onChange={(event) => setMmmForm((prev) => ({ ...prev, solDeposit: Number(event.target.value) }))}
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Curve type">
              <select
                value={mmmForm.curveType}
                onChange={(event) =>
                  setMmmForm((prev) => ({
                    ...prev,
                    curveType: event.target.value as MmmPoolCreateInput["curveType"],
                  }))
                }
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              >
                <option value="linear">Linear</option>
                <option value="exp">Exponential</option>
              </select>
            </Field>
            <Field label="Curve delta (SOL)">
              <input
                type="number"
                min="0"
                step="0.01"
                value={mmmForm.curveDelta}
                onChange={(event) => setMmmForm((prev) => ({ ...prev, curveDelta: Number(event.target.value) }))}
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              />
            </Field>
          </div>

          <Button className="mt-6" disabled={!connected} onClick={() => void handleCreatePool()}>
            Prepare pool creation
          </Button>
        </section>
      ) : null}

      <TxFlowDialog
        open={txOpen}
        onClose={() => setTxOpen(false)}
        title={txTitle}
        subtitle={txSubtitle}
        preparing={preparing}
        prepareResult={prepareResult}
        prepareError={prepareError}
        onRetryPrepare={retryAction ?? undefined}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof ShoppingCart;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded px-4 py-2 font-mono text-xs transition-colors ${
        active
          ? "border border-primary/40 bg-primary/15 text-primary"
          : "border border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
