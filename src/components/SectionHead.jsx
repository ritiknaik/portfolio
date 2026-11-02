import Emph from './Emph';

export default function SectionHead({ index, label, title }) {
  return (
    <header className="section-head reveal">
      <p className="mono">{index} — {label}</p>
      <h2><Emph text={title} /></h2>
    </header>
  );
}
