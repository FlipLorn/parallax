# Parallax Research Notes

Date: 2026-08-29

This note captures primary-source groundwork before design begins. It should be revisited after component libraries are provided and before implementation.

## Sources

- Jupiter user docs, Prediction Markets: https://docs.jup.ag/user-docs/trade/predict
- Jupiter developer docs, About Prediction: https://developers.jup.ag/docs/prediction
- Jupiter developer guide, How to Build a Prediction Market App on Solana: https://developers.jup.ag/docs/guides/how-to-build-a-prediction-market-app-on-solana
- Jupiter Prediction API reference, Get Events: https://developers.jup.ag/docs/api-reference/prediction/get-events
- Jupiter Prediction API reference, Get Orderbook: https://developers.jup.ag/docs/api-reference/prediction/get-orderbook
- Jupiter Forecast docs: https://developers.jup.ag/docs/prediction/forecast
- Jupiter Portfolio user docs: https://docs.jup.ag/user-docs/manage/portfolio
- Helius DAS API, getAssetsByOwner: https://www.helius.dev/docs/api-reference/das/getassetsbyowner
- Helius DAS API overview: https://www.helius.dev/docs/das-api
- Helius Wallet API overview: https://www.helius.dev/docs/wallet-api/overview
- Helius webhooks: https://www.helius.dev/docs/webhooks
- Helius Enhanced Transactions overview: https://www.helius.dev/docs/api-reference/enhanced-transactions/overview
- Helius Parsed Events: https://www.helius.dev/docs/parsed-events
- Solana frontend docs: https://solana.com/docs/frontend
- Solana wallet React cookbook: https://solana.com/developers/cookbook/wallets/connect-wallet-react
- Wallet Standard: https://github.com/wallet-standard/wallet-standard
- Anza Wallet Standard: https://github.com/anza-xyz/wallet-standard
- Polymarket Predictions API overview: https://docs.polymarket.com/api-reference/predictions/overview
- Polymarket prices and order book concepts: https://docs.polymarket.com/concepts/prices-orderbook
- Polymarket order lifecycle concepts: https://docs.polymarket.com/concepts/order-lifecycle
- Polymarket realtime data docs: https://docs.polymarket.com/market-data/realtime-data
- CFTC prediction markets explainer: https://www.cftc.gov/LearnandProtect/PredictionMarkets
- CFTC virtual currency risk advisory: https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html
- FINRA day-trading risk disclosure rule: https://www.finra.org/rules-guidance/rulebooks/finra-rules/2270
- FINRA stop-order guidance: https://www.finra.org/rules-guidance/notices/16-19
- CFPB dark-pattern circular: https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2023-01-unlawful-negative-option-marketing-practices/

## Technical Findings

- Jupiter Predict is a prediction market experience on Solana with YES/NO contracts for real-world events. Jupiter docs describe winning contracts as paying $1 worth of the settlement asset, while losing contracts can expire worthless.
- Jupiter developer docs state the Prediction Market API is beta and subject to breaking changes. Treat the integration as an adapter boundary, not as UI-coupled fetch calls.
- Jupiter Prediction API base URL is `https://api.jup.ag/prediction/v1`. The guide lists endpoints for events, event search, market detail, order creation, order status, positions, closing positions, and claiming payouts.
- Jupiter docs state all Prediction API requests require an `x-api-key` header. API calls that require this key should run server-side only.
- Jupiter docs state U.S. and South Korea IPs are restricted from the Prediction Market API. The app must support deterministic demo mode and jurisdiction/error states instead of promising live trading everywhere.
- Jupiter execution should be modeled as an order lifecycle: create order, receive or build an unsigned transaction, sign client-side, execute or submit, poll status, then convert confirmed fills into positions.
- Jupiter Forecast currently documents short-window BTC/SOL-style forecast markets through a specific provider path. Treat those as a separate market source under the same `PredictionProvider` abstraction.
- Jupiter and Helius numeric fields can arrive as strings or base-unit values. Use integer-safe parsing with `BigInt` or a decimal library rather than normal JS number arithmetic for balances, contract counts, prices, fees, and PnL.
- Jupiter docs describe market prices as implied probability, not certainty. UX should label market numbers as market-implied and include liquidity/spread caveats where actions are proposed.
- Helius DAS `getAssetsByOwner` retrieves Solana NFTs, compressed NFTs, and fungible tokens owned by an address with pagination. Helius DAS also supports fungible token data and may return verified token price info where available.
- Helius Wallet API may simplify portfolio/history work, but it is marked beta. Enhanced Transactions should be treated cautiously because the research pass found it in legacy maintenance mode.
- Helius webhooks are useful for wallet/order/settlement updates, but handlers must be idempotent because webhook delivery can retry.
- Solana frontend docs now recommend `@solana/kit` and Wallet Standard discovery for new work, while acknowledging many apps still use `@solana/web3.js` v1 and wallet-adapter packages. Stack selection should consider compatibility with the provided component libraries.
- Wallet integration should model discovered wallets, account selection, connection, signing, transaction submission, disconnect, and error states. Do not hardcode one wallet as the only path.
- Polymarket exposes separate APIs for discovery/metadata, CLOB state/trading, account activity, relayer submission, realtime streams, and bridging. If Parallax consumes Polymarket-sourced market concepts through Jupiter, keep Polymarket-specific concepts behind provider normalization.

## Product Implications

- The product should not promise that Parallax can always execute trades live. It should show `live`, `demo`, `restricted`, `delayed`, and `unavailable` states clearly.
- The prediction adapter should normalize events, markets, pricing, orderbooks, quotes, positions, settlements, and claim actions into Parallax types.
- Because the Jupiter Prediction API is beta, every API response should be parsed/validated before entering app state.
- Recommendation UX must show maximum loss, maximum payout, fees, timestamp, quote status, and simulation result before the user signs.
- Order entry should show best bid, best ask, spread, depth, min order size, tick size, and whether an order may partially fill or rest when those fields are available.
- Market orders need a visible execution-price caveat because displayed probability can differ from final fill when liquidity or spread moves.
- Wallet UX needs explicit states for disconnected, connecting, connected, wrong account, signing required, pending, confirmed, failed, restricted, and demo.
- Demo mode is not a fallback flourish. It is core demo infrastructure because credentials, geography, liquidity, or beta API changes can block live trading.
- Forecast and sizing must remain deterministic. AI agents can produce structured signals and evidence summaries, but engines decide probability aggregation, risk scoring, and suggested size.
- Avoid game-like trading nudges: no streaks, confetti, urgency copy, profit-forward defaults, or dark-pattern defaults. The interaction should be calm, reversible where possible, and disclosure-rich.

## Open Questions For After Components Arrive

- Which provided components are strong enough for the graph, market detail chart, replay timeline, command palette, and transaction progression?
- Do the components imply a React, Next.js, Vite, or other stack?
- Is there a supplied charting or graph library, or should the implementation add a focused dependency such as Recharts, Visx, React Flow, or D3?
- Should the first implementation prioritize wallet-adapter compatibility or newer `@solana/kit` patterns?
- Will the hackathon demo run from a U.S. IP? If yes, live Jupiter Prediction API trading must be treated as unavailable and demo execution should be the main path.
- What custody stance is intended: non-custodial wallet signing, embedded wallets, delegated/session keys, or backend-assisted transaction building?
- Is the first hackathon demo meant to support real-money execution, simulated/paper execution, or analytics-only with transaction preview?
