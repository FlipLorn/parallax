"use client";

import { motion, useReducedMotion } from "motion/react";
import { markets } from "@/lib/domain/demo-data";

const items = [
  "wallet exposure indexed",
  "agent quorum 4/4",
  "orderbook depth sampled",
  "risk cap enforced",
  ...markets.map((market) => `${market.id} edge ${(market.parallaxProbability - market.marketProbability).toFixed(1)}pt`),
];

export function SignalTicker() {
  const reduced = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-background/72 py-3">
      <motion.div
        className="flex w-max gap-3"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={reduced ? undefined : { duration: 28, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded border border-border bg-card/88 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
