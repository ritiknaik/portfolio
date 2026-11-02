import { useCallback, useEffect, useState } from 'react';

const KEY = 'theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'night');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'night' ? 'day' : 'night')), []);
  return [theme, toggle];
}
