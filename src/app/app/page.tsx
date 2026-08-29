"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Brain, CheckCircle2, ShieldCheck, WalletCards, KeyRound, Sparkles, Filter } from "lucide-react";
import { MetricCard } from "@/components/app/metric-card";
import { TransactionSimulatorDrawer } from "@/components/ui/transaction-simulator-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpandDetails } from "@/components/ui/expand-details";
import { agentSignals, eventRisks, markets, positionSizing, pxRisk, walletProfiles } from "@/lib/domain/demo-data";
import type { ArchetypeId } from "@/lib/domain/types";

export default function AppOverviewPage() {
  const [selectedProfileId, setSelectedProfileId] = useState<ArchetypeId>("sol_whale");
  const [filterKind, setFilterKind] = useState<"ALL" | "PROTECTION" | "OPPORTUNITY" | "WATCH">("ALL");

  const activeProfile = walletProfiles.find((p) => p.id === selectedProfileId) || walletProfiles[0];
  const leadMarket = markets[0];

  const filteredMarkets = markets.filter((m) => {
    if (filterKind === "ALL") return true;
    return m.classification === filterKind;
  });

  return (
    <div className="grid gap-6">
      {/* Top Portfolio Briefing Banner */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-[0_0_40px_rgba(36,88,255,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="ink">LIVE DEMO MODE</Badge>
              <span className="font-mono text-xs text-muted-foreground">{activeProfile.address}</span>
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Risk Briefing: {activeProfile.name}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">{activeProfile.description}</p>
          </div>
          <Button asChild variant="outline" className="font-mono text-xs">
            <Link href={`/app/markets/${leadMarket.id}`}>
              Open Lead Market <ArrowUpRight className="ml-1.5 size-3.5" />
            </Link>
          </Button>
        </div>

        {/* 4 Metric Cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Portfolio Value"
            value={`$${activeProfile.portfolioValue.toLocaleString()}`}
            detail="Read-only wallet holdings"
          />
          <MetricCard
            label="PX Risk Score"
            value={String(pxRisk.score)}
            detail={`${pxRisk.level} Event Sensitivity`}
            tone="bad"
          />
          <MetricCard
            label="Suggested Hedge Size"
            value={`$${positionSizing.finalUsd}`}
            detail="Policy capped ($65 max)"
            tone="hot"
          />
          <MetricCard
            label="Forecast Edge"
            value={`${(leadMarket.parallaxProbability - leadMarket.marketProbability).toFixed(1)}pt`}
            detail="Parallax 67% vs Market 56%"
            tone="good"
          />
        </div>

        {/* Recommended Action Highlight */}
        <div className="mt-6 rounded-md border border-primary/40 bg-primary/10 p-5">
          <div className="grid gap-4 lg:grid-cols-[160px_1fr_200px] items-center">
            <div className="flex flex-col items-center justify-center rounded border border-primary/40 bg-card p-4 text-center">
              <ShieldCheck className="size-8 text-primary" />
              <span className="mt-2 font-mono text-[10px] uppercase font-semibold text-primary">
                RECOMMENDED ACTION
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Badge variant="red">PROTECTION</Badge>
                <span className="font-mono text-xs text-muted-foreground">High SOL Concentration</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Buy NO on {leadMarket.title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Your wallet holds 79.7% SOL allocation. Buying 65 NO contract shares caps downside sensitivity by 18.4% while keeping your transaction within policy budget limits.
              </p>
            </div>

            <div className="flex justify-end">
              <TransactionSimulatorDrawer
                marketTitle={leadMarket.title}
                side="NO"
                suggestedUsd={43}
                maxPayoutUsd={76.8}
                triggerText="Review & Simulate ($43)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Event Exposure Queue & Agent Signals */}
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        {/* Event Exposure Queue */}
        <div className="rounded-lg border border-border bg-card/90 p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Event Exposure Queue</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Active market pricing mapped directly to wallet assets.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 font-mono text-[11px]">
              {(["ALL", "PROTECTION", "OPPORTUNITY", "WATCH"] as const).map((kind) => (
                <button
                  key={kind}
                  onClick={() => setFilterKind(kind)}
                  className={`rounded px-2.5 py-1 transition-colors ${
                    filterKind === kind
                      ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {filteredMarkets.map((m) => {
              const edge = m.parallaxProbability - m.marketProbability;
              return (
                <Link
                  key={m.id}
                  href={`/app/markets/${m.id}`}
                  className="grid gap-4 rounded-md border border-border/80 bg-background/80 p-4 transition-all hover:border-primary md:grid-cols-[1fr_120px_100px_100px]"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={m.classification === "PROTECTION" ? "red" : m.classification === "OPPORTUNITY" ? "lime" : "default"}>
                        {m.classification}
                      </Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">Closes {m.closeDate}</span>
                    </div>
                    <p className="mt-2 font-medium text-foreground text-sm">{m.title}</p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">Market / Parallax</p>
                    <p className="mt-1 font-mono text-sm font-semibold">
                      {m.marketProbability}% <span className="text-primary">/ {m.parallaxProbability}%</span>
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">Edge</p>
                    <p className={`mt-1 font-mono text-sm font-semibold ${edge > 0 ? "text-emerald-400" : "text-destructive"}`}>
                      {edge > 0 ? `+${edge.toFixed(1)}pt` : `${edge.toFixed(1)}pt`}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button variant="outline" size="sm" className="font-mono text-xs">
                      Inspect <ArrowUpRight className="ml-1 size-3" />
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Agent Quorum Evidence Sidebar */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card/90 p-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                Agent Quorum Activity
              </span>
              <Badge variant="lime">4 ACTIVE MODELS</Badge>
            </div>

            <div className="mt-4 space-y-3">
              {agentSignals.map((agent) => (
                <ExpandDetails
                  key={agent.agentId}
                  eyebrow={`${agent.label} (Brier ${agent.brierScore})`}
                  title={`${agent.probability}% Forecast (${agent.direction})`}
                  defaultOpen={agent.agentId === "onchain"}
                >
                  <p className="text-xs leading-5 text-muted-foreground">{agent.signal}</p>
                  <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted-foreground">
                    {agent.evidence.map((ev, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3 text-primary" /> {ev}
                      </li>
                    ))}
                  </ul>
                </ExpandDetails>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
