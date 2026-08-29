import { describe, expect, it } from "vitest";
import { calculateForecast } from "./forecast";

describe("calculateForecast", () => {
  it("combines market baseline with weighted specialist signals", () => {
    const forecast = calculateForecast({
      marketProbability: 56,
      signals: [
        { agentId: "onchain", probability: 72, confidence: 84 },
        { agentId: "macro", probability: 53, confidence: 69 },
        { agentId: "news", probability: 66, confidence: 78 },
        { agentId: "quant", probability: 63, confidence: 81 },
      ],
    });

    expect(forecast.parallaxProbability).toBe(65.8);
    expect(forecast.edge).toBe(9.8);
    expect(forecast.confidence).toBe(79);
    expect(forecast.contributions[0]?.agentId).toBe("onchain");
  });
});
