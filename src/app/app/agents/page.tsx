"use client";

import React from "react";
import { Brain, CheckCircle2, Award, FileText, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/app/metric-card";
import { AgentWeightSandbox } from "@/components/ui/agent-weight-sandbox";
import { agentSignals } from "@/lib/domain/demo-data";

export default function AgentsPage() {
  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="ink">AI QUORUM TERMINAL</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Agent Leaderboard & Brier Score Calibration
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Specialist research models generate structured signals evaluated by statistical accuracy (Brier Scores: 0.0 = perfect, 1.0 = worst).
            </p>
          </div>
        </div>

        {/* Brier Score Summary Cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Onchain Flow Agent" value="0.128" detail="35% Ensemble Weight" tone="good" />
          <MetricCard label="Quant Regime Agent" value="0.151" detail="25% Ensemble Weight" tone="good" />
          <MetricCard label="News Impact Agent" value="0.164" detail="20% Ensemble Weight" tone="good" />
          <MetricCard label="Macro Tape Agent" value="0.186" detail="20% Ensemble Weight" tone="good" />
        </div>
      </section>

      {/* Interactive Ensemble Weight Sandbox */}
      <section>
        <AgentWeightSandbox />
      </section>

      {/* Agent Rationale & Evidence Stream */}
      <section className="grid gap-6 sm:grid-cols-2">
        {agentSignals.map((agent) => (
          <div key={agent.agentId} className="flex flex-col justify-between rounded-lg border border-border/80 bg-card/90 p-5 shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="size-4 text-primary" />
                  <span className="font-semibold text-foreground">{agent.label}</span>
                </div>
                <Badge variant={agent.direction === "BULLISH" ? "lime" : agent.direction === "BEARISH" ? "red" : "default"}>
                  {agent.direction}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded border border-border bg-background/80 p-3 font-mono text-center">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Forecast Probability</span>
                  <p className="mt-1 text-xl font-semibold text-primary">{agent.probability}%</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Brier Score</span>
                  <p className="mt-1 text-xl font-semibold text-emerald-400">{agent.brierScore}</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">{agent.signal}</p>

              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Verified Evidence Stream</p>
                <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-muted-foreground">
                  {agent.evidence.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-3 font-mono text-[10px] text-muted-foreground flex justify-between">
              <span>Confidence: {agent.confidence}%</span>
              <span>Strength: +{agent.strength}pt</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
