import { useEffect, useState } from 'react';

// Returns the id of the element currently crossing the middle band of the viewport.
// `ids` must be a stable array (define it outside the component).
export default function useScrollSpy(ids, rootMargin = '-45% 0px -50% 0px') {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
