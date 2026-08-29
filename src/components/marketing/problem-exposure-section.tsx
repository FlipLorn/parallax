"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Layers, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProblemExposureSection() {
  const [viewMode, setViewMode] = useState<"portfolio" | "parallax">("parallax");

  return (
    <section id="problem" className="border-y border-border/80 bg-card/60 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="text-center">
          <Badge variant="ink" className="font-mono text-xs uppercase tracking-widest">
            Hidden Risk Transformation
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Your tokens are not your true risk.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-6 text-muted-foreground">
            A standard wallet tracker shows asset values. Parallax translates those holdings into live directional bets on real-world and market-priced events.
          </p>
        </div>

        {/* View mode toggle button */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => setViewMode("portfolio")}
            className={`rounded px-4 py-2 font-mono text-xs font-semibold transition-all ${
              viewMode === "portfolio"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            1. Standard Portfolio View
          </button>
          <button
            onClick={() => setViewMode("parallax")}
            className={`rounded px-4 py-2 font-mono text-xs font-semibold transition-all ${
              viewMode === "parallax"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            2. Parallax Event Exposure View
          </button>
        </div>

        {/* Dynamic Display */}
        <div className="mt-8 mx-auto max-w-4xl rounded-lg border border-border bg-background/90 p-6 shadow-xl">
          {viewMode === "portfolio" ? (
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                  Traditional Token Balances ($48,600)
                </span>
                <span className="font-mono text-xs text-muted-foreground">Read-Only Wallet Model</span>
              </div>
              <div className="mt-6 space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>SOL (Solana) — 286.4 SOL</span>
                    <span>$38,750 (79.7%)</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded bg-secondary">
                    <div className="h-full bg-primary" style={{ width: "79.7%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>JUP (Jupiter) — 4,920 JUP</span>
                    <span>$5,658 (11.6%)</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded bg-secondary">
                    <div className="h-full bg-cyan-400" style={{ width: "11.6%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>USDC Cash Buffer</span>
                    <span>$4,192 (8.7%)</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded bg-secondary">
                    <div className="h-full bg-muted-foreground" style={{ width: "8.7%" }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs font-semibold uppercase text-primary">
                  Parallax Mapped Event Exposure Matrix
                </span>
                <Badge variant="red">PX Risk 72 HIGH</Badge>
              </div>
              <div className="mt-6 space-y-4 font-mono text-xs">
                <div className="rounded border border-red-900/60 bg-red-950/20 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">SOL &gt; $220 Friday Market</span>
                    <Badge variant="red">HIGH SENSITIVITY</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    $38,680 linked exposure (0.74 correlation). Your SOL concentration makes this your largest invisible bet.
                  </p>
                </div>
                <div className="rounded border border-amber-900/60 bg-amber-950/20 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Fed Target Rate Decision</span>
                    <Badge variant="lime">MEDIUM SENSITIVITY</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    $44,408 portfolio beta to macro rates. Rate cut expectations directly drive SOL liquidity appetite.
                  </p>
                </div>
                <div className="rounded border border-border bg-card/60 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Jupiter Swap Volume &gt; $2B</span>
                    <Badge variant="default">MEDIUM SENSITIVITY</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    $5,658 JUP allocation benefits from route expansion, but liquidity depth is thin.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
