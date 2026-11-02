import { useEffect, useMemo, useState } from 'react';
import { rng } from '../utils';
import './MarketGame.css';

const ROUNDS = 10;
const WINDOW = 24; // candles on screen
const NOTIONAL = 10000; // $ per call
const W = 420;
const H = 240;
const PAD = 14;

const RANKS = {
  maker: { title: 'Market maker', line: 'You read the tape like a pro. The desk wants you.' },
  quant: { title: 'Quant', line: 'Positive P&L. Ship it to production (after a backtest).' },
  intern: { title: 'Intern', line: 'The market humbles everyone. Coffee run is on you.' },
};

// Each scenario shapes the walk: `drift(i, price, flip)` adds to candle i's return,
// `phi` is momentum (+) or mean reversion (−), `vol` is noise. Candles 24–33 are the ones you call.
// `flip` is a random ±1 per game, so direction-agnostic events can go either way.
const fair = (k) => (i, price) => -k * (price / 100 - 1);
const SCENARIOS = [
  { name: 'Bull run', blurb: 'A steady uptrend. Buying the dips paid.', phi: 0.2, vol: 0.01, drift: () => 0.0045 },
  { name: 'Bear market', blurb: 'Lower highs, lower lows. Rallies were for selling.', phi: 0.2, vol: 0.011, drift: () => -0.0045 },
  { name: 'Sideways range', blurb: 'Price kept snapping back to 100. Fade the edges.', phi: -0.2, vol: 0.009, drift: fair(0.25) },
  { name: 'V-shaped recovery', blurb: 'A sell-off that turned on a dime mid-game.', phi: 0.2, vol: 0.01, drift: (i) => (i < 27 ? -0.008 : 0.009) },
  {
    name: 'Breakout',
    blurb: 'A tight, quiet range, then the dam broke.',
    phi: 0.3,
    vol: (i) => (i < 24 ? 0.005 : 0.012),
    drift: (i, price, flip) => (i < 24 ? fair(0.3)(i, price) : 0.009 * flip),
  },
  { name: 'Pump & dump', blurb: 'Hype ran it up, then the early buyers cashed out.', phi: 0.2, vol: 0.012, drift: (i) => (i >= 16 && i < 27 ? 0.012 : i >= 27 ? -0.018 : 0) },
  {
    name: 'Earnings gap',
    blurb: 'Flat into the report, one big gap, then follow-through.',
    phi: 0.1,
    vol: 0.008,
    drift: (i, price, flip) => (i === 27 ? 0.07 * flip : i > 27 && i < 31 ? 0.006 * flip : 0),
  },
  { name: 'Flash crash', blurb: 'One brutal candle, then the bargain hunters showed up.', phi: 0.1, vol: 0.008, drift: (i) => (i === 28 ? -0.08 : i === 29 || i === 30 ? 0.025 : 0.001) },
  { name: 'Choppy tape', blurb: 'Every up day undone the next. Contrarians won.', phi: -0.6, vol: 0.013, drift: () => 0 },
  { name: 'Momentum', blurb: 'Moves kept going. Trend followers won.', phi: 0.65, vol: 0.009, drift: () => 0 },
  { name: 'Volatility storm', blurb: 'Huge swings, no direction. Pure nerve.', phi: 0, vol: 0.028, drift: () => 0 },
  { name: 'Dead-cat bounce', blurb: 'A relief rally inside a downtrend. It did not last.', phi: 0.2, vol: 0.01, drift: (i) => (i < 24 ? -0.006 : i < 27 ? 0.01 : -0.007) },
];

// Successive games step through every scenario before repeating (5 is coprime with 12)
const scenarioFor = (game) => SCENARIOS[(game * 5) % SCENARIOS.length];

function makeSeries(game) {
  const { phi, vol, drift } = scenarioFor(game);
  const rand = rng(game * 7919 + 13);
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  const flip = rand() < 0.5 ? -1 : 1;
  const candles = [];
  let price = 100;
  let prev = 0;
  for (let i = 0; i < WINDOW + ROUNDS; i += 1) {
    const sigma = typeof vol === 'function' ? vol(i) : vol;
    const r = phi * prev + drift(i, price, flip) + sigma * gauss();
    const open = price;
    const close = open * (1 + r);
    const wick = () => Math.abs(gauss()) * 0.005 * open;
    candles.push({ open, close, high: Math.max(open, close) + wick(), low: Math.min(open, close) - wick(), r });
    price = close;
    prev = r;
  }
  return candles;
}

const money = (v) => `${v < 0 ? '−' : '+'}$${Math.abs(Math.round(v)).toLocaleString()}`;

export default function MarketGame() {
  const [game, setGame] = useState(() => Date.now() % 100000);
  const [calls, setCalls] = useState([]); // { dir: 1 | -1, pnl }
  const [busy, setBusy] = useState(false);

  const series = useMemo(() => makeSeries(game), [game]);
  const scenario = scenarioFor(game);
  const round = calls.length;
  const done = round === ROUNDS;
  const visible = series.slice(round, WINDOW + round);
  const pnl = calls.reduce((sum, c) => sum + c.pnl, 0);
  const hits = calls.filter((c) => c.pnl > 0).length;
  let rank = RANKS.intern;
  if (pnl > 0) rank = hits >= 8 ? RANKS.maker : RANKS.quant;
  const lastCall = calls[round - 1];

  useEffect(() => {
    if (!busy) return undefined;
    const t = setTimeout(() => setBusy(false), 450);
    return () => clearTimeout(t);
  }, [busy]);

  const call = (dir) => {
    if (busy || done) return;
    const next = series[WINDOW + round];
    setCalls([...calls, { dir, pnl: dir * next.r * NOTIONAL }]);
    setBusy(true);
  };

  const restart = () => {
    setGame((g) => g + 1);
    setCalls([]);
  };

  // Scale to what's on screen
  const lo = Math.min(...visible.map((c) => c.low));
  const hi = Math.max(...visible.map((c) => c.high));
  const y = (v) => PAD + ((hi - v) / (hi - lo || 1)) * (H - 2 * PAD);
  const step = (W - 2 * PAD) / (WINDOW + 1); // last slot is the candle you're calling
  const x = (i) => PAD + step * (i + 0.5);

  const sma = visible.map((_, i) => {
    const from = series.slice(Math.max(0, round + i - 4), round + i + 1);
    return from.reduce((s, c) => s + c.close, 0) / from.length;
  });
  const smaPath = sma.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

  let message = 'Will the next candle close higher or lower?';
  if (lastCall && !done) message = lastCall.pnl > 0 ? `Nice call, ${money(lastCall.pnl)}.` : `Ouch, ${money(lastCall.pnl)}.`;
  if (done) message = `${hits} / ${ROUNDS} calls right.`;

  return (
    <div className="game reveal">
      <div className="game-text">
        <p className="mono">Fun break · {SCENARIOS.length} market scenarios</p>
        <h3>Beat the <em>market</em>.</h3>
        <p className="game-intro">
          Buy if you think the next candle closes higher, Sell if lower. The dashed line is a 5-period moving
          average, if you trust indicators.
        </p>

        <div className="game-status">
          <div className="game-score">
            <p className="mono">{done ? 'Final' : `Round ${round + 1} / ${ROUNDS}`}</p>
            <p className={`game-pnl ${pnl > 0 ? 'up' : pnl < 0 ? 'down' : ''}`}>{round ? money(pnl) : '$0'}</p>
          </div>
          <p className={`game-msg ${lastCall && !done ? (lastCall.pnl > 0 ? 'up' : 'down') : ''}`} aria-live="polite">{message}</p>
        </div>

        {done ? (
          <div className="game-rank">
            <p className="mono">Your rank</p>
            <p className="game-rank-title">{rank.title}</p>
            <p className="game-rank-line">{rank.line}</p>
            <p className="game-scenario">
              <span className="mono">Scenario · {scenario.name}</span>
              {scenario.blurb}
            </p>
            <button type="button" className="btn primary" onClick={restart}>Play again</button>
          </div>
        ) : (
          <div className="game-actions">
            <button type="button" className="btn trade buy" onClick={() => call(1)} disabled={busy}>▲ Buy</button>
            <button type="button" className="btn trade sell" onClick={() => call(-1)} disabled={busy}>▼ Sell</button>
          </div>
        )}

        <div className="game-progress" aria-label={`${hits} of ${round} calls right`}>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <i key={i} className={calls[i] ? (calls[i].pnl > 0 ? 'up' : 'down') : ''} />
          ))}
        </div>
      </div>

      <div className="chart">
        <div className="chart-head mono">
          <span>RITK / USD · 1D</span>
          <span>{visible[WINDOW - 1].close.toFixed(2)}</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Candlestick price chart">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} className="grid" x1="0" x2={W} y1={H * f} y2={H * f} />
          ))}
          <path className="sma" d={smaPath} />
          {visible.map((c, i) => {
            const idx = round + i;
            const up = c.close >= c.open;
            const made = calls[idx - WINDOW];
            const fresh = made && idx === WINDOW + round - 1;
            return (
              <g key={idx} className={`candle ${up ? 'up' : 'down'} ${fresh ? 'fresh' : ''}`}>
                <line x1={x(i)} x2={x(i)} y1={y(c.high)} y2={y(c.low)} />
                <rect
                  x={x(i) - step * 0.32}
                  width={step * 0.64}
                  y={y(Math.max(c.open, c.close))}
                  height={Math.max(1.5, Math.abs(y(c.open) - y(c.close)))}
                  rx="1.5"
                />
                {made && (
                  <text
                    className={made.pnl > 0 ? 'hit' : 'miss'}
                    x={x(i)}
                    y={made.dir > 0 ? y(c.low) + 13 : y(c.high) - 5}
                    textAnchor="middle"
                  >
                    {made.dir > 0 ? '▲' : '▼'}
                  </text>
                )}
              </g>
            );
          })}
          {!done && (
            <g className="next">
              <rect x={x(WINDOW) - step * 0.4} width={step * 0.8} y={PAD} height={H - 2 * PAD} rx="3" />
              <text x={x(WINDOW)} y={H / 2 + 5} textAnchor="middle">?</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
