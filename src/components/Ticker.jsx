import { ticker } from '../data/profile';
import './Ticker.css';

export default function Ticker() {
  const items = ticker.map((t) => (
    <span key={t.k}>
      {t.k} <b className={t.up ? 'up' : ''}>{t.v}{t.up && ' ▲'}</b>
    </span>
  ));
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{items}{items}</div>
    </div>
  );
}
