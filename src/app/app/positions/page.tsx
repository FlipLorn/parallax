"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, TrendingUp, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { positions, markets } from "@/lib/domain/demo-data";

export default function PositionsPage() {
  const [closedPositionIds, setClosedPositionIds] = useState<string[]>([]);

  const handleClosePosition = (id: string) => {
    setClosedPositionIds((prev) => [...prev, id]);
  };

  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="ink">HEDGING DESK</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Active Protection & Opportunity Positions
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Monitor active prediction hedges, current PnL, Hedge Efficiency Ratio (HER), and claim settlements.
            </p>
          </div>
        </div>
      </section>

      {/* Positions Table */}
      <section className="rounded-lg border border-border bg-card/90 p-5 shadow-sm">
        <div className="space-y-4">
          {positions.map((pos) => {
            const market = markets.find((m) => m.id === pos.marketId) || markets[0];
            const isClosed = closedPositionIds.includes(pos.id);

            return (
              <div
                key={pos.id}
                className={`rounded-md border p-4 transition-all font-mono text-xs ${
                  isClosed
                    ? "border-border/40 bg-background/40 opacity-50"
                    : "border-border/80 bg-background/80 hover:border-primary"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={pos.side === "NO" ? "red" : "lime"}>
                      BUY {pos.side} ({pos.shares} SHARES)
                    </Badge>
                    <span className="font-semibold text-foreground text-sm">{market.title}</span>
                  </div>
                  <Badge variant={isClosed ? "default" : "lime"}>
                    {isClosed ? "CLOSED" : "ACTIVE PROTECTION"}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Cost Basis</span>
                    <p className="mt-1 font-semibold text-foreground">${pos.costUsd.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Max Settlement Payout</span>
                    <p className="mt-1 font-semibold text-emerald-400">${pos.maxPayoutUsd.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Unrealized PnL</span>
                    <p className={`mt-1 font-semibold ${pos.pnlUsd >= 0 ? "text-emerald-400" : "text-destructive"}`}>
                      {pos.pnlUsd >= 0 ? `+$${pos.pnlUsd.toFixed(2)}` : `-$${Math.abs(pos.pnlUsd).toFixed(2)}`}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Hedge Efficiency</span>
                    <p className="mt-1 font-semibold text-primary">+{pos.hedgeEfficiencyRatio}% Risk Mitigation</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-[10px] text-muted-foreground">
                    Entry Probability: {pos.entryProbability}% → Current: {pos.currentProbability}%
                  </span>
                  {!isClosed ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleClosePosition(pos.id)}
                      className="font-mono text-xs hover:bg-destructive/20 hover:text-destructive"
                    >
                      Close / Unhedge Position
                    </Button>
                  ) : (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" /> Position Settled
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
