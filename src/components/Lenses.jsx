import Emph from './Emph';
import SectionHead from './SectionHead';
import LensScenes from './LensScenes';
import CarouselNav from './CarouselNav';
import useScrollSpy from '../hooks/useScrollSpy';
import useMediaQuery from '../hooks/useMediaQuery';
import useCarousel from '../hooks/useCarousel';
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
  const { ref, index: slide, goTo, onScroll } = useCarousel(lenses.length);

  const index = carousel ? slide : Math.max(0, IDS.indexOf(activeId));
  const lens = lenses[index];

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

          <div className={`panels ${carousel ? 'carousel-track' : ''}`} ref={ref} onScroll={carousel ? onScroll : undefined}>
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

          {carousel && (
            <CarouselNav
              index={index}
              count={lenses.length}
              goTo={goTo}
              dots={lenses.map((l) => ({ key: l.key, label: l.name, color: `var(--${l.key})` }))}
            />
          )}
        </div>
      </div>
    </section>
  );
}
