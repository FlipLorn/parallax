"use client";

import React from "react";
import { Brain, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentConsensusBar } from "@/components/ui/agent-consensus-bar";
import { agentSignals } from "@/lib/domain/demo-data";
import { TransactionSimulatorDrawer } from "@/components/ui/transaction-simulator-drawer";

export function AgentRadarPreview() {
  return (
    <section id="intelligence" className="border-t border-border/80 bg-card/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] items-center">
          <div>
            <Badge variant="ink" className="font-mono text-xs uppercase tracking-widest">
              Agent Intelligence & Disagreement
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Specialists debate. Deterministic math decides.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Parallax does not rely on a single LLM prompt. Four specialized agent models analyze onchain flows, quant momentum, news velocity, and macro tapes. Outputs are combined by historical Brier score accuracy weights.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded border border-border bg-background/80 p-3">
                <span className="text-muted-foreground uppercase text-[10px]">Market Implied</span>
                <p className="mt-1 text-2xl font-semibold text-foreground">56%</p>
                <p className="text-[11px] text-muted-foreground">Orderbook mid-price</p>
              </div>
              <div className="rounded border border-primary/40 bg-primary/10 p-3">
                <span className="text-primary uppercase text-[10px]">Parallax Consensus</span>
                <p className="mt-1 text-2xl font-semibold text-primary">68%</p>
                <p className="text-[11px] text-emerald-400 font-semibold">+12.0pt Model Edge</p>
              </div>
            </div>

            <div className="mt-8">
              <TransactionSimulatorDrawer
                marketTitle="SOL above $220 by Friday close"
                side="NO"
                suggestedUsd={43}
                maxPayoutUsd={76.8}
                triggerText="Review Bounded Action ($43 NO)"
              />
            </div>
          </div>

          <div>
            <AgentConsensusBar signals={agentSignals} marketProbability={56} parallaxProbability={68} />
          </div>
        </div>
      </div>
    </section>
  );
}
