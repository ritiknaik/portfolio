import { lenses } from '../data/profile';
import { rng } from '../utils';
import './SignalLine.css';

const W = 1200;
const SEG = W / 5;
const MID = 60;

// One continuous line that changes character per lens: data flow, EEG, price action, clock, pen stroke.
function buildPath() {
  const r = rng(7);
  let d = `M0 ${MID}`;
  for (let x = 6; x <= SEG; x += 6) d += ` L${x} ${(MID + Math.sin(x / 22) * 14).toFixed(1)}`;
  for (let x = SEG + 5; x <= SEG * 2; x += 5) d += ` L${x} ${(MID + (r() - 0.5) * (x % 50 < 10 ? 80 : 24)).toFixed(1)}`;
  let y = MID;
  for (let x = SEG * 2 + 10; x <= SEG * 3 - 10; x += 16) {
    y = Math.max(22, Math.min(98, y + (r() - 0.5) * 36));
    d += ` L${x} ${y.toFixed(1)} L${x + 5} ${(y - 10).toFixed(1)} L${x + 5} ${(y + 12).toFixed(1)} L${x + 10} ${y.toFixed(1)}`;
  }
  d += ` L${SEG * 3} ${MID}`;
  for (let x = SEG * 3; x < SEG * 4; x += 40) d += ` L${x} 30 L${x + 20} 30 L${x + 20} 90 L${x + 40} 90`;
  d += ` L${SEG * 4} ${MID}`;
  d += ` C ${SEG * 4 + 60} 0, ${SEG * 4 + 90} 120, ${SEG * 4 + 140} 50 S ${W - 40} 70, ${W - 6} ${MID}`;
  return d;
}

const PATH = buildPath();

export default function SignalLine() {
  return (
    <div className="signal" aria-hidden="true">
      <svg viewBox={`0 0 ${W} 120`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="signal-grad" x1="0" x2="1">
            {lenses.map((l, i) => (
              <stop key={l.key} offset={(i + 0.5) / lenses.length} stopColor={`var(--${l.key})`} />
            ))}
          </linearGradient>
        </defs>
        <path d={PATH} pathLength="1" />
      </svg>
      <div className="signal-labels">
        {lenses.map((l, i) => (
          <a key={l.key} href={`#lens-${l.key}`} className="mono" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
            <i style={{ background: `var(--${l.key})` }} />
            {l.short}
          </a>
        ))}
      </div>
    </div>
  );
}
