import { Connection } from "@solana/web3.js";

const DEFAULT_RPC = "https://api.mainnet-beta.solana.com";

export function getServerConnection() {
  return new Connection(process.env.SOLANA_RPC_URL ?? DEFAULT_RPC, "confirmed");
}

export function getClientRpcUrl() {
  return process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? DEFAULT_RPC;
}
