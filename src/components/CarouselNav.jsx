import './CarouselNav.css';

// Prev / next buttons with either colored dots (one per slide) or a "3 / 11" counter.
export default function CarouselNav({ index, count, goTo, dots }) {
  return (
    <div className="carousel-nav">
      <button type="button" className="icon-btn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">‹</button>
      {dots ? (
        <div className="dots">
          {dots.map((d, i) => (
            <button
              key={d.key}
              type="button"
              className={i === index ? 'on' : ''}
              style={{ '--c': d.color }}
              onClick={() => goTo(i)}
              aria-label={`Show ${d.label}`}
            />
          ))}
        </div>
      ) : (
        <span className="carousel-count mono" aria-live="polite">{index + 1} / {count}</span>
      )}
      <button type="button" className="icon-btn" onClick={() => goTo(index + 1)} disabled={index === count - 1} aria-label="Next">›</button>
    </div>
  );
}
