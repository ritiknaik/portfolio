import { useRef, useState } from 'react';
import Emph from './Emph';
import SectionHead from './SectionHead';
import LensScenes from './LensScenes';
import useScrollSpy from '../hooks/useScrollSpy';
import useMediaQuery from '../hooks/useMediaQuery';
import { lenses } from '../data/profile';
import './Lenses.css';

const IDS = lenses.map((l) => `lens-${l.key}`);
const KEYS = lenses.map((l) => l.key);

function Tabs({ index, onSelect, className = '' }) {
  return (
    <div className={`tabs ${className}`} role="tablist" aria-label="Disciplines">
      {lenses.map((l, i) => (
        <button
          key={l.key}
          type="button"
          role="tab"
          aria-selected={i === index}
          className={`tab ${i === index ? 'on' : ''}`}
          style={{ '--c': `var(--${l.key})` }}
          onClick={() => onSelect(i)}
        >
          <i />{l.short}
        </button>
      ))}
    </div>
  );
}

export default function Lenses() {
  // Desktop: panels scroll past a sticky card. Phones and tablets: panels become a swipeable carousel.
  const carousel = useMediaQuery('(max-width: 860px)');
  const activeId = useScrollSpy(IDS, '-45% 0px -45% 0px');
  const [slide, setSlide] = useState(0);
  const track = useRef(null);

  const index = carousel ? slide : Math.max(0, IDS.indexOf(activeId));
  const lens = lenses[index];

  const goTo = (i) => {
    const panels = track.current.children;
    const target = Math.max(0, Math.min(lenses.length - 1, i));
    track.current.scrollTo({ left: panels[target].offsetLeft - panels[0].offsetLeft, behavior: 'smooth' });
    setSlide(target);
  };

  // Whichever panel's left edge is closest to the scroll position is the current slide
  const onScroll = () => {
    const { scrollLeft, children } = track.current;
    const base = children[0].offsetLeft;
    let nearest = 0;
    for (let i = 1; i < children.length; i += 1) {
      if (Math.abs(children[i].offsetLeft - base - scrollLeft) < Math.abs(children[nearest].offsetLeft - base - scrollLeft)) nearest = i;
    }
    if (nearest !== slide) setSlide(nearest);
  };

  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead index="02" label="What I do" title="Five *tabs*, always open." />
        <div className="lenses">
          <aside className="stage" style={{ '--c': `var(--${lens.key})` }}>
            <div className="stage-card">
              <Tabs index={index} onSelect={(i) => document.getElementById(IDS[i]).scrollIntoView({ block: 'center' })} />
              <div className="tab-body">
                <p className="tab-path mono">~/ritik/{lens.key}<span className="caret-sm" /></p>
                <LensScenes keys={KEYS} active={index} />
              </div>
            </div>
          </aside>

          <Tabs index={index} onSelect={goTo} className="m-tabs" />

          <div className="panels" ref={track} onScroll={carousel ? onScroll : undefined}>
            {lenses.map((l, i) => (
              <article
                key={l.key}
                id={`lens-${l.key}`}
                className={`panel ${i === index ? 'active' : ''}`}
                style={{ '--c': `var(--${l.key})` }}
              >
                <div className="panel-scene">
                  <LensScenes keys={[l.key]} active={i === index ? 0 : -1} />
                </div>
                <p className="panel-num mono">{`0${i + 1}`} · {l.name}</p>
                <h3><Emph text={l.title} /></h3>
                <p className="panel-text">{l.text}</p>
                <ul className="proof">
                  {l.proof.map(([what, where]) => (
                    <li key={what}>{what}<span className="mono">{where}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="carousel-nav">
            <button type="button" className="icon-btn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">‹</button>
            <div className="dots">
              {lenses.map((l, i) => (
                <button
                  key={l.key}
                  type="button"
                  className={i === index ? 'on' : ''}
                  style={{ '--c': `var(--${l.key})` }}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${l.name}`}
                />
              ))}
            </div>
            <button type="button" className="icon-btn" onClick={() => goTo(index + 1)} disabled={index === lenses.length - 1} aria-label="Next">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
