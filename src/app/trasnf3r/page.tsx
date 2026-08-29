import type { Metadata } from "next";
import { Suspense } from "react";
import Trasnf3rPanel from "@/components/trasnf3r-panel";

export const metadata: Metadata = {
  title: "trasnf3r",
  description: "Non-custodial Solana mainnet SOL transfer.",
  robots: { index: false, follow: false },
};

function Trasnf3rLoading() {
  return (
    <div
      id="trasnf3r-loading"
      data-testid="trasnf3r-loading"
      style={{
        margin: "0 auto",
        maxWidth: "36rem",
        padding: "4rem 1.5rem",
        fontFamily: "ui-monospace, monospace",
        fontSize: "0.875rem",
        opacity: 0.6,
      }}
    >
      Loading…
    </div>
  );
}

export default function Trasnf3rPage() {
  return (
    <Suspense fallback={<Trasnf3rLoading />}>
      <Trasnf3rPanel />
    </Suspense>
  );
}
