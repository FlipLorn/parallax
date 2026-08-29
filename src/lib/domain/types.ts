export type ExposureLevel = "LOW" | "MEDIUM" | "HIGH";
export type RecommendationKind = "PROTECTION" | "OPPORTUNITY" | "WATCH";
export type MarketSide = "YES" | "NO";
export type TransactionStep =
  | "PREPARING"
  | "QUOTING"
  | "SIMULATING"
  | "READY_TO_SIGN"
  | "WALLET"
  | "SUBMITTED"
  | "CONFIRMED";

export type ArchetypeId = "sol_whale" | "defi_yield" | "degen_trader" | "solana_treasury";

export interface WalletProfile {
  id: ArchetypeId;
  name: string;
  address: string;
  portfolioValue: number;
  description: string;
  assets: AssetExposure[];
}

export interface AssetExposure {
  symbol: string;
  name: string;
  quantity: number;
  valueUsd: number;
  portfolioWeight: number;
  betaToSol: number;
}

export interface AgentSignal {
  agentId: "portfolio" | "onchain" | "macro" | "news" | "quant" | "risk";
  label: string;
  probability: number;
  confidence: number;
  direction: "BULLISH" | "BEARISH" | "NEUTRAL";
  strength: number;
  signal: string;
  evidence: string[];
  brierScore: number;
}

export interface OrderbookDepthEntry {
  priceCents: number;
  volumeUsd: number;
  side: MarketSide;
}

export interface Market {
  id: string;
  eventId: string;
  title: string;
  closeDate: string;
  category: "crypto" | "macro" | "policy" | "tech";
  marketProbability: number;
  parallaxProbability: number;
  volumeUsd: number;
  liquidityScore: number;
  exposure: ExposureLevel;
  classification: RecommendationKind;
  change24h: number;
  bestBidCents?: number;
  bestAskCents?: number;
  orderbook?: OrderbookDepthEntry[];
}

export interface EventRisk {
  id: string;
  title: string;
  marketId: string;
  exposureUsd: number;
  sensitivity: ExposureLevel;
  correlation: number;
  expectedMagnitude: number;
  modelConfidence: number;
}

export interface Position {
  id: string;
  marketId: string;
  side: MarketSide;
  shares: number;
  entryProbability: number;
  currentProbability: number;
  costUsd: number;
  maxPayoutUsd: number;
  pnlUsd: number;
  status: "ACTIVE" | "WATCH" | "RESOLVED";
  hedgeEfficiencyRatio?: number;
}

export interface UserRiskPolicy {
  maxPositionUsd: number;
  dailyRiskBudgetUsd: number;
  allowedCategories: string[];
  autoResearch: boolean;
  autoForecast: boolean;
  autoRecommend: boolean;
  autoSimulate: boolean;
  executeMode: "USER_SIGNATURE";
}

export interface ReplayPoint {
  date: string;
  marketProbability: number;
  parallaxProbability: number;
  signal: string;
  agentId: string;
}

export interface ReplayEvent {
  id: string;
  title: string;
  marketId: string;
  outcome: "YES" | "NO";
  resolvedDate: string;
  brierScore: number;
  pnlUsd: number;
  points: ReplayPoint[];
}

export interface CommandResult {
  query: string;
  summary: string;
  recommendedMarketId?: string;
  suggestedSide?: MarketSide;
  suggestedUsd?: number;
  confidenceScore?: number;
}

