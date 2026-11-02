import { useState } from 'react';
import Emph from './Emph';
import SectionHead from './SectionHead';
import { experience } from '../data/profile';
import './Experience.css';

export default function Experience() {
  // Phones show the first point of each group until the job is expanded
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead index="03" label="Experience" title="Where I've *shipped*." />
        <ol className="timeline">
          {experience.map((job) => {
            const key = job.role + job.dates;
            const hidden = job.groups.reduce((n, g) => n + Math.max(0, g.points.length - 1), 0);
            return (
              <li key={key} className={`job reveal ${open[key] ? 'open' : ''}`}>
                <div className="job-meta mono">{job.dates}<br />{job.type}</div>
                <div>
                  <h3>{job.role}</h3>
                  <p className="job-org">{job.org}</p>
                  {job.groups.length ? (
                    job.groups.map((g) => (
                      <div key={g.label || job.role} className="job-group">
                        {g.label && <h4 className="mono">{g.label}</h4>}
                        <ul className="job-points">
                          {g.points.map((p, i) => <li key={p} className={i ? 'extra' : ''}><Emph text={p} /></li>)}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="job-placeholder">
                      <i style={{ width: '92%' }} /><i style={{ width: '78%' }} /><i style={{ width: '85%' }} />
                      <span className="mono">Details coming soon</span>
                    </div>
                  )}
                  {hidden > 0 && (
                    <button type="button" className="job-more" onClick={() => toggle(key)} aria-expanded={!!open[key]}>
                      {open[key] ? 'Show less' : `Show ${hidden} more`}
                      <span aria-hidden="true">{open[key] ? '↑' : '↓'}</span>
                    </button>
                  )}
                  {job.tags && (
                    <div className="job-tags">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
