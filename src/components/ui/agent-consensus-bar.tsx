"use client";

import React, { useState } from "react";
import { Brain, ChevronDown, ChevronUp, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AgentSignal } from "@/lib/domain/types";

export function AgentConsensusBar({
  signals,
  marketProbability = 56,
  parallaxProbability = 67,
}: {
  signals: AgentSignal[];
  marketProbability?: number;
  parallaxProbability?: number;
}) {
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>("onchain");

  return (
    <div className="rounded-lg border border-border bg-card/90 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="size-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
              Agent Quorum & Probability Radar
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Specialist models forecast independently. Outputs are combined by Brier score weights.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Market Implied</p>
            <p className="font-mono text-sm font-semibold">{marketProbability}%</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Parallax Consensus</p>
            <p className="font-mono text-sm font-semibold text-primary">{parallaxProbability}%</p>
          </div>
        </div>
      </div>

      {/* Disagreement Probability Ruler */}
      <div className="relative mt-5">
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>0% NO</span>
          <span>50% EVEN</span>
          <span>100% YES</span>
        </div>
        <div className="relative mt-2 h-3 w-full rounded bg-secondary">
          {/* Market baseline pin */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground"
            style={{ left: `${marketProbability}%` }}
          />
          {/* Parallax consensus pin */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_8px_#2458FF]"
            style={{ left: `${parallaxProbability}%` }}
          />

          {/* Agent markers */}
          {signals.map((sig) => (
            <div
              key={sig.agentId}
              className="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full border border-background shadow"
              style={{
                left: `${sig.probability}%`,
                backgroundColor:
                  sig.direction === "BULLISH"
                    ? "#10B981"
                    : sig.direction === "BEARISH"
                    ? "#EF4444"
                    : "#D8A84F",
              }}
              title={`${sig.label}: ${sig.probability}%`}
            />
          ))}
        </div>
      </div>

      {/* Agent cards list */}
      <div className="mt-5 space-y-3">
        {signals.map((agent) => {
          const isExpanded = expandedAgentId === agent.agentId;
          return (
            <div
              key={agent.agentId}
              className="rounded-md border border-border/70 bg-background/60 p-3.5 transition-colors hover:border-border"
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setExpandedAgentId(isExpanded ? null : agent.agentId)}
              >
                <div className="flex items-center gap-3">
                  <Badge variant={agent.direction === "BULLISH" ? "lime" : agent.direction === "BEARISH" ? "red" : "default"}>
                    {agent.direction}
                  </Badge>
                  <div>
                    <span className="font-medium text-foreground">{agent.label}</span>
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      Brier {agent.brierScore}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono text-sm font-semibold">
                    {agent.probability}% <span className="text-xs font-normal text-muted-foreground">({agent.confidence}% conf)</span>
                  </div>
                  {isExpanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 border-t border-border/60 pt-3 text-xs leading-5">
                  <p className="text-foreground">{agent.signal}</p>
                  <div className="mt-3">
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">Evidence Log</p>
                    <ul className="mt-1 space-y-1 font-mono text-[11px] text-muted-foreground">
                      {agent.evidence.map((ev, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-primary" /> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
