"use client";

import React, { useState } from "react";
import { Sliders, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RiskStressTester({
  basePxRisk = 72,
  portfolioValue = 48600,
}: {
  basePxRisk?: number;
  portfolioValue?: number;
}) {
  const [solShockPercent, setSolShockPercent] = useState<number>(-15);

  const estimatedDrawdownUsd = Math.abs((portfolioValue * 0.797 * (solShockPercent / 100)));
  const stressedPxRisk = Math.min(99, Math.max(10, Math.round(basePxRisk + Math.abs(solShockPercent) * 0.8)));

  return (
    <div className="rounded-lg border border-border bg-card/90 p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
            Market Stress-Test Console
          </span>
        </div>
        <Badge variant={solShockPercent < -10 ? "red" : "default"}>
          {solShockPercent}% SOL SHOCK
        </Badge>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Simulate underlying spot market drawdowns to observe instant recalculations of portfolio Value-at-Risk (VAR) and PX Risk score.
      </p>

      {/* Slider */}
      <div className="mt-5">
        <div className="flex justify-between font-mono text-xs text-muted-foreground">
          <span>-30% Flash Crash</span>
          <span className="font-semibold text-foreground">{solShockPercent}% Price Shift</span>
          <span>+20% Rally</span>
        </div>
        <input
          type="range"
          min="-30"
          max="20"
          step="1"
          value={solShockPercent}
          onChange={(e) => setSolShockPercent(Number(e.target.value))}
          className="mt-2 h-2 w-full cursor-pointer accent-primary"
        />
      </div>

      {/* Output stats */}
      <div className="mt-5 grid grid-cols-2 gap-4 rounded border border-border bg-background/80 p-3.5">
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">Estimated SOL Drawdown</p>
          <p className="mt-1 text-xl font-semibold text-destructive">
            -${estimatedDrawdownUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">Stressed PX Risk</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-semibold text-muted-foreground">{basePxRisk}</span>
            <ArrowRight className="size-3 text-muted-foreground" />
            <span className="text-xl font-semibold text-destructive">{stressedPxRisk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
