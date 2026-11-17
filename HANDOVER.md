# UNIFRA PROPERTIES V2 — PROJECT HANDOVER & CONTEXT

## 📌 Project Overview
**Unifra Properties v2** is the clean next-generation architecture and brand redesign for Unifra Properties, showcasing high-end contemporary coastal residences (such as MYSA Luxe Villas) in ECR Chennai, India.

- **Location**: `D:\UNIFRA\unifra-v2`
- **Git Repository**: Fresh local Git repository initialized (`branch: main`)
- **Local Dev Command**: `npm run dev` (Runs on `http://localhost:3001/`)
- **Design Aesthetic**: White editorial luxury — pure white canvas, ink typography, brand gold (`#dfb776`) used sparingly; Instrument Serif (display) + Geist (UI/body). Every page and section has its own composition and motion — no repeated blocks, images or CTAs (the footer is the single closing CTA).

---

## 🛠️ Tech Stack & Architecture
- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: TailwindCSS v4 design tokens in `@theme` ([src/index.css](src/index.css)) — `bg-paper`, `text-ink`, `font-display`, `text-mega/display/headline/statement`, `desk:` variant (≥1024px landscape)
- **Motion**: GSAP 3 (ScrollTrigger, SplitText) via `@gsap/react` + Lenis smooth scroll synced to the GSAP ticker ([src/lib/gsap.ts](src/lib/gsap.ts), [src/components/SmoothScroll.tsx](src/components/SmoothScroll.tsx))
- **Scroll FX**: declarative `data-*` attributes handled by [src/hooks/useScrollFx.ts](src/hooks/useScrollFx.ts) (`data-split`, `data-reveal`, `data-clip`, `data-parallax`, `data-count`, `data-scrub-words`…)
- **Experience layer**: session preloader (waits for web fonts), curtain page transitions, GSAP cursor (fine pointers only), magnetic buttons, 3D tilt cards, velocity marquee
- **Home (Unifra brand, photography only — no MYSA text)**: CSS-3D fly-through hero, 3D ring of interiors, coastline zoom, residences (MYSA live + blurred "coming soon" enclaves), coverflow "How we build"
- **MYSA page**: scroll-scrubbed camera flight ([src/components/ScrollWorld.tsx](src/components/ScrollWorld.tsx)) — adapted from the MIT-licensed [oso95/scroll-world](https://github.com/oso95/scroll-world) engine. Clips `public/videos/mysa-world.mp4` (desktop, `-g 8`) and `mysa-world-m.mp4` (portrait, `-g 4`) are re-encodes of the original walkthrough videos; chapters/times live in `WORLD_CHAPTERS` in the MYSA page
- **Images**: optimized WebP renditions in `public/images/web/` (full + `-sm`) registered in [src/data/media.ts](src/data/media.ts); originals untouched in `public/images/mysa3d/`
- **Upcoming enclaves**: only MYSA is live — every other project renders as a blurred "Coming soon" teaser linking to the pre-release list
- **Other**: Lucide icons, Canvas Confetti (lazy, gate success); `/admin` CRM is lazy-loaded; vendor chunks `react` + `motion` (GSAP/Lenis) split for long-term caching
- **State & Storage**: Gated Villa Access Storage ([src/utils/leadsStorage.ts](file:///d:/UNIFRA/unifra-v2/src/utils/leadsStorage.ts)), localStorage lead persistence

---

## 🔗 Connecting a New Remote Git Repository (GitHub / GitLab)
When ready to push to your remote repository:
```bash
git remote add origin <YOUR_NEW_REPOSITORY_URL>
git branch -M main
git push -u origin main
```

---

## 🚀 How to Run
```bash
cd D:\UNIFRA\unifra-v2
npm run dev
# Server runs at http://localhost:3000/ (or the next free port, e.g. 3001)
npm run build && npx vite preview   # production build at http://localhost:4173/
```

---

## ☁️ Deploying to Netlify
Everything is configured in [netlify.toml](netlify.toml): `npm run build` → publish `dist`, Node 22, SPA rewrite (so `/admin` works), 1-year immutable caching for hashed `/assets/*`, cache headers for images/videos, and baseline security headers. npm is the package manager (`package-lock.json`; the old `bun.lock` was removed so Netlify cannot pick Bun).

1. Push the repo to GitHub/GitLab (see above).
2. Netlify → **Add new site → Import an existing project** → pick the repo. Build settings are read from `netlify.toml` — no environment variables are required.
3. Deploy. Optional: add your custom domain under **Domain management** (HTTPS is automatic).

Alternatively, drag-and-drop: run `npm run build` locally and drop the `dist/` folder onto Netlify's deploy page.

**Notes**
- Leads (gate form, contact form) are stored in the visitor's browser `localStorage`; `/admin` only shows leads captured on that same browser. Connect a backend/form service (e.g. Netlify Forms) before relying on it for real enquiries.
- Images in `/images/*` are cached for 7 days — when replacing a photo, use a new file name to bust caches.
