# Ritik Naik · Portfolio

Single-page portfolio built with Vite + React. No backend.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve the production build
```

## Editing content

All text, links and image paths live in [`src/data/profile.js`](src/data/profile.js).
Images are served from `public/images/`. Wrap a word in `*asterisks*` in a heading to highlight it.

## Structure

- `src/components/`: one component (and its CSS) per section
- `src/components/LensScenes.jsx`: the scroll-driven SVG graphics
- `src/styles/global.css`: color tokens for night/day themes, fonts, shared styles

## Deploy

The build uses relative asset paths, so the same `dist/` works on both hosts.

- **Netlify:** `netlify.toml` sets the build command and publish dir.
- **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
  In the repo settings, set *Pages → Source* to **GitHub Actions**.
