"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Search, ShieldAlert, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { walletProfiles } from "@/lib/domain/demo-data";

export function Act01Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>("sol_etf");
  const [inputAddress, setInputAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Mouse cursor parallax shift
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Automated graph reveal sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStage(1), 500); // reveal tokens
    const timer2 = setTimeout(() => setActiveStage(2), 1200); // reveal events
    const timer3 = setTimeout(() => setActiveStage(3), 2000); // reveal risk detection banner
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      window.location.href = "/app";
    }, 1200);
  };

  // 3 Token Nodes
  const tokens = [
    { id: "sol", label: "SOL", value: "$38,750", weight: "79.7%" },
    { id: "jup", label: "JUP", value: "$5,650", weight: "11.6%" },
    { id: "usdc", label: "USDC", value: "$4,242", weight: "8.7%" },
  ];

  // 3 Mapped Event Risk Nodes
  const eventNodes = [
    {
      id: "sol_etf",
      label: "SOL ETF Approval Q4",
      market: "78%",
      parallax: "84%",
      exposure: "$18,420",
      sensitivity: "HIGH",
      badge: "HIGH RISK EVENT",
    },
    {
      id: "fed_rate",
      label: "Fed Target Rate Decision",
      market: "68%",
      parallax: "62%",
      exposure: "$12,800",
      sensitivity: "MEDIUM",
      badge: "MACRO EVENT",
    },
    {
      id: "sol_250",
      label: "SOL > $250 Dec 31",
      market: "56%",
      parallax: "68%",
      exposure: "$38,680",
      sensitivity: "CRITICAL",
      badge: "PRICE TARGET",
    },
  ];

  // Precise connection lines mapping token indices to event indices
  // Index 0: SOL -> SOL ETF (0), SOL -> SOL 250 (2)
  // Index 1: JUP -> Fed Rate (1)
  // Index 2: USDC -> Fed Rate (1)
  const connections = [
    { fromIdx: 0, toIdx: 0, label: "0.82 BETA", color: "#2878FF", targetId: "sol_etf" },
    { fromIdx: 0, toIdx: 2, label: "DOMINANT EXPOSURE", color: "#FF654D", targetId: "sol_250" },
    { fromIdx: 1, toIdx: 1, label: "0.45 BETA", color: "#9398A2", targetId: "fed_rate" },
    { fromIdx: 2, toIdx: 1, label: "YIELD DRIFT", color: "#9398A2", targetId: "fed_rate" },
  ];

  const activeInspector = eventNodes.find((n) => n.id === hoveredNode) || eventNodes[0];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-12 pb-24 border-b border-[#1A2029] bg-[#070A0E] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Dominating Headline Act */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded border border-[#1A2029] bg-[#0C1016] px-3 py-1 font-mono text-xs font-medium text-[#9398A2] mb-6">
            <span className="size-1.5 rounded-full bg-[#2878FF] animate-ping" />
            ACT 01 / LIVE EVENT-RISK INTELLIGENCE
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-center">
            <span className="animate-hero-shine">Your portfolio is betting</span>
            <br />
            <span className="animate-text-shine">on events you never chose.</span>
          </h1>

          <p className="mt-6 text-base text-[#9398A2] sm:text-lg max-w-2xl text-center leading-relaxed">
            Parallax maps your Solana portfolio to the real-world events already moving it — then uses prediction markets and specialist agents to quantify what happens next.
          </p>

          {/* CTAs & Wallet Address Scanner */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
            <form onSubmit={handleScan} className="flex-1 flex items-center gap-2 rounded border border-[#1A2029] bg-[#0C1016] p-2 w-full">
              <Search className="ml-2 size-4 text-[#9398A2]" />
              <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="Enter Solana wallet address..."
                className="w-full bg-transparent font-mono text-xs text-[#F1F0EA] placeholder:text-[#9398A2] outline-none"
              />
              <Button type="submit" disabled={isScanning} size="sm" className="font-mono text-xs bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-4">
                {isScanning ? "Scanning..." : "Analyze Wallet"}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <Button asChild size="lg" className="font-mono text-xs font-bold bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-6">
                <Link href="/app">
                  Launch App <ArrowRight className="ml-2 size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono text-xs border-[#1A2029] bg-[#0C1016] text-[#F1F0EA] hover:bg-[#111720]">
                <Link href="/app/markets">Explore Markets</Link>
              </Button>
            </div>
          </div>

          {/* Presets */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-[#9398A2]">
            <span>Analyze Archetype:</span>
            {walletProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => (window.location.href = "/app")}
                className="hover:text-[#F1F0EA] hover:underline transition-colors"
              >
                {p.name} (${p.portfolioValue.toLocaleString()})
              </button>
            ))}
          </div>
        </div>

        {/* PERFECTLY ALIGNED DIRECT CANVAS GRAPH VISUAL */}
        <div className="relative mt-16 max-w-6xl mx-auto">
          {/* Risk Discovery Banner */}
          {activeStage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center justify-between rounded border border-[#FF654D]/40 bg-[#FF654D]/10 px-4 py-2.5 font-mono text-xs text-[#FF654D]"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-4 animate-pulse" />
                <span className="font-bold uppercase tracking-wider">3 MATERIAL EVENT RISKS DETECTED</span>
              </div>
              <span className="text-[11px] text-[#F1F0EA]">SOL ETF, Fed Rates, & SOL Target Concentration</span>
            </motion.div>
          )}

          <div className="relative w-full rounded border border-[#1A2029] bg-[#0C1016] p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center min-h-[440px]">
              {/* Column 1: Tokens (4 cols) */}
              <div className="md:col-span-4 space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9398A2] block mb-2">
                  PORTFOLIO ASSETS (3)
                </span>
                {tokens.map((token, idx) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: activeStage >= 1 ? 1 : 0, x: activeStage >= 1 ? 0 : -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center justify-between rounded border border-[#1A2029] bg-[#070A0E] p-4 h-[100px]"
                  >
                    <div>
                      <div className="font-mono text-sm font-bold text-[#F1F0EA]">{token.label}</div>
                      <div className="font-mono text-xs text-[#9398A2] mt-0.5">{token.weight} Weight</div>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#F1F0EA]">{token.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Column 2: Center Vector Edge Connectors SVG (2 cols) */}
              <div className="hidden md:block md:col-span-2 relative h-[360px]">
                <svg className="absolute inset-0 size-full overflow-visible pointer-events-none" viewBox="0 0 100 360">
                  {/* Layer 1: Market View Line (Mouse Shift) */}
                  <g
                    className="parallax-layer-market"
                    style={{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)` }}
                  >
                    {activeStage >= 2 &&
                      connections.map((c, i) => {
                        const y1 = c.fromIdx * 120 + 50;
                        const y2 = c.toIdx * 120 + 50;
                        return (
                          <line
                            key={`base-${i}`}
                            x1="0"
                            y1={y1}
                            x2="100"
                            y2={y2}
                            stroke="#1A2029"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                          />
                        );
                      })}
                  </g>

                  {/* Layer 2: Parallax Active Exposure Line */}
                  <g
                    className="parallax-layer-parallax"
                    style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}
                  >
                    {activeStage >= 2 &&
                      connections.map((c, i) => {
                        const y1 = c.fromIdx * 120 + 50;
                        const y2 = c.toIdx * 120 + 50;
                        const isSelected = hoveredNode === c.targetId;
                        const midY = (y1 + y2) / 2;
                        return (
                          <g key={`act-${i}`}>
                            <line
                              x1="0"
                              y1={y1}
                              x2="100"
                              y2={y2}
                              stroke={isSelected ? "#2878FF" : c.color}
                              strokeWidth={isSelected ? "3" : "1.5"}
                              opacity={isSelected ? 1 : 0.65}
                            />
                            {/* Micro Beta Badge */}
                            <rect
                              x="12"
                              y={midY - 9}
                              width="76"
                              height="18"
                              rx="3"
                              fill="#070A0E"
                              stroke={isSelected ? "#2878FF" : "#1A2029"}
                              strokeWidth="1"
                            />
                            <text
                              x="50"
                              y={midY + 3}
                              fill={isSelected ? "#2878FF" : "#9398A2"}
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {c.label}
                            </text>
                          </g>
                        );
                      })}
                  </g>
                </svg>
              </div>

              {/* Column 3: Mapped Event Risks (3 cols) */}
              <div className="md:col-span-3 space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9398A2] block mb-2">
                  MAPPED EVENT RISKS (3)
                </span>
                {eventNodes.map((evt, idx) => {
                  const isSelected = hoveredNode === evt.id;
                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: activeStage >= 2 ? 1 : 0, x: activeStage >= 2 ? 0 : 20 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      onMouseEnter={() => setHoveredNode(evt.id)}
                      className={`cursor-pointer rounded border p-3.5 h-[100px] flex flex-col justify-between transition-all ${
                        isSelected
                          ? "border-[#2878FF] bg-[#111720] shadow-[0_0_20px_rgba(40,120,255,0.2)]"
                          : "border-[#1A2029] bg-[#070A0E] hover:border-[#2878FF]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase text-[#FF654D] font-bold">
                          {evt.badge}
                        </span>
                        <span className="font-mono text-xs text-[#2878FF] font-bold">
                          {evt.parallax} AI
                        </span>
                      </div>
                      <div className="font-mono text-xs font-bold text-[#F1F0EA] truncate">{evt.label}</div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#9398A2] border-t border-[#1A2029] pt-1.5">
                        <span>Market: {evt.market}</span>
                        <span>Linked: {evt.exposure}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Column 4: Contextual Node Inspector (3 cols) */}
              <div className="md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9398A2] block mb-2">
                  NODE INSPECTOR
                </span>
                <div className="rounded border border-[#1A2029] bg-[#070A0E] p-4 space-y-4 h-[360px] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="border-b border-[#1A2029] pb-3">
                      <span className="font-mono text-[9px] text-[#FF654D] uppercase font-bold">
                        {activeInspector.badge}
                      </span>
                      <h3 className="font-mono text-sm font-bold text-[#F1F0EA] mt-1 leading-snug">
                        {activeInspector.label}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      <div className="rounded bg-[#0C1016] p-2 border border-[#1A2029]">
                        <span className="text-[9px] text-[#9398A2] uppercase">MARKET</span>
                        <div className="text-base font-bold text-[#F1F0EA]">{activeInspector.market}</div>
                      </div>
                      <div className="rounded bg-[#0C1016] p-2 border border-[#1A2029]">
                        <span className="text-[9px] text-[#2878FF] uppercase">PARALLAX</span>
                        <div className="text-base font-bold text-[#2878FF]">{activeInspector.parallax}</div>
                      </div>
                    </div>

                    <div className="space-y-2 font-mono text-xs border-t border-[#1A2029] pt-3">
                      <div className="flex justify-between">
                        <span className="text-[#9398A2]">PORTFOLIO LINKAGE</span>
                        <span className="font-bold text-[#F1F0EA]">{activeInspector.exposure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9398A2]">SENSITIVITY</span>
                        <span className="font-bold text-[#FF654D]">{activeInspector.sensitivity}</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild size="sm" className="w-full font-mono text-xs bg-[#2878FF] hover:bg-[#2878FF]/90 text-white">
                    <Link href="/app/markets">Inspect Prediction Market</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
