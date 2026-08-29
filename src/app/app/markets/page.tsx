"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Filter, TrendingUp, Sparkles } from "lucide-react";
import { MetricCard } from "@/components/app/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { markets } from "@/lib/domain/demo-data";
import type { Market } from "@/lib/domain/types";

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedClassification, setSelectedClassification] = useState<string>("ALL");

  const filteredMarkets = markets.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || m.category === selectedCategory.toLowerCase();
    const matchesClassification = selectedClassification === "ALL" || m.classification === selectedClassification;
    return matchesSearch && matchesCategory && matchesClassification;
  });

  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="ink">PREDICTION TERMINAL</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Prediction Market Discovery & Edge Explorer
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Discover active event markets, compare market probabilities against Parallax AI forecast models, and build bounded positions.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets by asset or event (e.g. SOL, Fed, Jupiter)..."
              className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground">Category:</span>
            {["ALL", "CRYPTO", "MACRO", "TECH"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded px-2.5 py-1 transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Cards Grid */}
      <section className="grid gap-4 sm:grid-cols-2">
        {filteredMarkets.map((m) => {
          const edge = m.parallaxProbability - m.marketProbability;
          return (
            <div
              key={m.id}
              className="flex flex-col justify-between rounded-lg border border-border/80 bg-card/90 p-5 transition-all hover:border-primary shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant={m.classification === "PROTECTION" ? "red" : m.classification === "OPPORTUNITY" ? "lime" : "default"}>
                    {m.classification}
                  </Badge>
                  <span className="font-mono text-[10px] text-muted-foreground">Closes {m.closeDate}</span>
                </div>

                <h2 className="mt-3 text-lg font-semibold text-foreground leading-snug">{m.title}</h2>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  24h Vol: ${(m.volumeUsd / 1000).toFixed(0)}k • Liquidity Score: {(m.liquidityScore * 100).toFixed(0)}%
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded border border-border bg-background/80 p-3 font-mono text-center">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Market</span>
                    <p className="mt-1 text-sm font-semibold">{m.marketProbability}%</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-primary">Parallax</span>
                    <p className="mt-1 text-sm font-semibold text-primary">{m.parallaxProbability}%</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">Edge</span>
                    <p className={`mt-1 text-sm font-semibold ${edge > 0 ? "text-emerald-400" : "text-destructive"}`}>
                      {edge > 0 ? `+${edge.toFixed(1)}pt` : `${edge.toFixed(1)}pt`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  Exposure: <strong className="text-foreground">{m.exposure}</strong>
                </span>
                <Button asChild size="sm" className="font-mono text-xs">
                  <Link href={`/app/markets/${m.id}`}>
                    Inspect Market <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
