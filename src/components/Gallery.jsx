import { useRef, useState } from 'react';
import SectionHead from './SectionHead';
import MarketGame from './MarketGame';
import { art } from '../data/profile';
import { asset } from '../utils';
import './Gallery.css';

export default function Gallery() {
  const dialog = useRef(null);
  const [current, setCurrent] = useState(null);

  const open = (piece) => {
    setCurrent(piece);
    dialog.current.showModal();
  };

  return (
    <section className="section" id="art">
      <div className="wrap">
        <SectionHead index="06" label="Beyond code" title="The *other* canvas." />
        <p className="gallery-intro reveal">
          Painting, sketching, chess and carrom. A few pieces from college exhibitions and a couple of games I'm proud of.
        </p>
      </div>
      <div className="wall">
        {art.map((piece) => (
          <button key={piece.file} type="button" className="frame" onClick={() => open(piece)}>
            <img src={asset(`images/home/${piece.file}.jpeg`)} alt={piece.title} loading="lazy" />
            <span>{piece.title}</span>
          </button>
        ))}
      </div>
      <div className="wrap">
        <MarketGame />
      </div>

      <dialog ref={dialog} className="lightbox" onClick={() => dialog.current.close()}>
        {current && (
          <figure>
            <img src={asset(`images/home/${current.file}.jpeg`)} alt={current.title} />
            <figcaption>
              {current.title}
              {current.href && (
                <a href={current.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}> · View on Chess.com ↗</a>
              )}
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
