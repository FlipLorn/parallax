"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Search, ShieldAlert, Sparkles, Wallet, Layers, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortfolioRiskGraph } from "@/components/ui/portfolio-risk-graph";
import { walletProfiles } from "@/lib/domain/demo-data";

export function HeroSection() {
  const [inputAddress, setInputAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress.trim()) return;
    setIsScanning(true);
    setScanMessage("Scanning Helius DAS API for token holdings & protocol beta...");
    setTimeout(() => {
      setScanMessage("Mapping holdings to live prediction market event vectors...");
    }, 800);
    setTimeout(() => {
      setIsScanning(false);
      window.location.href = "/app";
    }, 1600);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 border-b border-border/60">
      {/* Background Orbit Galaxy Effects */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full min-h-screen pointer-events-none -z-10 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full">
          <circle className="stroke-white/10 stroke-1" strokeDasharray="5 5" cx="50%" cy="50%" r="280" fill="none" />
          <circle className="stroke-white/10 stroke-1" strokeDasharray="5 5" cx="50%" cy="50%" r="440" fill="none" />
          <circle className="stroke-white/10 stroke-1" strokeDasharray="5 5" cx="50%" cy="50%" r="600" fill="none" />
        </svg>

        {/* Orbiting Agent Icons */}
        <div style={{ "--duration": "35s", "--radius": 280 } as React.CSSProperties} className="absolute flex size-8 animate-orbit items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 backdrop-blur-md">
          <Cpu className="size-4" />
        </div>
        <div style={{ "--duration": "50s", "--radius": 440 } as React.CSSProperties} className="absolute flex size-8 animate-orbit items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 backdrop-blur-md">
          <Activity className="size-4" />
        </div>
      </div>

      {/* Top Blue Radial Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[300px] bg-blue-600/20 blur-[9rem] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4">
        {/* Center Hero Heading & Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Vetra Sparkle Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1.5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(37,99,235,0.25)]">
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-[10px] font-bold text-white uppercase tracking-wider">
              NEW
            </span>
            <span className="font-mono text-xs font-semibold text-neutral-200">
              Autonomous Event-Risk Intelligence OS
            </span>
          </div>

          {/* Vetra Gradient Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            Your portfolio is betting on{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              events you never chose.
            </span>
          </h1>

          <p className="mt-6 text-base leading-7 text-neutral-400 sm:text-lg max-w-3xl mx-auto">
            Parallax maps hidden event exposure across your Solana portfolio, uses prediction markets as a live probability layer, and deploys specialist AI agents to help you understand, predict, and protect against what happens next.
          </p>

          {/* Vetra Style Address Scanner */}
          <form
            onSubmit={handleScan}
            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/10 bg-card/80 p-2.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <Search className="ml-3 size-4 text-neutral-400" />
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="Enter Solana wallet address (e.g. DX7p...a91Q)..."
              className="w-full bg-transparent font-mono text-xs text-white placeholder:text-neutral-500 outline-none"
            />
            <Button type="submit" disabled={isScanning} className="font-mono text-xs font-bold whitespace-nowrap px-6 bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              {isScanning ? "Scanning..." : "Analyze Risk"}
            </Button>
          </form>

          {scanMessage && (
            <p className="mt-2 font-mono text-xs text-blue-400 animate-pulse">{scanMessage}</p>
          )}

          {/* Quick preset switchers */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[10px] uppercase text-neutral-400">Or test wallet archetype:</span>
            {walletProfiles.map((p) => (
              <Button
                key={p.id}
                variant="outline"
                size="sm"
                asChild
                className="font-mono text-[11px] h-7 px-3 bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800 text-neutral-300"
              >
                <Link href="/app">
                  {p.name} (${p.portfolioValue.toLocaleString()})
                </Link>
              </Button>
            ))}
          </div>

          {/* Vetra CTAs */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="font-mono text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] px-8">
              <Link href="/app">
                Launch App <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-sm font-semibold border-white/10 bg-white/5 hover:bg-white/10 text-white">
              <Link href="/app/markets">Explore Markets</Link>
            </Button>
          </div>
        </motion.div>

        {/* Vetra Glowing Dashboard Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mt-16 max-w-6xl mx-auto"
        >
          {/* Vetra Image Glow Aura */}
          <div className="absolute top-1/4 left-1/2 -z-10 bg-gradient-to-r from-sky-500 to-blue-600 w-3/4 -translate-x-1/2 h-1/2 -translate-y-1/2 rounded-full blur-[10rem] animate-image-glow" />

          <div className="rounded-2xl border border-white/10 bg-neutral-950/90 p-3 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <PortfolioRiskGraph />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
