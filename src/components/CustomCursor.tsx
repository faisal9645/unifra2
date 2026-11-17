import React, { useRef } from 'react';
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from '../lib/gsap';

/**
 * Dot + ring cursor. Elements with data-cursor="Label" turn the ring into a
 * labelled ink bubble; interactive elements soften it into a halo.
 */
export const CustomCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !label) return;
    if (!isFinePointer() || prefersReducedMotion()) {
      root.style.display = 'none';
      return;
    }

    document.documentElement.classList.add('has-cursor');
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    let mode: 'idle' | 'hover' | 'label' = 'idle';
    let currentLabel = '';

    const setMode = (next: typeof mode, text = '') => {
      if (next === mode && text === currentLabel) return;
      mode = next;
      currentLabel = text;
      label.textContent = text;
      if (next === 'label') {
        gsap.to(ring, { width: 96, height: 96, backgroundColor: 'rgba(15,15,14,0.92)', borderColor: 'rgba(15,15,14,0)', duration: 0.5, ease: 'expo.out' });
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.4, delay: 0.08 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else if (next === 'hover') {
        gsap.to(ring, { width: 64, height: 64, backgroundColor: 'rgba(169,129,74,0.08)', borderColor: 'rgba(169,129,74,0.7)', duration: 0.5, ease: 'expo.out' });
        gsap.to(label, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      } else {
        gsap.to(ring, { width: 36, height: 36, backgroundColor: 'rgba(15,15,14,0)', borderColor: 'rgba(15,15,14,0.22)', duration: 0.5, ease: 'expo.out' });
        gsap.to(label, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to(root, { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      if (labelled) {
        setMode('label', labelled.dataset.cursor || '');
        return;
      }
      const interactive = target.closest('a, button, [role="button"], label, select, input, textarea');
      setMode(interactive ? 'hover' : 'idle');
    };

    const onDown = () => gsap.to(ring, { scale: 0.86, duration: 0.25 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' });
    const onLeave = () => gsap.to(root, { autoAlpha: 0, duration: 0.3 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  });

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[9999] opacity-0" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border"
        style={{ borderColor: 'rgba(15,15,14,0.22)' }}
      >
        <span
          ref={labelRef}
          className="meta invisible scale-50 text-[10px] tracking-[0.18em] text-paper opacity-0"
        />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink" />
    </div>
  );
};
