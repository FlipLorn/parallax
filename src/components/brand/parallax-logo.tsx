import Link from "next/link";
import { DitheredLogo } from "@/components/ui/dithered-logo";
import { cn } from "@/lib/utils";

export function ParallaxLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Parallax home">
      <span className="grid size-12 place-items-center rounded-md border border-border bg-background/70">
        <DitheredLogo
          imageSrc="/parallax-mark.svg"
          className="size-10"
          gridSize={68}
          scale={0.8}
          dotScale={0.82}
          threshold={72}
        />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold uppercase tracking-[0.16em]">Parallax</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          event risk terminal
        </span>
      </span>
    </Link>
  );
}
