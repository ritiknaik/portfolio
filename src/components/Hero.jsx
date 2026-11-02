import SignalLine from './SignalLine';
import SocialLinks from './SocialLinks';
import useTypewriter from '../hooks/useTypewriter';
import useMediaQuery from '../hooks/useMediaQuery';
import { lenses, person } from '../data/profile';
import { asset } from '../utils';
import './Hero.css';

export default function Hero() {
  const typed = useTypewriter(person.typed);
  const phone = useMediaQuery('(max-width: 640px)');
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <a className="open-to" href="#contact"><i />{person.openTo}<span aria-hidden="true">→</span></a>
          <p className="mono eyebrow">{person.eyebrow}</p>
          <h1>{person.name}</h1>
          <p className="tagline" aria-label={`I ${person.typed[0]}`}>
            I <span className="typed">{typed}</span><span className="caret" aria-hidden="true" />
          </p>
          <p className="bio">{phone ? person.bioShort : person.bio}</p>
          <div className="cta">
            <a className="btn primary" href="#work">See my work</a>
            <a className="btn" href={person.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
            <SocialLinks />
          </div>
        </div>

        <div className="portrait">
          <svg className="orbit" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="96" />
            {lenses.map((l, i) => {
              const a = (i / lenses.length) * Math.PI * 2 - Math.PI / 2;
              return <circle key={l.key} className="dot" cx={100 + 96 * Math.cos(a)} cy={100 + 96 * Math.sin(a)} r="3.5" style={{ fill: `var(--${l.key})` }} />;
            })}
          </svg>
          <div className="halo">
            <img src={asset(person.photo)} alt={`Portrait of ${person.name}`} width="620" height="762" />
          </div>
        </div>
      </div>
      <SignalLine />
    </header>
  );
}
