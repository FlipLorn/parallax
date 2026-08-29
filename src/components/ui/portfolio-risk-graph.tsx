"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ArrowRight, ExternalLink, Zap, Sliders, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  value: string;
  type: "asset" | "event";
  riskLevel?: "HIGH" | "MEDIUM" | "LOW";
  correlation?: number;
  x: number;
  y: number;
  detail: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
  strength: number;
  riskType: "HIGH" | "MEDIUM";
}

const NODES: GraphNode[] = [
  {
    id: "sol",
    label: "SOL (Solana)",
    sublabel: "79.7% Portfolio Weight",
    value: "$38,750",
    type: "asset",
    x: 140,
    y: 110,
    detail: "Primary spot holding. High concentration creates dominant exposure to SOL price events.",
  },
  {
    id: "jup",
    label: "JUP (Jupiter)",
    sublabel: "11.6% Portfolio Weight",
    value: "$5,658",
    type: "asset",
    x: 140,
    y: 240,
    detail: "DEX protocol ecosystem token. Beta correlates with Solana DEX trading volume.",
  },
  {
    id: "usdc",
    label: "USDC (Cash Buffer)",
    sublabel: "8.7% Portfolio Weight",
    value: "$4,192",
    type: "asset",
    x: 140,
    y: 360,
    detail: "Non-volatile stablecoin reserve available for hedging budget and opportunistic buys.",
  },
  {
    id: "evt-sol-220",
    label: "SOL > $220 Friday",
    sublabel: "Prediction Market",
    value: "56% Implied",
    type: "event",
    riskLevel: "HIGH",
    correlation: 0.74,
    x: 640,
    y: 110,
    detail: "High SOL concentration makes this market your dominant invisible bet ($38,680 linked risk).",
  },
  {
    id: "evt-fed-rate",
    label: "Fed Target Rate Decision",
    sublabel: "Macro Rates Event",
    value: "68% Hold",
    type: "event",
    riskLevel: "MEDIUM",
    correlation: 0.62,
    x: 640,
    y: 240,
    detail: "$44,408 portfolio rate sensitivity. Macro interest rate expectations drive SOL liquidity appetite.",
  },
  {
    id: "evt-jup-vol",
    label: "Jupiter Swap Vol > $2B",
    sublabel: "Protocol Event",
    value: "41% Implied",
    type: "event",
    riskLevel: "MEDIUM",
    correlation: 0.58,
    x: 640,
    y: 360,
    detail: "DEX trading route expansion directly impacts JUP valuation and routing yield.",
  },
];

const EDGES: GraphEdge[] = [
  { source: "sol", target: "evt-sol-220", label: "0.74 Corr", strength: 3, riskType: "HIGH" },
  { source: "sol", target: "evt-fed-rate", label: "0.62 Beta", strength: 2, riskType: "MEDIUM" },
  { source: "jup", target: "evt-jup-vol", label: "0.58 Beta", strength: 2, riskType: "MEDIUM" },
  { source: "usdc", target: "evt-sol-220", label: "Hedge Reserve", strength: 1, riskType: "MEDIUM" },
];

export function PortfolioRiskGraph({
  onSelectNode,
  interactive = true,
}: {
  onSelectNode?: (node: GraphNode) => void;
  interactive?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string>("evt-sol-220");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeNode = NODES.find((n) => n.id === (hoveredId || selectedId)) || NODES[3];

  return (
    <div className="w-full rounded-xl border border-border bg-card/95 p-6 shadow-xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded bg-primary/10 text-primary border border-primary/30">
            <Zap className="size-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm tracking-tight">PORTFOLIO EVENT RISK MAP</h3>
            <span className="text-[11px] text-muted-foreground">Interactive Wallet-to-Event Asset Sensitivity Topology</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Token Asset</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="size-2.5 rounded-full bg-destructive" />
            <span className="text-muted-foreground">High Risk Event</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="size-2.5 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Medium Risk</span>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] items-center">
        {/* SVG Node Network Graph Canvas */}
        <div className="relative min-h-[440px] w-full rounded-lg border border-border bg-background/80 p-2 overflow-hidden">
          <svg className="h-full w-full select-none" viewBox="0 0 780 460" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="highEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="medEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {EDGES.map((edge) => {
              const src = NODES.find((n) => n.id === edge.source);
              const tgt = NODES.find((n) => n.id === edge.target);
              if (!src || !tgt) return null;

              const isHighlighted = activeNode && (activeNode.id === edge.source || activeNode.id === edge.target);
              const gradientId = edge.riskType === "HIGH" ? "url(#highEdge)" : "url(#medEdge)";

              return (
                <g key={`${edge.source}-${edge.target}`}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={isHighlighted ? gradientId : "#D8D5CC"}
                    strokeWidth={isHighlighted ? 3 : 1.8}
                    strokeDasharray={isHighlighted ? "none" : "5 5"}
                    opacity={isHighlighted ? 1 : 0.4}
                  />
                  {/* Flow Particle */}
                  {isHighlighted && (
                    <circle r="4" fill={edge.riskType === "HIGH" ? "#DC2626" : "#1E40AF"}>
                      <animateMotion
                        path={`M ${src.x} ${src.y} L ${tgt.x} ${tgt.y}`}
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* Label */}
                  <rect
                    x={(src.x + tgt.x) / 2 - 28}
                    y={(src.y + tgt.y) / 2 - 10}
                    width="56"
                    height="18"
                    rx="4"
                    fill="#FAF9F5"
                    stroke="#D8D5CC"
                  />
                  <text
                    x={(src.x + tgt.x) / 2}
                    y={(src.y + tgt.y) / 2 + 2}
                    fill="#111111"
                    fontSize="9"
                    fontFamily="var(--font-geist-mono), monospace"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isHovered = hoveredId === node.id;
              const isActive = isSelected || isHovered;

              const strokeColor =
                node.type === "asset"
                  ? "#1E40AF"
                  : node.riskLevel === "HIGH"
                  ? "#DC2626"
                  : "#D97706";

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    setSelectedId(node.id);
                    if (onSelectNode) onSelectNode(node);
                  }}
                >
                  {/* Ping Animation for High Risk */}
                  {node.riskLevel === "HIGH" && (
                    <circle r="26" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.35" className="animate-ping" />
                  )}

                  {/* Node Outer Card Rect */}
                  <rect
                    x="-100"
                    y="-24"
                    width="200"
                    height="48"
                    rx="8"
                    fill="#FAF9F5"
                    stroke={strokeColor}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Left Indicator Pillar */}
                  <rect x="-100" y="-24" width="8" height="48" rx="4" fill={strokeColor} />

                  {/* Node Label Text */}
                  <text
                    x="-82"
                    y="-4"
                    fill="#111111"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {node.label}
                  </text>
                  <text
                    x="-82"
                    y="12"
                    fill="#64625A"
                    fontSize="9"
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {node.sublabel} • {node.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Detail Inspector Box */}
        <div className="flex flex-col justify-between rounded-lg border border-border bg-background p-5 font-mono text-xs shadow-sm min-h-[440px]">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <Badge variant={activeNode.riskLevel === "HIGH" ? "red" : activeNode.type === "asset" ? "blue" : "default"}>
                {activeNode.type === "asset" ? "WALLET ASSET" : `${activeNode.riskLevel} RISK EVENT`}
              </Badge>
              <span className="text-[10px] text-muted-foreground">NODE INSPECTOR</span>
            </div>

            <h4 className="mt-4 text-lg font-bold text-foreground tracking-tight">{activeNode.label}</h4>
            <p className="mt-1 text-xs text-primary font-semibold">{activeNode.sublabel}</p>

            <div className="mt-4 rounded border border-border bg-card p-3">
              <span className="text-[10px] uppercase text-muted-foreground">Holding Value / Implied Price</span>
              <p className="mt-1 text-2xl font-extrabold text-foreground">{activeNode.value}</p>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">{activeNode.detail}</p>

            {activeNode.correlation && (
              <div className="mt-4 rounded border border-primary/30 bg-primary/10 p-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Portfolio Correlation</span>
                  <span className="font-bold text-primary">{(activeNode.correlation * 100).toFixed(0)}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${activeNode.correlation * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <Button asChild className="w-full font-mono text-xs font-semibold">
              <a href="/app/markets/sol-220">
                Inspect Risk Market <ArrowRight className="ml-1.5 size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
