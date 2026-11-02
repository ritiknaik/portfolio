import Emph from './Emph';
import SectionHead from './SectionHead';
import { experience } from '../data/profile';
import './Experience.css';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead index="03" label="Experience" title="Where I've *shipped*." />
        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.role + job.dates} className="job reveal">
              <div className="job-meta mono">{job.dates}<br />{job.type}</div>
              <div>
                <h3>{job.role}</h3>
                <p className="job-org">{job.org}</p>
                {job.groups.length ? (
                  job.groups.map((g) => (
                    <div key={g.label || job.role} className="job-group">
                      {g.label && <h4 className="mono">{g.label}</h4>}
                      <ul className="job-points">
                        {g.points.map((p) => <li key={p}><Emph text={p} /></li>)}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="job-placeholder">
                    <i style={{ width: '92%' }} /><i style={{ width: '78%' }} /><i style={{ width: '85%' }} />
                    <span className="mono">Details coming soon</span>
                  </div>
                )}
                {job.tags && (
                  <div className="job-tags">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
