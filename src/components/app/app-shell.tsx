"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Brain,
  ChartCandlestick,
  Gauge,
  History,
  LayoutDashboard,
  WalletCards,
} from "lucide-react";
import { ParallaxLogo } from "@/components/brand/parallax-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pxRisk, wallet } from "@/lib/domain/demo-data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/app/risk", label: "Risk", icon: Gauge },
  { href: "/app/agents", label: "Agents", icon: Brain },
  { href: "/app/positions", label: "Positions", icon: WalletCards },
  { href: "/app/replay", label: "Replay", icon: History },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[100dvh] bg-background bg-[url('/obsidian-field.svg')] bg-cover bg-fixed bg-center">
      <aside className="fixed left-0 top-0 z-40 hidden h-dvh w-72 border-r border-border bg-background/78 p-4 backdrop-blur lg:block">
        <ParallaxLogo />
        <nav className="mt-8 grid gap-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md border border-transparent px-3 py-3 text-sm font-medium text-muted-foreground transition hover:border-border hover:bg-background hover:text-foreground",
                  active && "border-primary bg-primary/12 text-foreground shadow-[0_0_24px_rgba(36,88,255,0.2)]",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-md border border-border bg-card/82 p-4">
          <div className="flex items-center justify-between">
            <Badge variant="lime">Connected</Badge>
            <Activity className="size-4 text-primary" />
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{wallet.address}</p>
          <p className="mt-2 text-2xl font-semibold">${wallet.portfolioValue.toLocaleString()}</p>
          <p className="mt-3 text-sm text-muted-foreground">PX Risk {pxRisk.score} {pxRisk.level}</p>
        </div>
      </aside>
      <header className="sticky top-0 z-30 border-b border-border bg-background/88 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <ParallaxLogo />
          <Button asChild variant="outline" size="sm">
            <Link href="/">Home</Link>
          </Button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-card/82 px-3 py-2 text-xs font-medium"
            >
              <item.icon className="size-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="lg:pl-72">
        <div className="mx-auto max-w-[1500px] px-4 py-5 lg:px-6">{children}</div>
      </main>
    </div>
  );
}
