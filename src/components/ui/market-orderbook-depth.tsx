"use client";

import React from "react";
import { BarChart3, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OrderbookDepthEntry } from "@/lib/domain/types";

export function MarketOrderbookDepth({
  bestBidCents = 55,
  bestAskCents = 57,
  orderbook = [
    { priceCents: 52, volumeUsd: 12500, side: "YES" },
    { priceCents: 54, volumeUsd: 28400, side: "YES" },
    { priceCents: 56, volumeUsd: 41200, side: "YES" },
    { priceCents: 58, volumeUsd: 38900, side: "NO" },
    { priceCents: 60, volumeUsd: 19500, side: "NO" },
  ],
}: {
  bestBidCents?: number;
  bestAskCents?: number;
  orderbook?: OrderbookDepthEntry[];
}) {
  const spreadCents = bestAskCents - bestBidCents;

  return (
    <div className="rounded-lg border border-border bg-card/90 p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
            Orderbook Depth & Liquidity Quote
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground">Spread:</span>
          <span className="font-semibold text-foreground">{spreadCents}c</span>
        </div>
      </div>

      {/* Best bid ask header */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded border border-emerald-900/60 bg-emerald-950/20 p-2">
          <p className="font-mono text-[10px] uppercase text-emerald-400">Best Bid (YES)</p>
          <p className="mt-1 font-mono text-lg font-semibold text-emerald-400">{bestBidCents}c</p>
        </div>
        <div className="rounded border border-red-900/60 bg-red-950/20 p-2">
          <p className="font-mono text-[10px] uppercase text-red-400">Best Ask (NO)</p>
          <p className="mt-1 font-mono text-lg font-semibold text-red-400">{bestAskCents}c</p>
        </div>
      </div>

      {/* Depth Rows */}
      <div className="mt-4 space-y-1.5 font-mono text-xs">
        {orderbook.map((entry, idx) => (
          <div key={idx} className="grid grid-cols-[60px_1fr_80px] items-center gap-2">
            <span className={entry.side === "YES" ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
              {entry.priceCents}c
            </span>
            <div className="h-2.5 overflow-hidden rounded bg-secondary">
              <div
                className={`h-full ${entry.side === "YES" ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ width: `${Math.min(100, (entry.volumeUsd / 50000) * 100)}%` }}
              />
            </div>
            <span className="text-right text-muted-foreground">${(entry.volumeUsd / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}
