import { useRef, useState } from 'react';

// Horizontal scroll-snap carousel: tracks the slide nearest the scroll position
// and scrolls to a slide on demand. Attach `ref` and `onScroll` to the track element.
export default function useCarousel(count) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    const slides = ref.current.children;
    const target = Math.max(0, Math.min(count - 1, i));
    ref.current.scrollTo({ left: slides[target].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
    setIndex(target);
  };

  const onScroll = () => {
    const { scrollLeft, children } = ref.current;
    const base = children[0].offsetLeft;
    const dist = (i) => Math.abs(children[i].offsetLeft - base - scrollLeft);
    let nearest = 0;
    for (let i = 1; i < children.length; i += 1) if (dist(i) < dist(nearest)) nearest = i;
    if (nearest !== index) setIndex(nearest);
  };

  return { ref, index, goTo, onScroll };
}
