"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Activity, Brain, CheckCircle2, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Act03MarketVsParallax() {
  const [selectedAgent, setSelectedAgent] = useState<string>("onchain");
  const [isDisplaced, setIsDisplaced] = useState<boolean>(true);

  const agents = [
    {
      id: "macro",
      label: "MACRO",
      fullName: "MACRO TAPE",
      prob: 53,
      brier: "0.186",
      dir: "NEUTRAL",
      conf: 69,
      signals: ["Fed rate pause expectation 82%", "Treasury yield stability", "Global M2 liquidity expanding"],
    },
    {
      id: "market",
      label: "MARKET",
      fullName: "MARKET BASELINE",
      prob: 56,
      brier: "0.210",
      dir: "NEUTRAL",
      conf: 65,
      signals: ["Jupiter orderbook mid-price 56c", "24h trading volume $1.8B", "Open interest $42M"],
    },
    {
      id: "quant",
      label: "QUANT",
      fullName: "QUANT REGIME",
      prob: 63,
      brier: "0.151",
      dir: "BULLISH",
      conf: 81,
      signals: ["Vol regime compression complete", "Momentum vector +1.8 std", "SOL/BTC ratio outperformance"],
    },
    {
      id: "news",
      label: "NEWS",
      fullName: "NEWS IMPACT",
      prob: 66,
      brier: "0.164",
      dir: "BULLISH",
      conf: 78,
      signals: ["Institutional custody announcements", "Developer activity +14% QoQ", "Validator client diversity"],
    },
    {
      id: "onchain",
      label: "ONCHAIN",
      fullName: "ONCHAIN FLOW",
      prob: 72,
      brier: "0.128",
      dir: "BULLISH",
      conf: 84,
      signals: ["Stake-weighted liquidity +11%", "Priority fee pressure easing", "Jupiter route depth stable"],
    },
  ];

  const activeAgentData = agents.find((a) => a.id === selectedAgent) || agents[4];

  return (
    <section className="py-28 bg-[#070A0E] border-b border-[#1A2029] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1A2029]">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2878FF] mb-2">
              02 / INTELLIGENCE SCENE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F1F0EA] md:text-5xl lg:text-6xl">
              Specialists debate. Deterministic math decides.
            </h2>
          </div>

          <button
            onClick={() => setIsDisplaced(!isDisplaced)}
            className="flex items-center gap-2 font-mono text-xs text-[#9398A2] hover:text-[#2878FF] transition-colors border border-[#1A2029] rounded px-3 py-1.5 bg-[#0C1016]"
          >
            <Sliders className="size-3.5 text-[#2878FF]" />
            <span>Toggle Parallax Displacement Separation</span>
          </button>
        </div>

        {/* Protagonist Event Header */}
        <div className="mt-12 space-y-2">
          <span className="font-mono text-xs uppercase text-[#FF654D] font-semibold">
            PROTAGONIST EVENT MARKET
          </span>
          <h3 className="text-2xl font-extrabold text-[#F1F0EA] font-mono sm:text-3xl">
            SOL ABOVE $250 BEFORE DEC 31
          </h3>
        </div>

        {/* Raw Typography Display (No Cards!) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-[#1A2029] font-mono">
          <div className="hover-glow-card rounded p-3 bg-[#0C1016]/40 border border-[#1A2029]">
            <span className="text-xs text-[#9398A2] uppercase">MARKET IMPLIED</span>
            <div className="text-5xl font-black text-[#F1F0EA] mt-1">
              <AnimatedCounter value={56} decimals={1} suffix="%" />
            </div>
          </div>
          <div className="hover-glow-card rounded p-3 bg-[#0C1016]/40 border border-[#1A2029]">
            <span className="text-xs text-[#2878FF] uppercase">PARALLAX AI</span>
            <div className="text-5xl font-black text-[#2878FF] mt-1">
              <AnimatedCounter value={68.4} decimals={1} suffix="%" />
            </div>
          </div>
          <div className="hover-glow-card rounded p-3 bg-[#0C1016]/40 border border-[#1A2029]">
            <span className="text-xs text-[#B9FF57] uppercase">PARALLAX EDGE</span>
            <div className="text-5xl font-black text-[#B9FF57] mt-1">
              <AnimatedCounter value={12.4} decimals={1} prefix="+" suffix="%" />
            </div>
          </div>
          <div className="hover-glow-card rounded p-3 bg-[#0C1016]/40 border border-[#1A2029]">
            <span className="text-xs text-[#9398A2] uppercase">BRIER CONFIDENCE</span>
            <div className="text-5xl font-black text-[#F1F0EA] mt-1">
              <AnimatedCounter value={81} decimals={0} />
            </div>
          </div>
        </div>

        {/* 0–100 HORIZONTAL PROBABILITY RULER WITH STAGGERED ZERO-COLLISION LABELS */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#9398A2]">
            <span>0% (DEFINITE NO)</span>
            <span className="font-bold text-[#F1F0EA]">50% EVEN ODDS</span>
            <span>100% (DEFINITE YES)</span>
          </div>

          {/* Probability Spectrum Ruler Bar */}
          <div className="relative h-32 w-full bg-[#0C1016] border border-[#1A2029] rounded flex items-center px-4">
            {/* Center Axis Line */}
            <div className="h-0.5 w-full bg-[#1A2029] relative">
              {/* Ticks for each agent with STAGGERED top/bottom positions */}
              {agents.map((ag, idx) => {
                const isEven = idx % 2 === 0;
                const isSelected = selectedAgent === ag.id;
                return (
                  <div
                    key={ag.id}
                    onClick={() => setSelectedAgent(ag.id)}
                    style={{ left: `${ag.prob}%` }}
                    className={`absolute -translate-x-1/2 cursor-pointer transition-all ${
                      isSelected ? "z-30 scale-110" : "opacity-80 hover:opacity-100 z-10"
                    }`}
                  >
                    {/* Circle Dot on Line */}
                    <div
                      className={`size-3 rounded-full border-2 transition-all ${
                        isSelected
                          ? "bg-[#2878FF] border-white shadow-[0_0_12px_rgba(40,120,255,0.8)]"
                          : "bg-[#0C1016] border-[#2878FF]"
                      }`}
                    />

                    {/* Staggered Label: Even goes UP, Odd goes DOWN */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap font-mono transition-all ${
                        isEven ? "-top-12" : "top-5"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? "bg-[#2878FF] text-white border-[#2878FF]"
                            : "bg-[#070A0E] text-[#F1F0EA] border-[#1A2029]"
                        }`}
                      >
                        {ag.prob}% {ag.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Parallax Consensus Floating Badge */}
              <motion.div
                animate={{
                  left: isDisplaced ? "68.4%" : "56.0%",
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute -top-14 -translate-x-1/2 flex flex-col items-center z-40"
              >
                <div className="px-2.5 py-1 rounded bg-[#2878FF] text-white font-mono text-xs font-black shadow-[0_0_16px_rgba(40,120,255,0.9)] border border-white/20 whitespace-nowrap">
                  68.4% PARALLAX CONSENSUS
                </div>
                <div className="size-2 rotate-45 bg-[#2878FF] -mt-1" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CONTEXTUAL AGENT EVIDENCE PANEL */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-xs text-[#9398A2] uppercase">SPECIALIST QUORUM LIST</span>
            <div className="space-y-2">
              {agents.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAgent(ag.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded border font-mono text-xs transition-all ${
                    selectedAgent === ag.id
                      ? "border-[#2878FF] bg-[#111720] text-[#F1F0EA] font-bold"
                      : "border-[#1A2029] bg-[#0C1016] text-[#9398A2] hover:border-[#2878FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#2878FF]" />
                    <span>{ag.fullName}</span>
                  </div>
                  <span>{ag.prob}% ({ag.dir})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Signals Output */}
          <div className="lg:col-span-8 rounded border border-[#1A2029] bg-[#0C1016] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2029] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#2878FF] uppercase font-bold">
                  SPECIALIST EVIDENCE INSPECTOR
                </span>
                <h4 className="font-mono text-lg font-bold text-[#F1F0EA] mt-1">
                  {activeAgentData.fullName} — PROBABILITY {activeAgentData.prob}%
                </h4>
              </div>
              <div className="font-mono text-xs text-right">
                <div className="text-[#B9FF57] font-bold">BRIER SCORE {activeAgentData.brier}</div>
                <div className="text-[#9398A2]">CONFIDENCE {activeAgentData.conf}/100</div>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#9398A2] uppercase">STRUCTURED EVIDENCE SIGNALS:</span>
              {activeAgentData.signals.map((sig, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded bg-[#070A0E] p-3 border border-[#1A2029] text-[#F1F0EA]">
                  <CheckCircle2 className="size-4 text-[#B9FF57] shrink-0" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
