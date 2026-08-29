import { describe, expect, it } from "vitest";
import { classifyRecommendation } from "./recommendation";

describe("classifyRecommendation", () => {
  it("classifies high exposure downside hedges as protection", () => {
    expect(
      classifyRecommendation({
        exposure: "HIGH",
        edge: -11,
        confidence: 82,
        liquidityScore: 0.76,
        hedgeAvailable: true,
      }),
    ).toBe("PROTECTION");
  });

  it("classifies high-confidence positive edge as opportunity", () => {
    expect(
      classifyRecommendation({
        exposure: "MEDIUM",
        edge: 12,
        confidence: 84,
        liquidityScore: 0.7,
        hedgeAvailable: false,
      }),
    ).toBe("OPPORTUNITY");
  });
});
