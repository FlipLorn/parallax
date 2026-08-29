"use client";

import React from "react";
import { Cpu, ShieldCheck, Zap, Layers, Activity } from "lucide-react";

const PROTOCOLS = [
  { name: "Solana Mainnet Beta", detail: "2,840 TPS" },
  { name: "Jupiter Prediction API", detail: "Orderbook Liquidity" },
  { name: "Helius DAS Indexer", detail: "Token Portfolio Beta" },
  { name: "Pyth Network Oracles", detail: "Real-time Price Feeds" },
  { name: "Drift Protocol", detail: "Derivatives Liquidity" },
  { name: "Phantom Wallet", detail: "Non-Custodial Signer" },
];

export function MarqueeSection() {
  return (
    <section className="py-12 border-b border-white/10 bg-neutral-950/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center mb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
          POWERED BY SOLANA & DEFI INFRASTRUCTURE
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee items-center gap-12 text-neutral-400 font-mono text-xs uppercase tracking-wider">
          {PROTOCOLS.concat(PROTOCOLS).map((p, idx) => (
            <div key={idx} className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-neutral-900/50 px-4 py-2 hover:border-blue-500/30 hover:text-white transition-all">
              <Zap className="size-3.5 text-blue-400" />
              <span className="font-bold text-white">{p.name}</span>
              <span className="text-neutral-500">• {p.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
