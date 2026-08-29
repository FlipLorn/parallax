export type PxRiskLevel = "LOW" | "MODERATE" | "HIGH" | "EXTREME";

export interface PxRiskInput {
  concentration: number;
  volatility: number;
  eventSensitivity: number;
  correlation: number;
  liquidity: number;
  protection: number;
  confidence: number;
}

export interface PxRiskResult {
  score: number;
  level: PxRiskLevel;
  components: PxRiskInput;
}

function levelFor(score: number): PxRiskLevel {
  if (score >= 85) return "EXTREME";
  if (score >= 65) return "HIGH";
  if (score >= 40) return "MODERATE";
  return "LOW";
}

export function calculatePxRisk(input: PxRiskInput): PxRiskResult {
  const unprotected = 100 - input.protection;
  const illiquidity = 100 - input.liquidity;
  const uncertainty = 100 - input.confidence;
  const score = Math.round(
    input.concentration * 0.22 +
      input.volatility * 0.12 +
      input.eventSensitivity * 0.24 +
      input.correlation * 0.16 +
      illiquidity * 0.08 +
      unprotected * 0.12 +
      uncertainty * 0.03,
  );

  return {
    score,
    level: levelFor(score),
    components: input,
  };
}
