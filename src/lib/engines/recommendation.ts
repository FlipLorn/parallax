import type { ExposureLevel, RecommendationKind } from "@/lib/domain/types";

export interface RecommendationInput {
  exposure: ExposureLevel;
  edge: number;
  confidence: number;
  liquidityScore: number;
  hedgeAvailable: boolean;
}

export function classifyRecommendation(
  input: RecommendationInput,
): RecommendationKind {
  const hasActionQuality = input.confidence >= 75 && input.liquidityScore >= 0.6;

  if (
    input.hedgeAvailable &&
    input.exposure === "HIGH" &&
    input.edge <= -8 &&
    hasActionQuality
  ) {
    return "PROTECTION";
  }

  if (input.edge >= 10 && hasActionQuality) {
    return "OPPORTUNITY";
  }

  return "WATCH";
}
