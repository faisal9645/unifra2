import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: 'expo.out', duration: 1.2 });
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* -----------------------------------------------------------------------------
   Reveal gate — above-the-fold intros wait until the preloader or the page
   curtain has lifted, so they are actually seen.
   ----------------------------------------------------------------------------- */
let held = true;
let queue: Array<() => void> = [];

export function whenRevealed(cb: () => void): () => void {
  if (!held) {
    cb();
    return () => {};
  }
  queue.push(cb);
  return () => {
    queue = queue.filter((fn) => fn !== cb);
  };
}

export function holdReveal() {
  held = true;
}

export function releaseReveal() {
  held = false;
  const pending = queue;
  queue = [];
  pending.forEach((fn) => fn());
}
