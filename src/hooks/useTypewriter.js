import { useEffect, useState } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types each phrase, holds it, erases it, then moves on to the next one.
export default function useTypewriter(phrases, { typeMs = 55, eraseMs = 28, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [erasing, setErasing] = useState(false);
  const [still] = useState(reducedMotion);

  useEffect(() => {
    if (still) return undefined;
    const phrase = phrases[index];
    let next;
    let wait;
    if (!erasing && text === phrase) {
      next = () => setErasing(true);
      wait = holdMs;
    } else if (erasing && text === '') {
      next = () => { setErasing(false); setIndex((i) => (i + 1) % phrases.length); };
      wait = 250;
    } else {
      next = () => setText(erasing ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      wait = erasing ? eraseMs : typeMs;
    }
    const timer = setTimeout(next, wait);
    return () => clearTimeout(timer);
  }, [text, erasing, index, phrases, still, typeMs, eraseMs, holdMs]);

  return still ? phrases[0] : text;
}
