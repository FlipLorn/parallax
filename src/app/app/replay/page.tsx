"use client";

import React, { useState } from "react";
import { History, Play, CheckCircle2, ArrowRight, Activity, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { replayEvents } from "@/lib/domain/demo-data";

export default function ReplayPage() {
  const [selectedEventId, setSelectedEventId] = useState<string>("replay-1");
  const [pointIndex, setPointIndex] = useState<number>(0);

  const activeReplay = replayEvents.find((r) => r.id === selectedEventId) || replayEvents[0];
  const currentPoint = activeReplay.points[pointIndex] || activeReplay.points[0];

  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="ink">AUDIT TRAIL</Badge>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Parallax Event Forecast Replay
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Scrub historical timelines to verify deterministic model forecasts and Brier score accuracy over time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Replay Console */}
      <section className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Replay Event Switcher */}
        <div className="rounded-lg border border-border bg-card/90 p-4 space-y-2">
          <span className="font-mono text-[10px] font-semibold uppercase text-muted-foreground">
            Resolved Replay Events
          </span>
          {replayEvents.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedEventId(r.id);
                setPointIndex(0);
              }}
              className={`w-full rounded p-3 text-left transition-colors font-mono text-xs ${
                r.id === selectedEventId
                  ? "bg-primary/20 text-primary border border-primary/30 font-semibold"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <div className="font-medium text-sm">{r.title}</div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Resolved {r.outcome}</span>
                <span className="text-emerald-400">Brier {r.brierScore}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Timeline Scrubber & Inspector */}
        <div className="rounded-lg border border-border bg-card/90 p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">Event Audit Title</span>
              <h2 className="text-xl font-semibold text-foreground">{activeReplay.title}</h2>
            </div>
            <Badge variant="lime">RESOLVED {activeReplay.outcome}</Badge>
          </div>

          {/* Timeline Scrubber Slider */}
          <div className="mt-6 rounded border border-border bg-background/80 p-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3.5" /> {currentPoint.date}
              </span>
              <span className="font-semibold text-primary">
                Step {pointIndex + 1} of {activeReplay.points.length}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={activeReplay.points.length - 1}
              step="1"
              value={pointIndex}
              onChange={(e) => setPointIndex(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-primary"
            />

            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
              {activeReplay.points.map((pt, i) => (
                <span key={i} className={i === pointIndex ? "text-primary font-semibold" : ""}>
                  {pt.date}
                </span>
              ))}
            </div>
          </div>

          {/* Point Inspector Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded border border-border bg-background/80 p-4 font-mono">
            <div>
              <span className="text-[10px] uppercase text-muted-foreground">Market Implied Probability</span>
              <p className="mt-1 text-2xl font-semibold text-foreground">{currentPoint.marketProbability}%</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-primary">Parallax Forecast Probability</span>
              <p className="mt-1 text-2xl font-semibold text-primary">{currentPoint.parallaxProbability}%</p>
            </div>
          </div>

          <div className="mt-4 rounded border border-border bg-background/80 p-4 font-mono text-xs">
            <span className="text-[10px] uppercase text-muted-foreground">Agent Signal Event Trigger</span>
            <p className="mt-1 text-foreground font-medium">{currentPoint.signal}</p>
            <span className="mt-2 inline-block text-[10px] text-primary">Trigger Agent: {currentPoint.agentId.toUpperCase()}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
