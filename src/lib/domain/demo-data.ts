import type {
  AgentSignal,
  AssetExposure,
  CommandResult,
  EventRisk,
  Market,
  Position,
  ReplayEvent,
  TransactionStep,
  UserRiskPolicy,
  WalletProfile,
} from "@/lib/domain/types";
import { calculateForecast } from "@/lib/engines/forecast";
import { calculatePxRisk } from "@/lib/engines/risk";
import { calculateSuggestedSize } from "@/lib/engines/sizing";

export const walletProfiles: WalletProfile[] = [
  {
    id: "sol_whale",
    name: "SOL Maxi / Whale",
    address: "DX7p...a91Q",
    portfolioValue: 48600,
    description: "Dominant SOL holding with JUP secondary allocation and cash buffer.",
    assets: [
      { symbol: "SOL", name: "Solana", quantity: 286.4, valueUsd: 38750, portfolioWeight: 79.7, betaToSol: 1.0 },
      { symbol: "JUP", name: "Jupiter", quantity: 4920, valueUsd: 5658, portfolioWeight: 11.6, betaToSol: 1.24 },
      { symbol: "USDC", name: "Cash buffer", quantity: 4192, valueUsd: 4192, portfolioWeight: 8.7, betaToSol: 0.0 },
    ],
  },
  {
    id: "defi_yield",
    name: "DeFi Yield Optimizer",
    address: "7xKP...9m2L",
    portfolioValue: 124500,
    description: "Heavy DEX and liquidity pool exposure sensitive to protocol outages & volume.",
    assets: [
      { symbol: "JUP", name: "Jupiter", quantity: 48600, valueUsd: 56037, portfolioWeight: 45.0, betaToSol: 1.24 },
      { symbol: "RAY", name: "Raydium", quantity: 24500, valueUsd: 43575, portfolioWeight: 35.0, betaToSol: 1.42 },
      { symbol: "SOL", name: "Solana", quantity: 184.2, valueUsd: 24888, portfolioWeight: 20.0, betaToSol: 1.0 },
    ],
  },
  {
    id: "degen_trader",
    name: "Degen Event Trader",
    address: "3bQW...1k8P",
    portfolioValue: 22800,
    description: "High beta memecoin & speculative ecosystem leverage.",
    assets: [
      { symbol: "BONK", name: "Bonk Inu", quantity: 450000000, valueUsd: 13680, portfolioWeight: 60.0, betaToSol: 2.1 },
      { symbol: "WIF", name: "dogwifhat", quantity: 3100, valueUsd: 6840, portfolioWeight: 30.0, betaToSol: 1.85 },
      { symbol: "SOL", name: "Solana", quantity: 16.9, valueUsd: 2280, portfolioWeight: 10.0, betaToSol: 1.0 },
    ],
  },
  {
    id: "solana_treasury",
    name: "Solana Ecosystem Treasury",
    address: "9rTZ...4v6M",
    portfolioValue: 500000,
    description: "Conservative cash reserves with core ecosystem staking buffer.",
    assets: [
      { symbol: "USDC", name: "USD Coin", quantity: 350000, valueUsd: 350000, portfolioWeight: 70.0, betaToSol: 0.0 },
      { symbol: "SOL", name: "Staked SOL", quantity: 1111.1, valueUsd: 150000, portfolioWeight: 30.0, betaToSol: 1.0 },
    ],
  },
];

export const wallet = {
  address: walletProfiles[0].address,
  portfolioValue: walletProfiles[0].portfolioValue,
  connected: true,
  network: "Solana mainnet beta",
};

export const assets: AssetExposure[] = walletProfiles[0].assets;

export const agentSignals: AgentSignal[] = [
  {
    agentId: "onchain",
    label: "Onchain flow",
    probability: 72,
    confidence: 84,
    direction: "BULLISH",
    strength: 82,
    signal: "Validator inflows and DEX routing depth improved for three consecutive sessions.",
    evidence: ["Stake-weighted liquidity +11%", "Priority fee pressure easing", "Jupiter route depth stable"],
    brierScore: 0.128,
  },
  {
    agentId: "quant",
    label: "Quant regime",
    probability: 63,
    confidence: 81,
    direction: "BULLISH",
    strength: 71,
    signal: "Momentum remains constructive, but realized vol is still outside comfort zone.",
    evidence: ["Trend z-score 1.8", "Vol percentile 68", "Correlation cluster elevated"],
    brierScore: 0.151,
  },
  {
    agentId: "news",
    label: "News impact",
    probability: 66,
    confidence: 78,
    direction: "BULLISH",
    strength: 76,
    signal: "Headline velocity favors expansion, with ETF flows carrying most of the lift.",
    evidence: ["ETF inflow streak", "Protocol outage risk low", "Policy attention moderate"],
    brierScore: 0.164,
  },
  {
    agentId: "macro",
    label: "Macro tape",
    probability: 53,
    confidence: 69,
    direction: "NEUTRAL",
    strength: 49,
    signal: "Rates and dollar pressure are not hostile, but not supportive enough to chase aggressively.",
    evidence: ["DXY flat", "Risk assets mixed", "Liquidity impulse neutral"],
    brierScore: 0.186,
  },
];

const forecast = calculateForecast({
  marketProbability: 56,
  signals: [
    { agentId: "onchain", probability: 72, confidence: 84 },
    { agentId: "macro", probability: 53, confidence: 69 },
    { agentId: "news", probability: 66, confidence: 78 },
    { agentId: "quant", probability: 63, confidence: 81 },
  ],
});

export const pxRisk = calculatePxRisk({
  concentration: 82,
  volatility: 68,
  eventSensitivity: 76,
  correlation: 71,
  liquidity: 38,
  protection: 14,
  confidence: 81,
});

export const positionSizing = calculateSuggestedSize({
  portfolioValue: wallet.portfolioValue,
  marketProbability: 56,
  parallaxProbability: 67,
  confidence: 81,
  eventCorrelation: 0.74,
  liquidityScore: 0.62,
  maxPositionUsd: 65,
  dailyRiskBudgetUsd: 150,
});

export const markets: Market[] = [
  {
    id: "sol-220",
    eventId: "evt-sol-aug",
    title: "SOL above $220 by Friday close",
    closeDate: "2026-09-04",
    category: "crypto",
    marketProbability: 56,
    parallaxProbability: forecast.parallaxProbability,
    volumeUsd: 912400,
    liquidityScore: 0.62,
    exposure: "HIGH",
    classification: "PROTECTION",
    change24h: 4.2,
    bestBidCents: 55,
    bestAskCents: 57,
    orderbook: [
      { priceCents: 52, volumeUsd: 12500, side: "YES" },
      { priceCents: 54, volumeUsd: 28400, side: "YES" },
      { priceCents: 56, volumeUsd: 41200, side: "YES" },
      { priceCents: 58, volumeUsd: 38900, side: "NO" },
      { priceCents: 60, volumeUsd: 19500, side: "NO" },
    ],
  },
  {
    id: "jup-2b",
    eventId: "evt-jup-swap",
    title: "Jupiter daily swap volume above $2B",
    closeDate: "2026-09-02",
    category: "crypto",
    marketProbability: 41,
    parallaxProbability: 53.4,
    volumeUsd: 288000,
    liquidityScore: 0.54,
    exposure: "MEDIUM",
    classification: "OPPORTUNITY",
    change24h: -2.1,
    bestBidCents: 40,
    bestAskCents: 42,
    orderbook: [
      { priceCents: 38, volumeUsd: 8200, side: "YES" },
      { priceCents: 41, volumeUsd: 14600, side: "YES" },
      { priceCents: 43, volumeUsd: 22100, side: "NO" },
    ],
  },
  {
    id: "fed-hold",
    eventId: "evt-fed-sep",
    title: "Fed holds target rate at next meeting",
    closeDate: "2026-09-16",
    category: "macro",
    marketProbability: 68,
    parallaxProbability: 64.1,
    volumeUsd: 1510000,
    liquidityScore: 0.78,
    exposure: "MEDIUM",
    classification: "WATCH",
    change24h: 0.8,
    bestBidCents: 67,
    bestAskCents: 69,
    orderbook: [
      { priceCents: 65, volumeUsd: 45000, side: "YES" },
      { priceCents: 68, volumeUsd: 92000, side: "YES" },
      { priceCents: 70, volumeUsd: 81000, side: "NO" },
    ],
  },
  {
    id: "sol-outage",
    eventId: "evt-sol-uptime",
    title: "No Solana major outage before October",
    closeDate: "2026-10-01",
    category: "tech",
    marketProbability: 88,
    parallaxProbability: 91.2,
    volumeUsd: 734000,
    liquidityScore: 0.66,
    exposure: "HIGH",
    classification: "WATCH",
    change24h: 1.5,
    bestBidCents: 87,
    bestAskCents: 89,
    orderbook: [
      { priceCents: 86, volumeUsd: 31000, side: "YES" },
      { priceCents: 88, volumeUsd: 65000, side: "YES" },
      { priceCents: 90, volumeUsd: 42000, side: "NO" },
    ],
  },
];

export const eventRisks: EventRisk[] = [
  {
    id: "risk-sol-220",
    title: "High SOL concentration makes this market your largest directional exposure.",
    marketId: "sol-220",
    exposureUsd: 38680,
    sensitivity: "HIGH",
    correlation: 0.74,
    expectedMagnitude: 8.6,
    modelConfidence: 81,
  },
  {
    id: "risk-jup-volume",
    title: "JUP allocation benefits if route volume expands, but orderbook depth is thin.",
    marketId: "jup-2b",
    exposureUsd: 5658,
    sensitivity: "MEDIUM",
    correlation: 0.49,
    expectedMagnitude: 5.1,
    modelConfidence: 76,
  },
  {
    id: "risk-fed",
    title: "Macro interest rate decision moves SOL beta via broader risk appetite.",
    marketId: "fed-hold",
    exposureUsd: 44408,
    sensitivity: "MEDIUM",
    correlation: 0.43,
    expectedMagnitude: 4.4,
    modelConfidence: 69,
  },
];

export const positions: Position[] = [
  {
    id: "pos-481",
    marketId: "sol-220",
    side: "NO",
    shares: 65,
    entryProbability: 58,
    currentProbability: 56,
    costUsd: 65,
    maxPayoutUsd: 116,
    pnlUsd: 3.8,
    status: "ACTIVE",
    hedgeEfficiencyRatio: 18.4,
  },
  {
    id: "pos-219",
    marketId: "jup-2b",
    side: "YES",
    shares: 48,
    entryProbability: 38,
    currentProbability: 41,
    costUsd: 42,
    maxPayoutUsd: 103,
    pnlUsd: 5.1,
    status: "WATCH",
    hedgeEfficiencyRatio: 11.2,
  },
];

export const riskPolicy: UserRiskPolicy = {
  maxPositionUsd: 65,
  dailyRiskBudgetUsd: 150,
  allowedCategories: ["crypto", "macro", "tech"],
  autoResearch: true,
  autoForecast: true,
  autoRecommend: true,
  autoSimulate: true,
  executeMode: "USER_SIGNATURE",
};

export const replayEvents: ReplayEvent[] = [
  {
    id: "replay-1",
    title: "SOL above $200 in Q3",
    marketId: "sol-220",
    outcome: "YES",
    resolvedDate: "2026-08-15",
    brierScore: 0.067,
    pnlUsd: 84.5,
    points: [
      { date: "2026-08-01", marketProbability: 42, parallaxProbability: 57, signal: "ETF probability rose sharply", agentId: "news" },
      { date: "2026-08-08", marketProbability: 49, parallaxProbability: 64, signal: "Onchain momentum accelerated", agentId: "onchain" },
      { date: "2026-08-12", marketProbability: 71, parallaxProbability: 74, signal: "Quant regime confirmed trend", agentId: "quant" },
      { date: "2026-08-15", marketProbability: 100, parallaxProbability: 100, signal: "Market resolved YES", agentId: "risk" },
    ],
  },
  {
    id: "replay-2",
    title: "JUP LFG DAO Staking Vote > 75%",
    marketId: "jup-2b",
    outcome: "YES",
    resolvedDate: "2026-07-28",
    brierScore: 0.082,
    pnlUsd: 46.0,
    points: [
      { date: "2026-07-15", marketProbability: 38, parallaxProbability: 48, signal: "Governance forum sentiment positive", agentId: "news" },
      { date: "2026-07-22", marketProbability: 52, parallaxProbability: 61, signal: "Validator pledge volume passed threshold", agentId: "onchain" },
      { date: "2026-07-28", marketProbability: 100, parallaxProbability: 100, signal: "Vote passed successfully", agentId: "risk" },
    ],
  },
];

export const transactionSteps: Array<{ step: TransactionStep; label: string; complete: boolean }> = [
  { step: "PREPARING", label: "Load event and wallet exposure", complete: true },
  { step: "QUOTING", label: "Quote prediction market liquidity", complete: true },
  { step: "SIMULATING", label: "Simulate max loss and payout", complete: true },
  { step: "READY_TO_SIGN", label: "Build transaction preview", complete: true },
  { step: "WALLET", label: "User signs in wallet", complete: false },
  { step: "SUBMITTED", label: "Submit to Solana", complete: false },
  { step: "CONFIRMED", label: "Track position and alerts", complete: false },
];

export const launchSteps = [
  {
    label: "Connect",
    title: "Wallet state enters the model",
    body: "Read-only holdings and token metadata become an event exposure map.",
  },
  {
    label: "Interpret",
    title: "Agents debate the market",
    body: "Onchain, macro, news, and quant agents publish probability plus evidence.",
  },
  {
    label: "Constrain",
    title: "Risk policy controls size",
    body: "Parallax caps every suggestion by user limits before a transaction exists.",
  },
  {
    label: "Review",
    title: "Wallet signature stays last",
    body: "The app previews side, size, max loss, payout, fees, and confidence first.",
  },
];

export function parseAskCommand(query: string): CommandResult {
  const q = query.toLowerCase();
  if (q.includes("protect") || q.includes("downside") || q.includes("sol")) {
    return {
      query,
      summary: "Found high-relevance protection opportunity for SOL concentration. Buying 65 NO shares caps downside sensitivity by 18.4%.",
      recommendedMarketId: "sol-220",
      suggestedSide: "NO",
      suggestedUsd: 43,
      confidenceScore: 84,
    };
  }
  if (q.includes("opportunity") || q.includes("disagree") || q.includes("edge")) {
    return {
      query,
      summary: "Parallax AI quorum forecasts Jupiter swap volume at 53.4% vs market 41% (+12.4pt edge).",
      recommendedMarketId: "jup-2b",
      suggestedSide: "YES",
      suggestedUsd: 42,
      confidenceScore: 78,
    };
  }
  return {
    query,
    summary: `Analyzed "${query}". 3 material event risks detected across your portfolio holdings. Recommend reviewing SOL $220 protection.`,
    recommendedMarketId: "sol-220",
    suggestedSide: "NO",
    suggestedUsd: 43,
    confidenceScore: 81,
  };
}
