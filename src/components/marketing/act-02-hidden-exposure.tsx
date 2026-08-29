"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Layers, ArrowRight, Activity, Zap } from "lucide-react";

export function Act02HiddenExposure() {
  const [viewMode, setViewMode] = useState<"positions" | "events">("events");

  return (
    <section className="py-28 bg-[#070A0E] border-b border-[#1A2029] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1A2029]">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2878FF] mb-2">
              01 / HIDDEN EXPOSURE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F1F0EA] md:text-5xl lg:text-6xl">
              Your tokens are not your true risk.
            </h2>
          </div>

          {/* Interactive Perspective Toggle */}
          <div className="flex items-center gap-2 rounded border border-[#1A2029] bg-[#0C1016] p-1 font-mono text-xs">
            <button
              onClick={() => setViewMode("positions")}
              className={`rounded px-3 py-1.5 transition-colors ${
                viewMode === "positions" ? "bg-[#111720] text-[#F1F0EA] font-bold" : "text-[#9398A2] hover:text-[#F1F0EA]"
              }`}
            >
              WHAT YOU OWN (TOKENS)
            </button>
            <button
              onClick={() => setViewMode("events")}
              className={`rounded px-3 py-1.5 transition-colors ${
                viewMode === "events" ? "bg-[#2878FF] text-white font-bold" : "text-[#9398A2] hover:text-[#F1F0EA]"
              }`}
            >
              WHAT MOVES IT (EVENTS)
            </button>
          </div>
        </div>

        {/* Full-width Narrative Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portfolio Allocation vs Event Reassignment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs text-[#9398A2] uppercase tracking-wider flex items-center justify-between">
              <span>{viewMode === "positions" ? "Token Holdings" : "Reassigned Event Vector Mapping"}</span>
              <span>100.0% Portfolio Net Exposure</span>
            </div>

            {viewMode === "positions" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {[
                  { name: "SOL (Solana)", pct: "58%", val: "$28,300", color: "#2878FF" },
                  { name: "JUP (Jupiter Exchange)", pct: "14%", val: "$6,830", color: "#38BDF8" },
                  { name: "JTO (Jito Staking)", pct: "8%", val: "$3,900", color: "#B9FF57" },
                  { name: "USDC (Cash Buffer)", pct: "20%", val: "$9,770", color: "#9398A2" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded border border-[#1A2029] bg-[#0C1016] p-4">
                    <div className="flex justify-between font-mono text-sm font-bold text-[#F1F0EA]">
                      <span>{item.name}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="mt-2 h-2 rounded bg-[#111720] overflow-hidden">
                      <div className="h-full rounded" style={{ width: item.pct, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {[
                  { event: "SOL ETF Approval Q4", linked: "SOL (58%) + JTO (8%)", exposure: "$32,200", sensitivity: "0.88 BETA", color: "#FF654D" },
                  { event: "Fed Target Rate Decision", linked: "USDC (20%) + SOL (58%)", exposure: "$38,070", sensitivity: "MACRO REGIME", color: "#FFB648" },
                  { event: "Solana DEX Volume > $20B", linked: "JUP (14%) + SOL (58%)", exposure: "$35,130", sensitivity: "0.74 BETA", color: "#2878FF" },
                  { event: "SEC Regulatory Classification", linked: "JUP (14%) + JTO (8%)", exposure: "$10,730", sensitivity: "REGULATORY", color: "#FF654D" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded border border-[#1A2029] bg-[#0C1016] p-4 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-[#F1F0EA]">{item.event}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.sensitivity}</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs text-[#9398A2]">
                      <span>Affecting: {item.linked}</span>
                      <span className="text-[#F1F0EA] font-semibold">Exposure: {item.exposure}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Physical Warm White Analyst Notes */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs text-[#9398A2] uppercase tracking-wider">
              PHYSICAL ANALYST NOTE #01
            </span>

            {/* Warm White Analyst Note Object */}
            <div className="analyst-note-card p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#070A0E]/20 pb-3">
                <span className="font-bold tracking-wider text-[11px] text-[#070A0E]/70 uppercase">
                  EVENT MEMORANDUM
                </span>
                <span className="font-bold text-[#2878FF]">PARALLAX RISKSCORE</span>
              </div>

              <div>
                <div className="text-base font-extrabold text-[#070A0E] tracking-tight">
                  SOL ETF APPROVAL BEFORE Q4
                </div>
                <div className="mt-1 text-xs text-[#070A0E]/80 leading-relaxed">
                  Market pricing is currently under-reflecting SEC commentary timelines. Parallax quorum detects 12.4% bullish model edge.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-b border-[#070A0E]/20 py-3 font-mono">
                <div>
                  <span className="text-[10px] text-[#070A0E]/60 uppercase">MARKET IMPLIED</span>
                  <div className="text-lg font-bold text-[#070A0E]">78.0%</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#2878FF] uppercase">PARALLAX AI</span>
                  <div className="text-lg font-bold text-[#2878FF]">84.2%</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#070A0E]/70 pt-1">
                <span>PORTFOLIO LINKAGE: $18,420</span>
                <span className="font-bold text-[#FF654D]">HIGH BETA</span>
              </div>
            </div>

            {/* Closing Thesis Statement */}
            <div className="pt-6 border-t border-[#1A2029]">
              <blockquote className="text-xl font-bold tracking-tight text-[#F1F0EA] italic">
                “Tokens are positions. Events are the hidden portfolio.”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
