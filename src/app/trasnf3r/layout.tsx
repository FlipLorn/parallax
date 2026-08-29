import type { ReactNode } from "react";
import SolanaProvider from "@/components/solana-provider";

export default function Trasnf3rLayout({ children }: { children: ReactNode }) {
  return <SolanaProvider>{children}</SolanaProvider>;
}
