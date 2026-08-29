export interface SizingInput {
  portfolioValue: number;
  marketProbability: number;
  parallaxProbability: number;
  confidence: number;
  eventCorrelation: number;
  liquidityScore: number;
  maxPositionUsd: number;
  dailyRiskBudgetUsd: number;
}

export interface SizingResult {
  rawModelUsd: number;
  liquidityAdjustedUsd: number;
  finalUsd: number;
  policyLimited: boolean;
}

const TEMPERED_KELLY = 0.0988;
const LIQUIDITY_HAIRCUT = 0.947;

export function calculateSuggestedSize(input: SizingInput): SizingResult {
  const edge = Math.abs(input.parallaxProbability - input.marketProbability);
  const confidence = input.confidence / 100;
  const rawModelUsd = Math.round(
    input.portfolioValue *
      (edge / 100) *
      confidence *
      input.eventCorrelation *
      TEMPERED_KELLY,
  );
  const liquidityAdjustedUsd = Math.round(
    rawModelUsd * input.liquidityScore * LIQUIDITY_HAIRCUT,
  );
  const policyCap = Math.min(input.maxPositionUsd, input.dailyRiskBudgetUsd);
  const finalUsd = Math.min(liquidityAdjustedUsd, policyCap);

  return {
    rawModelUsd,
    liquidityAdjustedUsd,
    finalUsd,
    policyLimited: finalUsd < liquidityAdjustedUsd,
  };
}
