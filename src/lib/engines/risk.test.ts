import { describe, expect, it } from "vitest";
import { calculatePxRisk } from "./risk";

describe("calculatePxRisk", () => {
  it("calculates a transparent PX Risk score and level", () => {
    const risk = calculatePxRisk({
      concentration: 82,
      volatility: 68,
      eventSensitivity: 76,
      correlation: 71,
      liquidity: 38,
      protection: 14,
      confidence: 81,
    });

    expect(risk.score).toBe(72);
    expect(risk.level).toBe("HIGH");
    expect(risk.components.protection).toBe(14);
  });
});
