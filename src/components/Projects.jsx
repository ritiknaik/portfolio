import { useState } from 'react';
import SectionHead from './SectionHead';
import ProjectModal from './ProjectModal';
import CarouselNav from './CarouselNav';
import useCarousel from '../hooks/useCarousel';
import useMediaQuery from '../hooks/useMediaQuery';
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

// Grid on tablets and up, swipeable carousel on phones
function CardDeck({ items, onOpen }) {
  const phone = useMediaQuery('(max-width: 640px)');
  const { ref, index, goTo, onScroll } = useCarousel(items.length);
  return (
    <>
      <div className={`cards ${phone ? 'carousel-track' : ''}`} ref={ref} onScroll={phone ? onScroll : undefined}>
        {items.map((p, i) => <Card key={p.title} project={p} onOpen={() => onOpen(i)} />)}
      </div>
      {phone && items.length > 1 && <CarouselNav index={index} count={items.length} goTo={goTo} />}
    </>
  );
}

export default function Projects() {
  // Phones and tablets start on SWE so the list stays short; wider screens show everything
  const [filter, setFilter] = useState(() => (window.matchMedia('(max-width: 960px)').matches ? 'swe' : 'all'));
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
        <CardDeck key={filter} items={shown} onOpen={setOpenIndex} />
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
