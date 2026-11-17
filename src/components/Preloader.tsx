import React, { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion, releaseReveal } from '../lib/gsap';

const SESSION_KEY = 'unifra_intro_seen';

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

/** Session-once preloader: counter, emblem, then an upward wipe into the site. */
export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(() => !hasSeenIntro() && !prefersReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!visible) {
        releaseReveal();
        return;
      }
      const root = rootRef.current;
      const count = countRef.current;
      if (!root || !count) return;

      const counter = { v: 0 };
      let fontsReady = false;
      const resume = () => {
        fontsReady = true;
        if (tl.paused()) tl.play();
      };
      const fontTimer = window.setTimeout(resume, 4000);
      document.fonts?.ready.then(resume) ?? resume();

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SESSION_KEY, '1');
          } catch {
            // ignore
          }
          setVisible(false);
        }
      });

      tl.from('[data-pl-emblem]', { autoAlpha: 0, scale: 0.86, duration: 1.2, ease: 'expo.out' }, 0)
        .from('[data-pl-meta]', { yPercent: 120, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.15)
        .to(
          counter,
          {
            v: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
              count.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          },
          0
        )
        .to('[data-pl-bar]', { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
        // Hold at 100 until the web fonts are in (max 4s) so headlines never re-flow mid-reveal
        .add(() => {
          if (!fontsReady) tl.pause();
        }, 2.02)
        .to('[data-pl-meta], [data-pl-count]', { yPercent: -120, duration: 0.8, stagger: 0.04, ease: 'expo.in' }, 2.05)
        .to('[data-pl-emblem]', { autoAlpha: 0, scale: 0.94, duration: 0.6, ease: 'expo.in' }, 2.1)
        .add(() => releaseReveal(), 2.55)
        .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'expo.inOut' }, 2.45);
    },
    { scope: rootRef, dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] bg-paper text-ink"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img data-pl-emblem src="/images/unifra-emblem-gold.png" alt="" className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
      </div>

      <div className="shell absolute inset-x-0 top-8 flex items-start justify-between">
        <span className="overflow-hidden">
          <span data-pl-meta className="meta block text-graphite">Unifra Properties</span>
        </span>
        <span className="overflow-hidden">
          <span data-pl-meta className="meta block text-graphite">Creating Desires</span>
        </span>
      </div>

      <div className="shell absolute inset-x-0 bottom-6 sm:bottom-10">
        <div className="flex items-end justify-between gap-6">
          <span className="overflow-hidden">
            <span data-pl-count className="block font-display text-[26vw] leading-[0.8] tracking-[-0.04em] sm:text-[17vw]">
              <span ref={countRef}>000</span>
            </span>
          </span>
          <span className="mb-3 overflow-hidden text-right">
            <span data-pl-meta className="meta block text-graphite">
              Vettuvankeni
              <br />
              East Coast Road
            </span>
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-line">
          <div data-pl-bar className="h-px w-full origin-left scale-x-0 bg-ink" />
        </div>
      </div>
    </div>
  );
};
