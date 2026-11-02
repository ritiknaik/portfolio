import SectionHead from './SectionHead';
import { education, leadership } from '../data/profile';
import './Education.css';

function Entry({ item }) {
  return (
    <li className="edu-item">
      <div className="edu-head">
        <p className="mono">{item.dates}</p>
        {item.badge && <span className="edu-badge">{item.badge}</span>}
      </div>
      <h3>{item.title}</h3>
      <p className="edu-place">{item.place}</p>
      {item.note && <p className="edu-note">{item.note}</p>}
    </li>
  );
}

export default function Education() {
  // Both columns share one set of grid rows, so side-by-side cards match in height
  const rows = Math.max(education.length, leadership.length);
  return (
    <section className="section" id="education">
      <div className="wrap">
        <SectionHead index="04" label="Education & leadership" title="Learning and *leading*." />
        <div className="edu-grid reveal">
          <div style={{ '--rows': rows + 1 }}>
            <h3 className="edu-col mono">Education</h3>
            <ul className="edu-list" style={{ '--rows': rows }}>{education.map((e) => <Entry key={e.title} item={e} />)}</ul>
          </div>
          <div style={{ '--rows': rows + 1 }}>
            <h3 className="edu-col mono">Leadership</h3>
            <ul className="edu-list" style={{ '--rows': rows }}>{leadership.map((e) => <Entry key={e.title} item={e} />)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
