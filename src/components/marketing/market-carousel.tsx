"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { markets } from "@/lib/domain/demo-data";

export function MarketCarousel() {
  const [index, setIndex] = useState(0);
  const market = markets[index];

  const next = () => setIndex((current) => (current + 1) % markets.length);
  const prev = () => setIndex((current) => (current - 1 + markets.length) % markets.length);

  return (
    <section id="agents" className="bg-background/82 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.78fr_1fr]">
        <div>
          <Badge variant="ink">Market scanner</Badge>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">A tape that argues with the price.</h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            Each card compares market price against Parallax probability, then tags whether it protects the portfolio, creates an edge, or only deserves watch status.
          </p>
          <div className="mt-8 flex gap-2">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous market">
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next market">
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="relative min-h-[390px] overflow-hidden rounded-md border border-border bg-card/80 p-4 shadow-[0_0_42px_rgba(36,88,255,0.12)]">
          <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_1px_1px,var(--primary)_1px,transparent_0)] [background-size:18px_18px]" />
          <AnimatePresence mode="wait">
            <motion.article
              key={market.id}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.32 }}
              className="relative h-full rounded-md border border-border bg-background/72 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant={market.classification === "PROTECTION" ? "red" : market.classification === "OPPORTUNITY" ? "lime" : "default"}>
                  {market.classification}
                </Badge>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  closes {market.closeDate}
                </span>
              </div>
              <h3 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight">{market.title}</h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Metric label="Market" value={`${market.marketProbability}%`} />
                <Metric label="Parallax" value={`${market.parallaxProbability}%`} hot />
                <Metric label="Liquidity" value={`${Math.round(market.liquidityScore * 100)}%`} />
              </div>
              <div className="mt-8 flex items-center gap-4 rounded-md border border-border bg-secondary/80 p-4">
                <TrendingUp className="size-5" />
                <p className="text-sm leading-6">
                  Edge is {(market.parallaxProbability - market.marketProbability).toFixed(1)} points with {market.exposure.toLowerCase()} portfolio sensitivity.
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, hot }: { label: string; value: string; hot?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-card/74 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={hot ? "mt-3 text-4xl font-semibold text-primary" : "mt-3 text-4xl font-semibold"}>{value}</p>
    </div>
  );
}
