"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  const [buttonText, setButtonText] = useState("LAUNCH APP →");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        setButtonText("LAUNCH APP →");
      } else if (scrollY < 1600) {
        setButtonText("ANALYZE MY WALLET →");
      } else if (scrollY < 2600) {
        setButtonText("SEE MY EVENT RISK →");
      } else {
        setButtonText("OPEN PARALLAX →");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A2029] bg-[#070A0E]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Left: Custom Parallax Mark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/parallax-mark.svg"
            alt="Parallax Logo Mark"
            className="size-7 rounded group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-mono text-sm font-bold tracking-wider text-[#F1F0EA]">PARALLAX</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 md:flex font-mono text-xs font-medium text-[#9398A2]">
          <a href="#hero" className="hover:text-[#F1F0EA] transition-colors">
            Risk Exposure
          </a>
          <a href="#exposure" className="hover:text-[#F1F0EA] transition-colors">
            Architecture
          </a>
          <a href="#intelligence" className="hover:text-[#F1F0EA] transition-colors">
            AI Quorum
          </a>
        </nav>

        {/* Right: Dynamic Contextual CTA Button */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="font-mono text-xs font-bold bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-5 transition-all"
          >
            <Link href="/app">{buttonText}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
