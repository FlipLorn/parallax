export interface ForecastSignalInput {
  agentId: "onchain" | "macro" | "news" | "quant";
  probability: number;
  confidence: number;
}

export interface ForecastInput {
  marketProbability: number;
  signals: ForecastSignalInput[];
}

export interface ForecastContribution {
  agentId: ForecastSignalInput["agentId"];
  weight: number;
  probability: number;
  confidence: number;
}

export interface ForecastResult {
  parallaxProbability: number;
  edge: number;
  confidence: number;
  contributions: ForecastContribution[];
}

const AGENT_WEIGHTS: Record<ForecastSignalInput["agentId"], number> = {
  onchain: 0.28,
  quant: 0.24,
  news: 0.16,
  macro: 0.14,
};

const round1 = (value: number) => Math.round(value * 10) / 10;

export function calculateForecast(input: ForecastInput): ForecastResult {
  const contributions = input.signals
    .map((signal) => ({
      agentId: signal.agentId,
      weight: AGENT_WEIGHTS[signal.agentId],
      probability: signal.probability,
      confidence: signal.confidence,
    }))
    .sort((a, b) => b.weight - a.weight);

  const totalWeight = contributions.reduce((sum, item) => sum + item.weight, 0);
  const weightedDelta = contributions.reduce(
    (sum, item) =>
      sum +
      (item.probability - input.marketProbability) *
        (item.weight / totalWeight),
    0,
  );
  const confidence =
    contributions.reduce(
      (sum, item) => sum + item.confidence * (item.weight / totalWeight),
      0,
    ) || 0;
  const disagreementBoost = Math.max(0, confidence - 70) * 0.087;
  const edge = round1(weightedDelta + disagreementBoost);

  return {
    parallaxProbability: round1(input.marketProbability + edge),
    edge,
    confidence: Math.floor(confidence),
    contributions,
  };
}
