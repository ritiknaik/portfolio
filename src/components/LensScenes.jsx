import { rng } from '../utils';

// Each scene is an SVG <g>. Elements with `draw` animate their stroke in; `pop` elements scale in.
// `--d` staggers them. All randomness is seeded so the graphics are stable between renders.

const delay = (s) => ({ '--d': `${s.toFixed(2)}s` });
const Label = ({ x, y, children, ...rest }) => <text x={x} y={y} {...rest}>{children}</text>;

function Box({ x, y, w, h, label, d, color }) {
  return (
    <g className="pop" style={delay(d)}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
      {label && <Label x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle">{label}</Label>}
    </g>
  );
}

function SweScene() {
  const c = 'var(--swe)';
  const arrows = [
    ['M72 150 H96', 0.2], ['M160 150 C 173 150, 173 80, 186 80', 0.35], ['M160 150 H186', 0.4],
    ['M160 150 C 173 150, 173 220, 186 220', 0.45], ['M258 80 H284', 0.7], ['M258 150 H284', 0.75],
    ['M258 220 H284', 0.8], ['M314 150 H334', 0.9],
  ];
  return (
    <>
      <Box x={14} y={133} w={58} h={34} label="CLIENT" d={0} color={c} />
      <Box x={96} y={133} w={64} h={34} label="GATEWAY" d={0.15} color={c} />
      {['INGEST', 'ENRICH', 'REPORT'].map((s, i) => (
        <Box key={s} x={186} y={63 + i * 70} w={72} h={34} label={s} d={0.3 + i * 0.08} color={c} />
      ))}
      <Box x={284} y={50} w={30} h={200} d={0.6} color={c} />
      <Label x={299} y={150} textAnchor="middle" transform="rotate(-90 299 150)">KAFKA</Label>
      <Box x={334} y={125} w={52} h={50} label="DB" d={0.7} color={c} />
      {arrows.map(([d, t]) => <path key={d} d={d} className="draw" pathLength="1" stroke="var(--muted)" strokeWidth="1.4" style={delay(t)} />)}
      <Label x={14} y={300}>REQUESTS → SERVICES → EVENTS → STORAGE</Label>
    </>
  );
}

const EEG = (() => {
  const r = rng(3);
  return [78, 122, 166, 210].map((cy, ch) => {
    let d = `M16 ${cy}`;
    for (let x = 20; x <= 136; x += 4) {
      const burst = x > 64 && x < 100 ? 24 : 0;
      d += ` L${x} ${(cy + (r() - 0.5) * (12 + burst)).toFixed(1)}`;
    }
    return { cy, d, name: ['FP1', 'FP2', 'O1', 'O2'][ch] };
  });
})();

const PIXELS = (() => {
  const r = rng(5);
  const cells = [];
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      const ring = Math.abs(Math.hypot((i - 3) / 3, (j - 3) / 3) - 0.62);
      cells.push({ i, j, v: Math.max(0.08, 1 - ring * 3) * (0.75 + r() * 0.25) });
    }
  }
  return cells;
})();

const NET = [[172, 4], [206, 3], [240, 4]].map(([x, n]) => Array.from({ length: n }, (_, i) => [x, 146 + (i - (n - 1) / 2) * 30]));

function AiScene() {
  const c = 'var(--ai)';
  const edges = [];
  NET.slice(0, -1).forEach((layer, l) => layer.forEach((a) => NET[l + 1].forEach((b) => edges.push([a, b, l]))));
  return (
    <>
      <Label x={16} y={40}>EEG</Label>
      <Label x={166} y={40}>ENCODER · GAN</Label>
      <Label x={272} y={40}>RECONSTRUCTION</Label>
      {EEG.map((ch, i) => (
        <g key={ch.name}>
          <Label x={16} y={ch.cy - 14}>{ch.name}</Label>
          <path d={ch.d} className="draw" pathLength="1" stroke={c} strokeWidth="1.4" strokeOpacity={1 - i * 0.15} style={delay(i * 0.1)} />
        </g>
      ))}
      {edges.map(([a, b, l], i) => (
        <path key={i} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} className="draw" pathLength="1" stroke={c} strokeOpacity="0.4" style={delay(0.6 + l * 0.2 + (i % 5) * 0.03)} />
      ))}
      {NET.flat().map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="var(--surface)" stroke={c} strokeWidth="1.8" className="pop" style={delay(0.6 + i * 0.04)} />
      ))}
      {PIXELS.map(({ i, j, v }) => (
        <rect key={`${i}-${j}`} x={272 + i * 15} y={99 + j * 15} width="13" height="13" rx="2" fill={c} fillOpacity={v.toFixed(2)} className="pop" style={delay(1 + (i + j) * 0.04)} />
      ))}
      <Label x={16} y={300}>BRAIN SIGNALS → LATENT SPACE → IMAGE</Label>
    </>
  );
}

const CANDLES = (() => {
  const r = rng(11);
  // Lower y is a higher price in SVG, so a negative drift trends towards profit.
  let p = 190;
  return Array.from({ length: 16 }, (_, i) => {
    const o = p;
    const cl = Math.max(60, Math.min(200, o + (r() - 0.68) * 40));
    p = cl;
    return { x: 40 + i * 20, o, cl, hi: Math.min(o, cl) - r() * 16, lo: Math.max(o, cl) + r() * 16, vol: 8 + r() * 30 };
  });
})();
const MA = CANDLES.map((k, i) => {
  const w = CANDLES.slice(Math.max(0, i - 3), i + 1);
  return `${k.x + 5} ${(w.reduce((s, c) => s + c.cl, 0) / w.length).toFixed(1)}`;
});

function QuantScene() {
  return (
    <>
      {[50, 100, 150, 200].map((y) => <path key={y} d={`M30 ${y} H380`} stroke="var(--line)" strokeDasharray="2 4" />)}
      {CANDLES.map((k, i) => {
        const col = k.cl < k.o ? 'var(--quant)' : 'var(--down)';
        return (
          <g key={k.x} className="pop" style={delay(i * 0.05)}>
            <path d={`M${k.x + 5} ${k.hi} V${k.lo}`} stroke={col} strokeWidth="1.2" />
            <rect x={k.x} y={Math.min(k.o, k.cl)} width="10" height={Math.max(2, Math.abs(k.cl - k.o))} rx="1" fill={col} />
            <rect x={k.x} y={270 - k.vol} width="10" height={k.vol} fill="var(--muted)" fillOpacity="0.3" />
          </g>
        );
      })}
      <path d={`M${MA.join(' L')}`} className="draw" pathLength="1" stroke="var(--accent)" strokeWidth="2" style={delay(0.9)} />
      <Label x={30} y={40}>PRICE · 4-PERIOD MA</Label>
      <Label x={30} y={226}>VOLUME</Label>
      <Label x={30} y={300}>TICKS → SIGNALS → DECISIONS</Label>
    </>
  );
}

const THREADS = (() => {
  const r = rng(21);
  return [0, 1, 2, 3].map((row) => {
    const blocks = [];
    let x = 80 + r() * 12;
    while (x < 360) {
      const w = Math.min(28 + r() * 50, 380 - x);
      blocks.push({ x, w, t: 1 + Math.floor(r() * 8), o: 0.18 + r() * 0.4 });
      x += w + 4 + r() * 10;
    }
    return { y: 66 + row * 50, blocks };
  });
})();

function SystemsScene() {
  const c = 'var(--systems)';
  return (
    <>
      <Label x={16} y={40}>SCHEDULER · USER THREADS ON CORES</Label>
      {THREADS.map(({ y, blocks }, row) => (
        <g key={y}>
          <Label x={16} y={y + 19}>{`CORE ${row}`}</Label>
          <path d={`M80 ${y + 15} H380`} stroke="var(--line)" />
          {blocks.map((b) => (
            <g key={b.x} className="pop" style={delay(0.1 + b.x / 500 + row * 0.05)}>
              <rect x={b.x} y={y} width={b.w} height="30" rx="4" fill={c} fillOpacity={b.o.toFixed(2)} />
              {b.w > 30 && <Label x={b.x + 7} y={y + 19} className="on-fill">{`T${b.t}`}</Label>}
            </g>
          ))}
        </g>
      ))}
      <path d="M300 52 V262" className="draw" pathLength="1" stroke="var(--text)" strokeDasharray="1" strokeWidth="1.2" style={delay(1.1)} />
      <Label x={306} y={262}>NOW</Label>
      <Label x={16} y={300}>THREADS → CONTEXT SWITCHES → THROUGHPUT</Label>
    </>
  );
}

function DesignScene() {
  const c = 'var(--design)';
  const swatches = ['swe', 'ai', 'quant', 'systems', 'design'];
  return (
    <>
      <path d="M40 40 H360 V262 H40 Z" className="draw" pathLength="1" stroke="var(--muted)" strokeWidth="1.5" />
      <path d="M40 66 H360" className="draw" pathLength="1" stroke="var(--line)" style={delay(0.3)} />
      {[56, 70, 84].map((x, i) => <circle key={x} cx={x} cy="53" r="4" fill="var(--line)" className="pop" style={delay(0.4 + i * 0.05)} />)}
      <rect x="60" y="86" width="150" height="16" rx="3" fill="var(--text)" fillOpacity="0.8" className="pop" style={delay(0.5)} />
      <rect x="60" y="112" width="130" height="6" rx="3" fill="var(--line)" className="pop" style={delay(0.6)} />
      <rect x="60" y="124" width="110" height="6" rx="3" fill="var(--line)" className="pop" style={delay(0.65)} />
      <rect x="60" y="142" width="70" height="22" rx="11" fill={c} className="pop" style={delay(0.75)} />
      <rect x="240" y="86" width="100" height="78" rx="6" fill="var(--surface-2)" className="pop" style={delay(0.6)} />
      {[60, 160, 260].map((x, i) => <rect key={x} x={x} y="184" width="80" height="60" rx="6" fill="var(--surface-2)" className="pop" style={delay(0.8 + i * 0.08)} />)}
      <path d="M28 240 C 90 160, 140 290, 210 200 S 320 110, 372 118" className="draw" pathLength="1" stroke={c} strokeWidth="3" strokeLinecap="round" style={delay(0.9)} />
      {swatches.map((k, i) => <circle key={k} cx={260 + i * 22} cy="284" r="8" fill={`var(--${k})`} className="pop" style={delay(1.4 + i * 0.06)} />)}
      <Label x={40} y={288}>SKETCH → WIREFRAME → CANVAS</Label>
    </>
  );
}

const SCENES = { swe: SweScene, ai: AiScene, quant: QuantScene, systems: SystemsScene, design: DesignScene };

export default function LensScenes({ keys, active }) {
  return (
    <svg className="scenes" viewBox="0 0 400 310" aria-hidden="true">
      {keys.map((k, i) => {
        const Scene = SCENES[k];
        return <g key={k} className={`scene ${i === active ? 'on' : ''}`}><Scene /></g>;
      })}
    </svg>
  );
}
