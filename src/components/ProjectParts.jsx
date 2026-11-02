import { lenses } from '../data/profile';
import ProjectArt from './ProjectArt';
import { asset } from '../utils';

const LENS_NAME = Object.fromEntries(lenses.map((l) => [l.key, l.short]));

// Papers use their publisher artwork; everything else gets custom SVG art.
export function Thumb({ project }) {
  if (project.art) return <ProjectArt name={project.art} />;
  return <img src={asset(project.image)} alt="" loading="lazy" />;
}

export function LensTags({ keys }) {
  return (
    <div className="card-lenses">
      {keys.map((k) => <span key={k} className="mono" style={{ color: `var(--${k})` }}>{LENS_NAME[k]}</span>)}
    </div>
  );
}
