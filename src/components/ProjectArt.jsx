import './ProjectArt.css';

// Hand-drawn SVG cover art for project cards. 320×180 canvas, coloured with theme tokens
// so every illustration works in both day and night mode.

const T = ({ x, y, children, ...rest }) => <text x={x} y={y} {...rest}>{children}</text>;

function Chip({ x, label, sub, color }) {
  const pins = [0, 1, 2, 3, 4];
  return (
    <g>
      {pins.map((i) => (
        <g key={i} stroke={color} strokeWidth="2" strokeLinecap="round">
          <path d={`M${x + 18 + i * 14} 44 v-8`} />
          <path d={`M${x + 18 + i * 14} 116 v8`} />
        </g>
      ))}
      <rect x={x} y="44" width="92" height="72" rx="10" fill="var(--surface)" stroke={color} strokeWidth="2" />
      <rect x={x + 10} y="54" width="72" height="52" rx="6" fill={color} fillOpacity="0.12" />
      <T x={x + 46} y="76" textAnchor="middle" className="art-sm">{sub}</T>
      <T x={x + 46} y="94" textAnchor="middle" className="art-lg" style={{ fill: color }}>{label}</T>
    </g>
  );
}

function Prefill() {
  return (
    <>
      {[62, 76, 90, 104].map((y, i) => <rect key={y} x="14" y={y} width={18 - (i % 2) * 6} height="6" rx="3" fill="var(--muted)" fillOpacity="0.5" />)}
      <Chip x={44} label="PREFILL" sub="GPU 0" color="var(--systems)" />
      <path d="M140 80 H178" stroke="var(--ai)" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M172 74 L180 80 L172 86" fill="none" stroke="var(--ai)" strokeWidth="2" />
      <T x="160" y="70" textAnchor="middle" className="art-sm" style={{ fill: 'var(--ai)' }}>KV</T>
      <Chip x={186} label="DECODE" sub="GPU 1" color="var(--ai)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={186 + i * 16} y="146" width="12" height="12" rx="3" fill="var(--ai)" fillOpacity={1 - i * 0.14} />
      ))}
      <T x="44" y="156" className="art-sm">PROMPT → TOKENS</T>
    </>
  );
}

function Narratives() {
  const cells = [];
  for (let i = 0; i < 11; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      const dx = (i - 5) / 5.6;
      const dy = (j - 3.5) / 4;
      if (dx * dx + dy * dy <= 1) {
        const v = 0.15 + ((i * 7 + j * 13) % 10) / 12;
        cells.push(<rect key={`${i}-${j}`} x={24 + i * 11} y={42 + j * 11} width="9" height="9" rx="2" fill="var(--ai)" fillOpacity={v.toFixed(2)} />);
      }
    }
  }
  const words = [[0, 40, 54, 30], [1, 62, 26, 44], [2, 36, 70], [3, 50, 40]];
  return (
    <>
      {cells}
      <T x="24" y="148" className="art-sm">fMRI VOLUME</T>
      <path d="M156 86 H184" stroke="var(--muted)" strokeWidth="2" />
      <path d="M178 80 L186 86 L178 92" fill="none" stroke="var(--muted)" strokeWidth="2" />
      <rect x="196" y="34" width="104" height="104" rx="10" fill="var(--surface)" stroke="var(--line)" />
      {words.map(([row, ...widths]) => {
        let x = 208;
        return widths.map((w) => {
          const el = <rect key={`${row}-${x}`} x={x} y={52 + row * 20} width={w * 0.62} height="8" rx="4" fill="var(--text)" fillOpacity={row === 3 ? 0.25 : 0.55} />;
          x += w * 0.62 + 5;
          return el;
        });
      })}
      <rect x="250" y="112" width="2.5" height="12" fill="var(--ai)" className="art-blink" />
      <T x="196" y="156" className="art-sm">LLaMA3 → TEXT</T>
    </>
  );
}

const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i + Math.PI / 6;
  return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

function Greenfield() {
  const nodes = [[160, 84, 'API'], [100, 50, 'AUTH'], [220, 50, 'TRADE'], [96, 122, 'ETL'], [224, 122, 'RISK'], [160, 150, 'DB']];
  return (
    <>
      {nodes.slice(1).map(([x, y]) => <path key={`${x}${y}`} d={`M160 84 L${x} ${y}`} stroke="var(--swe)" strokeOpacity="0.5" strokeWidth="1.5" />)}
      <path d="M96 122 L160 150 L224 122" fill="none" stroke="var(--swe)" strokeOpacity="0.3" strokeDasharray="3 4" />
      {nodes.map(([x, y, label], i) => (
        <g key={label}>
          <polygon points={hex(x, y, i === 0 ? 26 : 20)} fill={i === 0 ? 'var(--swe)' : 'var(--surface)'} stroke="var(--swe)" strokeWidth="1.8" />
          <T x={x} y={y + 3} textAnchor="middle" className="art-sm" style={i === 0 ? { fill: 'var(--bg)' } : undefined}>{label}</T>
        </g>
      ))}
      <path d="M252 158 L264 150 L274 154 L288 136 L300 128" fill="none" stroke="var(--quant)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="300" cy="128" r="3" fill="var(--quant)" />
    </>
  );
}

function MRThread() {
  const ys = [36, 64, 96, 124];
  return (
    <>
      {ys.map((y, i) => (
        <g key={y}>
          <T x="16" y={y + 3} className="art-sm">{`T${i + 1}`}</T>
          <path d={`M36 ${y} C 70 ${y - 10}, 90 ${y + 10}, 120 ${y} S 170 80, 196 80`} fill="none" stroke="var(--systems)" strokeWidth="2.5" strokeOpacity={1 - i * 0.18} strokeLinecap="round" />
        </g>
      ))}
      <path d="M196 80 H244" stroke="var(--systems)" strokeWidth="6" strokeLinecap="round" />
      <rect x="248" y="56" width="56" height="48" rx="8" fill="var(--surface)" stroke="var(--systems)" strokeWidth="2" />
      <T x="276" y="78" textAnchor="middle" className="art-lg" style={{ fill: 'var(--systems)' }}>LWP</T>
      <T x="276" y="93" textAnchor="middle" className="art-sm">KERNEL</T>
      <T x="36" y="160" className="art-sm">MANY USER THREADS → ONE KERNEL THREAD</T>
    </>
  );
}

function BlueHawk() {
  const req = ['GET /index.html HTTP/1.1', 'Host: localhost:8080', 'Connection: keep-alive', 'Accept: text/html'];
  return (
    <>
      <rect x="18" y="34" width="168" height="104" rx="10" fill="var(--surface)" stroke="var(--line)" />
      <T x="30" y="52" className="art-sm" style={{ fill: 'var(--swe)' }}>REQUEST</T>
      {req.map((line, i) => <T key={line} x="30" y={72 + i * 15} className="art-code">{line}</T>)}
      <path d="M192 86 H214" stroke="var(--muted)" strokeWidth="2" />
      <path d="M208 80 L216 86 L208 92" fill="none" stroke="var(--muted)" strokeWidth="2" />
      <rect x="222" y="48" width="82" height="76" rx="10" fill="var(--systems)" fillOpacity="0.14" stroke="var(--systems)" strokeWidth="1.5" />
      <T x="263" y="84" textAnchor="middle" className="art-xl" style={{ fill: 'var(--systems)' }}>200</T>
      <T x="263" y="104" textAnchor="middle" className="art-sm">OK · HTML</T>
      <T x="18" y="160" className="art-sm">RFC 2616 · GET POST PUT DELETE HEAD</T>
    </>
  );
}

function Emotion() {
  const faces = [
    { x: 70, label: 'HAPPY', mouth: 'M-12 8 Q0 20 12 8', on: false },
    { x: 160, label: 'SURPRISE', mouth: null, on: true },
    { x: 250, label: 'NEUTRAL', mouth: 'M-11 11 H11', on: false },
  ];
  return (
    <>
      {faces.map(({ x, label, mouth, on }) => (
        <g key={label} transform={`translate(${x} 82)`}>
          <rect x="-42" y="-44" width="84" height="88" rx="6" fill="none" stroke="var(--ai)" strokeWidth={on ? 2 : 1.2} strokeDasharray={on ? undefined : '5 4'} strokeOpacity={on ? 1 : 0.6} />
          <circle r="28" fill="var(--surface)" stroke="var(--text)" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="-10" cy="-6" r="3" fill="var(--text)" />
          <circle cx="10" cy="-6" r="3" fill="var(--text)" />
          {mouth ? <path d={mouth} fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" /> : <ellipse cy="12" rx="5" ry="6" fill="none" stroke="var(--text)" strokeWidth="2" />}
          <rect x="-42" y="48" width="84" height="16" rx="3" fill={on ? 'var(--ai)' : 'transparent'} />
          <T x="0" y="59" textAnchor="middle" className="art-sm" style={on ? { fill: 'var(--bg)' } : undefined}>{label}</T>
        </g>
      ))}
    </>
  );
}

function Samvad() {
  const blocks = [24, 122, 220];
  return (
    <>
      {blocks.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 52 a10 10 0 0 1 10 -10 h56 a10 10 0 0 1 10 10 v52 a10 10 0 0 1 -10 10 h-${i % 2 ? 32 : 10} l-8 12 l-2 -12 h-${i % 2 ? 14 : 36} a10 10 0 0 1 -10 -10 z`} fill="var(--surface)" stroke="var(--swe)" strokeWidth="1.8" />
          <T x={x + 12} y="60" className="art-sm" style={{ fill: 'var(--swe)' }}>{`BLOCK #${i + 1}`}</T>
          <rect x={x + 12} y="72" width="52" height="7" rx="3.5" fill="var(--text)" fillOpacity="0.45" />
          <rect x={x + 12} y="86" width="36" height="7" rx="3.5" fill="var(--text)" fillOpacity="0.25" />
          <T x={x + 12} y="106" className="art-sm">{`0x${['3fa9', 'c71e', '9b04'][i]}…`}</T>
        </g>
      ))}
      {[100, 198].map((x) => (
        <g key={x} fill="none" stroke="var(--muted)" strokeWidth="2.5">
          <rect x={x - 2} y="72" width="14" height="10" rx="5" />
          <rect x={x + 8} y="72" width="14" height="10" rx="5" />
        </g>
      ))}
      <T x="24" y="156" className="art-sm">MESSAGES ON A LEDGER · METAMASK</T>
    </>
  );
}

function Coditor() {
  const lines = [
    [['ai', 30], ['text', 46], ['quant', 34]],
    [['text', 18], ['systems', 40], ['text', 22]],
    [['ai', 22], ['text', 30], ['design', 50]],
    [['text', 26], ['quant', 58]],
    [['systems', 34], ['text', 20]],
  ];
  return (
    <>
      <rect x="24" y="22" width="272" height="138" rx="10" fill="#1d2027" stroke="var(--line)" />
      {['#ec987c', '#e2b669', '#74c4a0'].map((c, i) => <circle key={c} cx={40 + i * 13} cy="36" r="4" fill={c} />)}
      <T x="160" y="39" textAnchor="middle" className="art-sm" style={{ fill: '#8b909a' }}>coditor sample.c</T>
      {lines.map((tokens, row) => {
        let x = 64;
        return (
          <g key={row}>
            <T x="38" y={64 + row * 16} className="art-sm" style={{ fill: '#5d626d' }}>{row + 1}</T>
            {tokens.map(([color, w]) => {
              const el = <rect key={x} x={x} y={57 + row * 16} width={w} height="7" rx="3.5" fill={color === 'text' ? '#c9c6bf' : `var(--${color})`} fillOpacity={color === 'text' ? 0.55 : 0.9} />;
              x += w + 6;
              return el;
            })}
          </g>
        );
      })}
      <rect x="140" y="121" width="7" height="12" fill="#e4e1da" className="art-blink" />
      <path d="M24.5 142 H295.5 V150 a10 10 0 0 1 -10 10 H34.5 a10 10 0 0 1 -10 -10 Z" fill="#262a32" />
      <T x="36" y="154" className="art-sm" style={{ fill: '#8b909a' }}>SEARCH: main   UNDO ↶   C · JAVA · JS · PY</T>
    </>
  );
}

function Impressions() {
  return (
    <>
      <rect x="92" y="26" width="96" height="130" rx="4" fill="var(--ai)" fillOpacity="0.55" transform="rotate(-10 140 91)" />
      <rect x="132" y="24" width="96" height="130" rx="4" fill="var(--systems)" fillOpacity="0.6" transform="rotate(8 180 89)" />
      <g transform="rotate(-2 160 90)">
        <rect x="110" y="22" width="100" height="136" rx="4" fill="var(--surface)" stroke="var(--line)" />
        <circle cx="160" cy="70" r="26" fill="var(--design)" />
        <path d="M128 112 L160 84 L192 112 Z" fill="var(--text)" fillOpacity="0.8" />
        <T x="160" y="132" textAnchor="middle" className="art-md">IMPRESSIONS</T>
        <T x="160" y="146" textAnchor="middle" className="art-sm">COEP · FEST</T>
      </g>
      <path d="M36 140 C 60 100, 70 160, 96 120" fill="none" stroke="var(--design)" strokeWidth="3" strokeLinecap="round" />
      <path d="M232 46 l10 -10 l6 6 l-10 10 z" fill="var(--design)" />
      <path d="M232 46 l-14 24" stroke="var(--design)" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

// This site: one browser window, night theme on the left and day theme on the right
function Portfolio() {
  const half = [
    { x: 36, ink: '#e4e1da', accent: '#6fb1ff' },
    { x: 172, ink: '#2b2e34', accent: '#2f74e0' },
  ];
  const lensColors = ['#7fb0f0', '#b29cec', '#74c4a0', '#e2b669', '#ec987c'];
  return (
    <>
      <rect x="24" y="16" width="272" height="138" rx="10" fill="var(--surface)" stroke="var(--line)" />
      {['#ec987c', '#e2b669', '#74c4a0'].map((c, i) => <circle key={c} cx={38 + i * 12} cy="28" r="3.5" fill={c} />)}
      <rect x="90" y="22" width="140" height="12" rx="6" fill="var(--surface-2)" />
      <T x="160" y="31" textAnchor="middle" className="art-sm">ritiknaik.github.io</T>
      <path d="M24.5 40 H160 V153.5 H34.5 a10 10 0 0 1 -10 -10 Z" fill="#1b1e24" />
      <path d="M160 40 H295.5 V143.5 a10 10 0 0 1 -10 10 H160 Z" fill="#eeebe5" />
      {half.map(({ x, ink, accent }) => (
        <g key={x}>
          <rect x={x} y="58" width="54" height="9" rx="4.5" fill={ink} fillOpacity="0.85" />
          <rect x={x} y="73" width="40" height="7" rx="3.5" fill={accent} />
          <rect x={x} y="88" width="62" height="5" rx="2.5" fill={ink} fillOpacity="0.3" />
          <rect x={x} y="98" width="50" height="5" rx="2.5" fill={ink} fillOpacity="0.3" />
          {lensColors.map((c, i) => <circle key={c} cx={x + 4 + i * 12} cy="122" r="4" fill={c} />)}
          <path d={`M${x + 82} 112 V76 a16 16 0 0 1 32 0 V112 Z`} fill={accent} fillOpacity="0.22" />
          <circle cx={x + 98} cy="82" r="8" fill={ink} fillOpacity="0.7" />
          <path d={`M${x + 84} 112 c2 -14 26 -14 28 0 Z`} fill={ink} fillOpacity="0.7" />
        </g>
      ))}
      <rect x="142" y="134" width="36" height="16" rx="8" fill="var(--surface)" stroke="var(--line)" />
      <circle cx="152" cy="142" r="5" fill="#6fb1ff" />
      <circle cx="168" cy="142" r="5" fill="none" stroke="#2f74e0" strokeWidth="1.5" />
      <T x="24" y="172" className="art-sm">VITE · REACT · SVG · DAY / NIGHT</T>
    </>
  );
}

const ART = {
  portfolio: Portfolio,
  prefill: Prefill,
  narratives: Narratives,
  greenfield: Greenfield,
  mrthread: MRThread,
  bluehawk: BlueHawk,
  emotion: Emotion,
  samvad: Samvad,
  coditor: Coditor,
  impressions: Impressions,
};

export default function ProjectArt({ name }) {
  const Art = ART[name];
  return (
    <svg className="art" viewBox="0 0 320 180" aria-hidden="true">
      <Art />
    </svg>
  );
}
