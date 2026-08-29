"use client";

import React from "react";
import { MetricCard } from "@/components/app/metric-card";
import { Badge } from "@/components/ui/badge";
import { PortfolioRiskGraph } from "@/components/ui/portfolio-risk-graph";
import { RiskStressTester } from "@/components/ui/risk-stress-tester";
import { assets, eventRisks, pxRisk, riskPolicy } from "@/lib/domain/demo-data";
import { ShieldCheck, Sliders, Layers } from "lucide-react";

export default function RiskPage() {
  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="red">RISK CONSOLE</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Portfolio Exposure & Policy Bounds
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Proprietary PX Risk score breakdown and live asset-to-event correlation network graph.
            </p>
          </div>
        </div>

        {/* PX Risk 6-Component Breakdown */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="PX Risk Score" value={String(pxRisk.score)} detail={pxRisk.level} tone="bad" />
          <MetricCard label="Concentration" value="82" detail="SOL weighted (79.7%)" />
          <MetricCard label="Event Sensitivity" value="76" detail="3 High Sensitivity Markets" tone="hot" />
          <MetricCard label="Daily Budget Cap" value={`$${riskPolicy.dailyRiskBudgetUsd}`} detail="User Risk Policy Limit" />
        </div>
      </section>

      {/* Interactive Risk Network Graph */}
      <section>
        <PortfolioRiskGraph />
      </section>

      {/* Grid: Asset Beta Matrix & Stress Tester */}
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        {/* Asset Beta Breakdown */}
        <div className="rounded-lg border border-border bg-card/90 p-5">
          <h2 className="text-xl font-semibold text-foreground">Asset Beta & Concentration Matrix</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Token weights and directional beta relative to spot SOL price movements.
          </p>

          <div className="mt-4 space-y-3 font-mono text-xs">
            {assets.map((asset) => (
              <div key={asset.symbol} className="rounded-md border border-border/80 bg-background/80 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground">{asset.name} ({asset.symbol})</span>
                    <span className="ml-2 text-muted-foreground">{asset.quantity.toLocaleString()} units</span>
                  </div>
                  <span className="font-semibold text-foreground">${asset.valueUsd.toLocaleString()}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Portfolio Weight: {asset.portfolioWeight}%</span>
                  <span>SOL Beta: {asset.betaToSol}x</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${asset.portfolioWeight}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stress Tester Slider */}
        <div>
          <RiskStressTester basePxRisk={pxRisk.score} portfolioValue={48600} />
        </div>
      </section>
    </div>
  );
}
