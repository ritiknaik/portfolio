import SectionHead from './SectionHead';
import { skills } from '../data/profile';
import { asset } from '../utils';
import './Skills.css';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead index="01" label="Toolkit" title="The *stack*." />
        <div className="skill-grid reveal">
          {skills.map((group) => (
            <div key={group.title} className="skill-group">
              <h3 className="mono" style={{ color: `var(--${group.color})` }}>{group.title}</h3>
              <ul>
                {group.items.map(([name, icon]) => (
                  <li key={name}><img src={asset(`images/skills/${icon}`)} alt="" loading="lazy" />{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
