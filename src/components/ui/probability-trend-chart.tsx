"use client";

import React, { useState } from "react";
import { TrendingUp, Calendar, Info, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TrendPoint {
  date: string;
  marketProb: number;
  parallaxProb: number;
  onchainProb: number;
  eventNote?: string;
}

const DEFAULT_POINTS: TrendPoint[] = [
  { date: "Aug 01", marketProb: 42, parallaxProb: 52, onchainProb: 55, eventNote: "Validator stake inflows accelerated (+8%)" },
  { date: "Aug 08", marketProb: 46, parallaxProb: 58, onchainProb: 62, eventNote: "SEC ETF filing commentary published" },
  { date: "Aug 15", marketProb: 50, parallaxProb: 61, onchainProb: 66, eventNote: "Solana DEX volume reached $1.8B" },
  { date: "Aug 22", marketProb: 54, parallaxProb: 65, onchainProb: 70, eventNote: "Jupiter route liquidity depth expanded" },
  { date: "Aug 29", marketProb: 56, parallaxProb: 67, onchainProb: 72, eventNote: "Current live market pricing & AI quorum" },
];

export function ProbabilityTrendChart({
  points = DEFAULT_POINTS,
  title = "Probability History & Model Divergence (30D)",
}: {
  points?: TrendPoint[];
  title?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(points.length - 1);
  const [activeRange, setActiveRange] = useState<"24H" | "7D" | "30D" | "ALL">("30D");

  const activePoint = points[hoveredIdx ?? points.length - 1];
  const edge = activePoint.parallaxProb - activePoint.marketProb;

  // SVG coordinate calculations
  const width = 680;
  const height = 220;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 20;
  const paddingRight = 20;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getX = (idx: number) => paddingLeft + (idx / (points.length - 1)) * chartW;
  const getY = (prob: number) => paddingTop + chartH - (prob / 100) * chartH;

  const marketPath = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(pt.marketProb)}`).join(" ");
  const parallaxPath = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(pt.parallaxProb)}`).join(" ");
  const onchainPath = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(pt.onchainProb)}`).join(" ");

  // Closed area path for gradient fill
  const parallaxAreaPath = `${parallaxPath} L ${getX(points.length - 1)} ${height - paddingBottom} L ${getX(0)} ${height - paddingBottom} Z`;

  return (
    <div className="rounded-lg border border-border bg-card/90 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {(["24H", "7D", "30D", "ALL"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded px-2 py-0.5 transition-colors ${
                activeRange === r
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart area */}
      <div className="relative mt-4 h-[240px] w-full">
        <svg className="h-full w-full select-none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="parallaxGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80].map((level) => (
            <g key={level}>
              <line
                x1={paddingLeft}
                y1={getY(level)}
                x2={width - paddingRight}
                y2={getY(level)}
                stroke="#D8D5CC"
                strokeDasharray="3 3"
                opacity="0.8"
              />
              <text
                x={paddingLeft - 8}
                y={getY(level) + 3}
                fill="#64625A"
                fontSize="9"
                fontFamily="var(--font-geist-mono), monospace"
                textAnchor="end"
              >
                {level}%
              </text>
            </g>
          ))}

          {/* Area Fill Gradient */}
          <path d={parallaxAreaPath} fill="url(#parallaxGlow)" />

          {/* Paths */}
          <path d={marketPath} fill="none" stroke="#51504B" strokeWidth="2" strokeDasharray="4 4" />
          <path d={onchainPath} fill="none" stroke="#16A34A" strokeWidth="1.8" opacity="0.8" />
          <path d={parallaxPath} fill="none" stroke="#1E40AF" strokeWidth="3" />

          {/* Interactive points */}
          {points.map((pt, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} className="cursor-pointer">
                {/* Vertical cursor guide line */}
                {isHovered && (
                  <line
                    x1={getX(i)}
                    y1={paddingTop}
                    x2={getX(i)}
                    y2={height - paddingBottom}
                    stroke="#1E40AF"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                <circle
                  cx={getX(i)}
                  cy={getY(pt.parallaxProb)}
                  r={isHovered ? 6 : 4}
                  fill="#FAF9F5"
                  stroke="#1E40AF"
                  strokeWidth={isHovered ? 3 : 2}
                />
                <circle
                  cx={getX(i)}
                  cy={getY(pt.marketProb)}
                  r={isHovered ? 5 : 3.5}
                  fill="#FAF9F5"
                  stroke="#64625A"
                  strokeWidth="1.5"
                />

                {/* X axis date label */}
                <text
                  x={getX(i)}
                  y={height - 8}
                  fill={isHovered ? "#111111" : "#64625A"}
                  fontSize="9"
                  fontFamily="var(--font-geist-mono), monospace"
                  textAnchor="middle"
                  fontWeight={isHovered ? "600" : "400"}
                >
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip & Crosshair Details */}
      <div className="mt-4 grid gap-3 rounded border border-border bg-background/90 p-3.5 sm:grid-cols-4 font-mono text-xs">
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Snapshot Date</span>
          <p className="mt-1 font-semibold text-foreground">{activePoint.date}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Market Implied</span>
          <p className="mt-1 font-semibold text-foreground">{activePoint.marketProb}%</p>
        </div>
        <div>
          <span className="text-[10px] uppercase text-primary">Parallax Forecast</span>
          <p className="mt-1 font-semibold text-primary">{activePoint.parallaxProb}%</p>
        </div>
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Model Edge</span>
          <p className={`mt-1 font-semibold ${edge > 0 ? "text-emerald-400" : "text-destructive"}`}>
            {edge > 0 ? `+${edge.toFixed(1)}pt` : `${edge.toFixed(1)}pt`}
          </p>
        </div>
      </div>

      {activePoint.eventNote && (
        <div className="mt-3 font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Info className="size-3.5 text-primary" /> {activePoint.eventNote}
        </div>
      )}
    </div>
  );
}
