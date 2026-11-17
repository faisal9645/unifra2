/* ============================================================================
   ScrollWorld — scroll-scrubbed camera flight for a single walkthrough clip.

   Adapted for React/GSAP from the "scroll-world" scrub engine
   (https://github.com/oso95/scroll-world — MIT License, Copyright (c) 2026 cyw):
   clip loaded as a Blob (always seekable), currentTime eased toward the scroll
   target, seeks coalesced while the decoder is busy, per-chapter "linger" so the
   camera settles where the copy peaks, posters held until a real frame paints,
   and iOS priming on first touch. Clips are encoded per its pipeline
   (-g 8 desktop / -g 4 phone, +faststart, no audio).
   ========================================================================== */
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { useLenis } from './SmoothScroll';

export interface WorldChapter {
  /** clip time range, seconds */
  t0: number;
  t1: number;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
}

interface ScrollWorldProps {
  chapters: WorldChapter[];
  src: string;
  srcPortrait: string;
  poster: string;
  posterPortrait: string;
  /** viewport-heights of scroll per chapter */
  chapterScroll?: number;
  /** 0..0.6 — how strongly the camera settles mid-chapter */
  linger?: number;
  onPlayFilm: () => void;
  onOpenContact: () => void;
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => {
  const c = clamp(x);
  return c * c * (3 - 2 * c);
};
// Monotone remap: f(0)=0, f(1)=1, slower in the middle (scroll-world's lingerEase)
const lingerEase = (x: number, l: number) => {
  const c = x - 0.5;
  return (1 - l) * x + l * (4 * c * c * c + 0.5);
};

export const ScrollWorld: React.FC<ScrollWorldProps> = ({
  chapters,
  src,
  srcPortrait,
  poster,
  posterPortrait,
  chapterScroll = 0.95,
  linger = 0.45,
  onPlayFilm,
  onOpenContact
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollTo } = useLenis();
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches);
  const [painted, setPainted] = useState(false);
  const n = chapters.length;
  const duration = chapters[n - 1].t1;

  // Portrait screens get the native 9:16 encode; rotating swaps sources
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const onChange = () => setPortrait(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const clipUrl = portrait ? srcPortrait : src;

  // Load the clip as a Blob once the section is near — seeking never depends on range requests
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || prefersReducedMotion()) return;
    let objectUrl = '';
    let cancelled = false;
    setPainted(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        fetch(clipUrl)
          .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
          .then((blob) => {
            if (cancelled) return;
            objectUrl = URL.createObjectURL(blob);
            video.src = objectUrl;
          })
          .catch(() => {});
      },
      { rootMargin: '160% 0px' }
    );
    io.observe(root);
    // Reveal the video only once a real frame has painted (iOS shows blank otherwise)
    const onSeeked = () => setPainted(true);
    video.addEventListener('seeked', onSeeked, { once: true });
    // iOS: prime the decoder on the first touch so the first seek paints instantly
    const prime = () => {
      const p = video.play();
      if (p) p.then(() => video.pause()).catch(() => {});
    };
    window.addEventListener('touchstart', prime, { once: true, passive: true });
    return () => {
      cancelled = true;
      io.disconnect();
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('touchstart', prime);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [clipUrl]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const video = videoRef.current;
      if (!root || !video) return;
      const copies = Array.from(root.querySelectorAll<HTMLElement>('[data-world-copy]'));
      const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-world-dot]'));
      const bar = root.querySelector<HTMLElement>('[data-world-bar]');
      const hint = root.querySelector<HTMLElement>('[data-world-hint]');
      const still = root.querySelector<HTMLElement>('[data-world-still]');
      const reduce = prefersReducedMotion();
      const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      let target = 0;
      let cur = 0;
      let active = -1;

      const render = (p: number) => {
        // chapter + local progress → eased clip time
        const pos = clamp(p) * n;
        const ci = Math.min(n - 1, Math.floor(pos));
        const local = clamp(pos - ci);
        const ch = chapters[ci];
        const eased = reduce ? local : lingerEase(local, linger);
        target = (ch.t0 + eased * (ch.t1 - ch.t0)) / duration;

        copies.forEach((el, i) => {
          const pr = clamp(pos - i);
          const before = pos < i;
          const after = pos > i + 1;
          let op: number;
          if (i === 0) op = after ? 0 : smooth(1 - pr / 0.62);
          else if (i === n - 1) op = before ? 0 : smooth(pr / 0.4);
          else op = before || after ? 0 : smooth(1 - Math.abs(pr - 0.5) / 0.5);
          el.style.opacity = String(op);
          el.style.transform = reduce ? 'none' : `translate3d(0, ${(0.5 - pr) * 5}vh, 0)`;
          el.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        });
        if (ci !== active) {
          active = ci;
          dots.forEach((d, k) => d.classList.toggle('is-active', k === ci));
        }
        if (bar) bar.style.transform = `scaleX(${clamp(p)})`;
        if (hint) hint.style.opacity = String(clamp(1 - p * 14));
        if (still && !reduce) still.style.transform = `scale(${1.04 + clamp(p) * 0.1})`;
      };

      // Ease currentTime toward the target; never queue a seek while one is resolving
      const eps = coarse ? 0.02 : 0.008;
      const tick = () => {
        if (!video.duration || video.seeking) return;
        cur += (target - cur) * (reduce ? 1 : 0.18);
        const t = clamp(cur, 0, 0.999) * video.duration;
        if (Math.abs(video.currentTime - t) > eps * video.duration) {
          try {
            video.currentTime = t;
          } catch {
            // decoder not ready yet
          }
        }
      };

      let running = false;
      const run = (on: boolean) => {
        if (on && !running) gsap.ticker.add(tick);
        if (!on && running) gsap.ticker.remove(tick);
        running = on;
      };

      // Progress across the pinned span drives the camera…
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress)
      });
      // …while the scrub loop runs whenever any part of the stage is on screen, so the
      // camera always settles on the true first/last frame even after a fast flick past an edge.
      const visible = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => run(self.isActive)
      });
      render(st.progress);
      run(visible.isActive);

      return () => {
        run(false);
        st.kill();
        visible.kill();
      };
    },
    { scope: rootRef, dependencies: [clipUrl] }
  );

  const jumpTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const span = root.offsetHeight - window.innerHeight;
    scrollTo(top + span * ((i + 0.5) / n), { duration: 1.6 });
  };

  return (
    <section
      ref={rootRef}
      aria-label="Walk through MYSA Luxe Villas"
      className="relative bg-ink text-paper"
      style={{ height: `${(n * chapterScroll + 1) * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <img
          data-world-still
          src={portrait ? posterPortrait : poster}
          alt=""
          className={`img-cover transition-opacity duration-500 ${painted ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className={`img-cover transition-opacity duration-500 ${painted ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* legibility veils */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/30 md:bg-gradient-to-r md:from-ink/80 md:via-ink/30 md:to-transparent" />

        {/* progress */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-paper/15">
          <div data-world-bar className="h-full origin-left scale-x-0 bg-gold" />
        </div>

        {/* chapter copy */}
        {chapters.map((ch, i) => (
          <article
            key={ch.label}
            data-world-copy
            className="absolute bottom-[calc(6.5rem+env(safe-area-inset-bottom))] left-5 right-12 max-w-xl opacity-0 sm:left-10 sm:right-16 md:bottom-auto md:left-[clamp(1.25rem,4vw,4.5rem)] md:right-auto md:top-1/2 md:w-[min(40vw,520px)] md:-translate-y-1/2 md:first-of-type:w-[min(52vw,760px)]"
          >
            <p className="text-[12px] tabular-nums text-paper/60">
              {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </p>
            <p className="meta mt-5 text-gold">{ch.eyebrow}</p>
            {i === 0 ? (
              <h1 className="mt-3 font-display text-[clamp(3.2rem,7vw,7.2rem)] leading-[0.9] tracking-[-0.02em]">{ch.title}</h1>
            ) : (
              <h3 className="mt-3 font-display text-[clamp(2.3rem,4.4vw,4.4rem)] leading-[0.98]">{ch.title}</h3>
            )}
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/80 sm:text-[16px]">{ch.body}</p>
            {i === n - 1 && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={onPlayFilm} className="btn btn-light group">
                  <Play className="h-4 w-4 fill-current" />
                  Watch the full film
                </button>
                <button type="button" onClick={onOpenContact} className="btn border border-paper/40 text-paper hover:border-paper">
                  Schedule a viewing
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </article>
        ))}

        {/* route */}
        <nav className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-4 sm:right-6 md:gap-5" aria-label="Walkthrough chapters">
          {chapters.map((ch, i) => (
            <button
              key={ch.label}
              type="button"
              data-world-dot
              onClick={() => jumpTo(i)}
              className="group relative flex h-7 w-7 cursor-pointer items-center justify-center [&.is-active>span:last-child]:scale-150 [&.is-active>span:last-child]:bg-gold [&.is-active>span:first-child]:opacity-100"
              aria-label={ch.label}
            >
              <span className="pointer-events-none absolute right-8 hidden whitespace-nowrap rounded-full bg-paper/90 px-3 py-1 text-[12px] font-medium text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                {ch.label}
              </span>
              <span className="h-2 w-2 rounded-full bg-paper/50 transition-[transform,background-color] duration-500" />
            </button>
          ))}
        </nav>

        {/* hint */}
        <div data-world-hint className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="meta text-paper/70">Scroll to walk through</span>
          <span className="relative block h-10 w-px overflow-hidden bg-paper/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-paper" />
          </span>
        </div>
      </div>
    </section>
  );
};
