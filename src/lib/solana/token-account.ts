import { PublicKey } from "@solana/web3.js";
import { getServerConnection } from "./connection";

export async function resolveTokenAccountForMint(owner: string, tokenMint: string) {
  const connection = getServerConnection();
  const accounts = await connection.getParsedTokenAccountsByOwner(new PublicKey(owner), {
    mint: new PublicKey(tokenMint),
  });

  const match = accounts.value.find((entry) => {
    const amount = entry.account.data.parsed.info.tokenAmount.uiAmount;
    return amount === 1;
  });

  return match?.pubkey.toBase58() ?? null;
}
