import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import useScrollSpy from '../hooks/useScrollSpy';
import { sections } from '../data/profile';
import { asset } from '../utils';
import './Nav.css';

const IDS = sections.map((s) => s.id);

export default function Nav({ theme, onToggleTheme }) {
  const active = useScrollSpy(IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`nav ${menuOpen ? 'open' : ''}`}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <img src={asset('images/mynewlogo.webp')} alt="" width="32" height="32" />
          <span>Ritik Naik</span>
        </a>
        <div className="nav-links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="nav-tools">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}
