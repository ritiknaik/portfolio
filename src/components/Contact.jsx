import SocialLinks from './SocialLinks';
import { person } from '../data/profile';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="wrap reveal">
          <p className="mono">07 — Contact</p>
          <h2>Bring the problem.<br /><em>I'll bring the code.</em></h2>
          <p className="contact-text">
            My inbox is always open. Bring an opportunity, a wild idea or just a hello, and let&apos;s talk over Zoom or coffee.
          </p>
          <div className="cta contact-cta">
            <a className="btn primary" href={`mailto:${person.email}`}>Say hello</a>
            <a className="btn" href={person.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
          </div>
          <SocialLinks size="lg" />
          <p className="contact-location mono">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
            </svg>
            {person.location}
          </p>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap mono">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <span>Designed &amp; built by me · React + SVG</span>
        </div>
      </footer>
    </>
  );
}
