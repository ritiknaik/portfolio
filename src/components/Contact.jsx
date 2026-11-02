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
          <p className="contact-text">Open to SWE, AI and quant roles, research collaborations, and side projects worth building.</p>
          <div className="cta contact-cta">
            <a className="btn primary" href={`mailto:${person.email}`}>Say hello</a>
            <a className="btn" href={person.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
          </div>
          <SocialLinks size="lg" />
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
