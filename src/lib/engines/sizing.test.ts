import { describe, expect, it } from "vitest";
import { calculateSuggestedSize } from "./sizing";

describe("calculateSuggestedSize", () => {
  it("caps suggested trade size by policy after liquidity and confidence adjustments", () => {
    const size = calculateSuggestedSize({
      portfolioValue: 48_600,
      marketProbability: 56,
      parallaxProbability: 67,
      confidence: 81,
      eventCorrelation: 0.74,
      liquidityScore: 0.62,
      maxPositionUsd: 65,
      dailyRiskBudgetUsd: 150,
    });

    expect(size.rawModelUsd).toBe(317);
    expect(size.liquidityAdjustedUsd).toBe(186);
    expect(size.finalUsd).toBe(65);
    expect(size.policyLimited).toBe(true);
  });
});
