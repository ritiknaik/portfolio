import { useEffect, useRef } from 'react';
import { Thumb, LensTags } from './ProjectParts';
import './ProjectModal.css';

export default function ProjectModal({ projects, index, onChange, onClose }) {
  const dialog = useRef(null);
  const project = index === null ? null : projects[index];

  useEffect(() => {
    const d = dialog.current;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % projects.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + projects.length) % projects.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, index, projects.length, onChange]);

  const d = project?.details;

  return (
    <dialog
      ref={dialog}
      className="modal"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-labelledby="modal-title"
    >
      {project && (
        <div className="modal-inner">
          <div className="modal-top">
            <div className="modal-img"><Thumb project={project} /></div>
            <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div className="modal-body">
            <LensTags keys={project.lenses} />
            <p className="mono modal-kind">{d.kind}</p>
            <h3 id="modal-title">{project.title}</h3>
            {project.paper && <p className="modal-paper">{project.paper}</p>}
            {d.authors && <p className="modal-authors">{d.authors}</p>}

            <p className="modal-summary">{d.summary}</p>

            <h4 className="mono">Highlights</h4>
            <ul className="modal-points">
              {d.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>

            <div className="modal-tags">
              {d.tags.map((t) => <span key={t}>{t}</span>)}
            </div>

            {d.note && <p className="modal-note mono">{d.note}</p>}

            <div className="modal-foot">
              <div className="modal-links">
                {d.links?.map((l, i) => (
                  <a key={l.href} className={`btn ${i === 0 ? 'primary' : ''}`} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                ))}
              </div>
              {projects.length > 1 && (
                <div className="modal-nav">
                  <button type="button" className="icon-btn" aria-label="Previous project" onClick={() => onChange((index - 1 + projects.length) % projects.length)}>←</button>
                  <span className="mono">{index + 1} / {projects.length}</span>
                  <button type="button" className="icon-btn" aria-label="Next project" onClick={() => onChange((index + 1) % projects.length)}>→</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
