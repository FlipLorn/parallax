"use client";

import React, { useState } from "react";
import { Brain, Sliders, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AgentWeightSandbox() {
  const [onchainW, setOnchainW] = useState(35);
  const [quantW, setQuantW] = useState(25);
  const [newsW, setNewsW] = useState(20);
  const [macroW, setMacroW] = useState(20);

  const totalW = onchainW + quantW + newsW + macroW;

  // Agent forecast raw probabilities
  const pOnchain = 72;
  const pQuant = 63;
  const pNews = 66;
  const pMacro = 53;

  // Weighted consensus
  const weightedProb =
    (pOnchain * (onchainW / totalW) +
      pQuant * (quantW / totalW) +
      pNews * (newsW / totalW) +
      pMacro * (macroW / totalW)).toFixed(1);

  // Calibration score
  const brierCombined = (
    0.128 * (onchainW / totalW) +
    0.151 * (quantW / totalW) +
    0.164 * (newsW / totalW) +
    0.186 * (macroW / totalW)
  ).toFixed(3);

  const resetWeights = () => {
    setOnchainW(35);
    setQuantW(25);
    setNewsW(20);
    setMacroW(20);
  };

  return (
    <div className="rounded-lg border border-border bg-card/90 p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Brain className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
            Agent Ensemble Weight Sandbox
          </span>
        </div>
        <button
          onClick={resetWeights}
          className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="size-3" /> Reset Default
        </button>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Adjust individual model weights to simulate how agent ensemble consensus recalculates under custom research priorities.
      </p>

      {/* Sliders Grid */}
      <div className="mt-5 space-y-4 font-mono text-xs">
        <div>
          <div className="flex justify-between text-[11px]">
            <span className="text-foreground font-semibold">Onchain Flow Model ({pOnchain}%)</span>
            <span className="text-primary font-semibold">{onchainW}% Weight</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={onchainW}
            onChange={(e) => setOnchainW(Number(e.target.value))}
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px]">
            <span className="text-foreground font-semibold">Quant Regime Model ({pQuant}%)</span>
            <span className="text-primary font-semibold">{quantW}% Weight</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={quantW}
            onChange={(e) => setQuantW(Number(e.target.value))}
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px]">
            <span className="text-foreground font-semibold">News Impact Model ({pNews}%)</span>
            <span className="text-primary font-semibold">{newsW}% Weight</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={newsW}
            onChange={(e) => setNewsW(Number(e.target.value))}
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px]">
            <span className="text-foreground font-semibold">Macro Tape Model ({pMacro}%)</span>
            <span className="text-primary font-semibold">{macroW}% Weight</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={macroW}
            onChange={(e) => setMacroW(Number(e.target.value))}
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Recalculated Output Box */}
      <div className="mt-5 grid grid-cols-2 gap-4 rounded border border-border bg-background/80 p-3.5 font-mono">
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Recalculated Consensus</span>
          <p className="mt-1 text-2xl font-semibold text-primary">{weightedProb}%</p>
        </div>
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Ensemble Brier Score</span>
          <p className="mt-1 text-2xl font-semibold text-emerald-400">{brierCombined}</p>
        </div>
      </div>
    </div>
  );
}
