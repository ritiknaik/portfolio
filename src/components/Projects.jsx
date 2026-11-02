import { useState } from 'react';
import SectionHead from './SectionHead';
import ProjectModal from './ProjectModal';
import { Thumb, LensTags } from './ProjectParts';
import { lenses, projects } from '../data/profile';
import './Projects.css';

const FILTERS = [{ key: 'all', short: 'All' }, ...lenses];

// The whole card opens the details modal; the link in the footer is its own click target.
function Card({ project, onOpen }) {
  const { link } = project;
  return (
    <article className={`card ${project.paper ? 'paper' : ''}`}>
      <button type="button" className="card-open" onClick={onOpen} aria-label={`Details: ${project.title}`} />
      <div className="card-img"><Thumb project={project} /></div>
      <div className="card-body">
        <LensTags keys={project.lenses} />
        <h3>{project.title}</h3>
        {project.paper && <p className="card-paper">{project.paper}</p>}
        <p className="card-text">{project.text}</p>
        <div className="card-foot mono">
          <span className="card-more">Details +</span>
          {link.href ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
          ) : (
            <span>{link.label}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const shown = projects.filter((p) => filter === 'all' || p.lenses.includes(filter));

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHead index="05" label="Selected work" title="Projects & *papers*." />
        <div className="chips" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`chip ${filter === f.key ? 'on' : ''}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.key !== 'all' && <i style={{ background: `var(--${f.key})` }} />}
              {f.short}
            </button>
          ))}
        </div>
        <div className="cards">
          {shown.map((p, i) => <Card key={p.title} project={p} onOpen={() => setOpenIndex(i)} />)}
        </div>
      </div>
      <ProjectModal
        projects={shown}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
