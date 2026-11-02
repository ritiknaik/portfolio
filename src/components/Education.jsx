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
  return (
    <section className="section" id="education">
      <div className="wrap">
        <SectionHead index="04" label="Education & leadership" title="Learning and *leading*." />
        <div className="edu-grid reveal">
          <div>
            <h3 className="edu-col mono">Education</h3>
            <ul className="edu-list">{education.map((e) => <Entry key={e.title} item={e} />)}</ul>
          </div>
          <div>
            <h3 className="edu-col mono">Leadership</h3>
            <ul className="edu-list">{leadership.map((e) => <Entry key={e.title} item={e} />)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
